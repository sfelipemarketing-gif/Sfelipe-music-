import {existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {bundle} from '@remotion/bundler';
import {renderMedia, renderStill, selectComposition} from '@remotion/renderer';
import {cueSheet, dimensions, durationFrames, FPS, projectSchema} from '../src/project';

const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
const args = process.argv.slice(2);
const option = (key: string) => {
  const i = args.indexOf(key);
  if (i < 0) return undefined;
  if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error(`Falta valor para ${key}.`);
  return args[i + 1];
};
const projectFile = path.resolve(root, option('--project') ?? 'projects/demo.json');
if (!projectFile.startsWith(path.join(root, 'projects') + path.sep) || !projectFile.endsWith('.json'))
  throw new Error('Use um arquivo JSON dentro de motion/projects.');
const project = projectSchema.parse(JSON.parse(readFileSync(projectFile, 'utf8')));
const format = option('--format') ?? process.env.MOTION_FORMAT;
if (format) {
  if (!(format in dimensions)) throw new Error('Formato inválido. Use 16:9, 9:16 ou 1:1.');
  project.format = format as keyof typeof dimensions;
}
const duration = durationFrames(project) / FPS;
let audioDuration: number | null = null;
if (project.audio) {
  const audioFile = path.join(root, 'public', project.audio);
  if (!existsSync(audioFile)) throw new Error(`Áudio não encontrado: public/${project.audio}. Para o exemplo, execute npm run demo:audio.`);
  const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', audioFile], {encoding: 'utf8'}));
  if (!probe.streams.some((s: {codec_type: string}) => s.codec_type === 'audio')) throw new Error('Arquivo não contém faixa de áudio.');
  audioDuration = Number(probe.format.duration);
  if (!Number.isFinite(audioDuration) || Math.abs(audioDuration - duration) > .25)
    throw new Error(`A linha do tempo (${duration.toFixed(2)}s) precisa acompanhar o áudio (${audioDuration.toFixed(2)}s). Ajuste as durações; não cortar a explicação.`);
}
const scale = Number(option('--scale') ?? 1);
if (![.5, 1].includes(scale)) throw new Error('Escala deve ser 1 (1080p) ou 0.5 (prévia).');
mkdirSync('out', {recursive: true});
const browserExecutable = process.env.MOTION_CHROME ?? ['/usr/bin/chromium', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable'].find(existsSync);
let lastBundle = -1;
const serveUrl = await bundle({entryPoint: path.join(root, 'src/index.tsx'), publicDir: path.join(root, 'public'), onProgress: p => {
  const n = Math.floor(p / 25) * 25;
  if (n !== lastBundle) {lastBundle = n; console.log(`Preparando composição: ${n}%`);}
}});
const inputProps = {project};
const composition = await selectComposition({serveUrl, id: 'Motion', inputProps, browserExecutable});
const base = {...composition, width: Math.round(composition.width * scale), height: Math.round(composition.height * scale)};
// Keep original composition dimensions: Remotion scales the complete frame on export.
writeFileSync('out/storyboard.json', JSON.stringify({title: project.title, format: project.format, fps: FPS, duration, audio: project.audio, scenes: cueSheet(project)}, null, 2));
if (args.includes('--still')) {
  const frame = Number(option('--frame') ?? 65);
  if (!Number.isInteger(frame) || frame < 0 || frame >= composition.durationInFrames) throw new Error('Frame fora da linha do tempo.');
  await renderStill({serveUrl, composition, inputProps, browserExecutable, frame, output: 'out/preview.png', scale, imageFormat: 'png'});
  console.log(`Prévia criada: out/preview.png (${base.width}×${base.height}).`);
} else {
  const temporary = path.join(root, 'out/rendering.mp4');
  const outputLocation = path.join(root, 'out/motion.mp4');
  let lastProgress = -1;
  try {
    await renderMedia({serveUrl, composition, inputProps, browserExecutable, codec: 'h264', audioCodec: 'aac',
      pixelFormat: 'yuv420p', crf: 18, x264Preset: 'medium', concurrency: 2, scale,
      outputLocation: temporary, imageFormat: 'png',
      onProgress: ({progress}) => {
        const n = Math.floor(progress * 20) * 5;
        if (n !== lastProgress) {lastProgress = n; console.log(`Renderizando: ${n}%`);}
      },
    });
    // Fast-start MP4 for playback and seeking on Safari/iPhone, no quality loss.
    const optimized = path.join(root, 'out/optimized.mp4');
    execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', temporary, '-map', '0', '-c', 'copy', '-movflags', '+faststart', optimized]);
    renameSync(optimized, outputLocation);
    const buffer = readFileSync(outputLocation);
    writeFileSync('out/render-info.json', JSON.stringify({title: project.title, format: project.format, width: base.width, height: base.height, fps: FPS, duration, audio: !!project.audio, audioDuration,
      bytes: buffer.length, sha256: createHash('sha256').update(buffer).digest('hex'), renderedAt: new Date().toISOString()}, null, 2));
    console.log(`MP4 criado: out/motion.mp4 (${base.width}×${base.height}, ${duration}s, ${(buffer.length / 1024 / 1024).toFixed(2)} MB).`);
  } finally {
    rmSync(temporary, {force: true});
  }
}
