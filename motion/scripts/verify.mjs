import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
process.chdir(fileURLToPath(new URL('../', import.meta.url)));
const manifest = JSON.parse(readFileSync('out/render-info.json', 'utf8'));
const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_format', '-show_streams', '-of', 'json', 'out/motion.mp4'], {encoding: 'utf8'}));
const video = probe.streams.find(s => s.codec_type === 'video');
const audio = probe.streams.find(s => s.codec_type === 'audio');
assert.ok(video, 'MP4 deve ter vídeo.');
assert.equal(video.codec_name, 'h264');
assert.equal(video.pix_fmt, 'yuv420p');
assert.equal(video.width, manifest.width); assert.equal(video.height, manifest.height);
assert.equal(video.r_frame_rate, `${manifest.fps}/1`);
assert.ok(Math.abs(Number(video.duration) - manifest.duration) < .05, 'Duração visual precisa corresponder ao storyboard.');
if (manifest.audio) {
  assert.ok(audio, 'A narração não pode sumir da exportação.');
  assert.equal(audio.codec_name, 'aac');
  assert.ok(Math.abs(Number(audio.start_time ?? 0) - Number(video.start_time ?? 0)) <= 1 / manifest.fps, 'Áudio e vídeo devem começar juntos.');
  assert.ok(Math.abs(Number(audio.duration) - Number(video.duration)) < .1, 'Áudio e vídeo precisam ter a mesma duração.');
}
const mp4 = readFileSync('out/motion.mp4');
assert.ok(mp4.indexOf(Buffer.from('moov')) < mp4.indexOf(Buffer.from('mdat')), 'MP4 deve ter fast-start.');
writeFileSync('out/verificacao.json', JSON.stringify({passed: true, codec: video.codec_name, pixelFormat: video.pix_fmt, width: video.width, height: video.height, duration: Number(video.duration), audio: audio?.codec_name ?? null, fastStart: true}, null, 2));
console.log(`Verificado: H.264, ${video.width}×${video.height}, ${video.duration}s, áudio ${audio?.codec_name ?? 'ausente (projeto sem áudio)'}, fast-start.`);
