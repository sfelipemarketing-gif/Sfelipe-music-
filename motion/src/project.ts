import {z} from 'zod';

export const FPS = 30;
export const dimensions = {
  '16:9': {width: 1920, height: 1080},
  '9:16': {width: 1080, height: 1920},
  '1:1': {width: 1080, height: 1080},
} as const;

export const projectSchema = z.object({
  title: z.string().min(1).max(100),
  format: z.enum(['16:9', '9:16', '1:1']),
  background: z.string().regex(/^#[0-9a-f]{6}$/i),
  ink: z.string().regex(/^#[0-9a-f]{6}$/i),
  accent: z.string().regex(/^#[0-9a-f]{6}$/i),
  // Only local, explicitly supplied files. No remote fetches or voice services.
  audio: z.string().regex(/^[a-zA-Z0-9_-]+\.(wav|mp3|m4a|aac|ogg|flac)$/).nullable(),
  scenes: z.array(z.object({
    id: z.string().regex(/^[a-z0-9-]+$/),
    kind: z.enum(['connections', 'flow', 'focus', 'chart']),
    duration: z.number().min(2).max(30),
    eyebrow: z.string().max(50),
    title: z.string().min(1).max(90),
    body: z.string().max(160),
    labels: z.array(z.string().min(1).max(28)).length(3),
    values: z.array(z.number().min(0).max(100)).length(3).optional(),
  })).min(1).max(40),
}).superRefine((p, ctx) => {
  if (p.scenes.reduce((sum, scene) => sum + Math.round(scene.duration * FPS), 0) > 180 * FPS)
    ctx.addIssue({code: 'custom', path: ['scenes'], message: 'Limite inicial: 3 minutos por vídeo.'});
  if (new Set(p.scenes.map(s => s.id)).size !== p.scenes.length)
    ctx.addIssue({code: 'custom', path: ['scenes'], message: 'Identificadores de cenas devem ser únicos.'});
  p.scenes.forEach((scene, i) => {
    if (scene.kind === 'chart' && !scene.values)
      ctx.addIssue({code: 'custom', path: ['scenes', i, 'values'], message: 'Gráficos exigem dados fornecidos; não inventar estatísticas.'});
  });
});
export type Project = z.infer<typeof projectSchema>;
export type Scene = Project['scenes'][number];
export const durationFrames = (p: Project) => p.scenes.reduce((sum, s) => sum + Math.round(s.duration * FPS), 0);
export const cueSheet = (p: Project) => {
  let startFrame = 0;
  return p.scenes.map(s => {
    const frames = Math.round(s.duration * FPS);
    const cue = {id: s.id, startFrame, endFrame: startFrame + frames, startSeconds: startFrame / FPS, endSeconds: (startFrame + frames) / FPS, title: s.title, kind: s.kind};
    startFrame += frames;
    return cue;
  });
};
