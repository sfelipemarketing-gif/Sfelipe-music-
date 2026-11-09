import {test} from 'node:test';
import assert from 'node:assert/strict';
import sample from '../projects/demo.json';
import {cueSheet, dimensions, durationFrames, projectSchema} from '../src/project';

test('cenas cobrem exatamente a linha do tempo, sem buracos ou sobreposições', () => {
  const project = projectSchema.parse(sample);
  const cues = cueSheet(project);
  assert.equal(cues[0].startFrame, 0);
  cues.slice(1).forEach((cue, i) => assert.equal(cue.startFrame, cues[i].endFrame));
  assert.equal(cues.at(-1)?.endFrame, durationFrames(project));
  assert.equal(durationFrames(project), 360);
});
test('arredondamento de segundos fracionários usa uma única convenção', () => {
  const project = projectSchema.parse({...sample, scenes: sample.scenes.map(s => ({...s, duration: 4.11}))});
  assert.equal(durationFrames(project), 369);
  assert.equal(cueSheet(project).at(-1)?.endFrame, 369);
});
test('não aceitar caminhos externos ou escapar da pasta de áudio', () => {
  for (const audio of ['../voz.wav', 'https://example.com/voz.mp3', '/etc/passwd', 'sub/voz.mp3'])
    assert.equal(projectSchema.safeParse({...sample, audio}).success, false);
});
test('rejeitar cenas ambíguas, gráficos inventados e vídeos fora do limite', () => {
  assert.equal(projectSchema.safeParse({...sample, scenes: [sample.scenes[0], sample.scenes[0]]}).success, false);
  assert.equal(projectSchema.safeParse({...sample, scenes: [{...sample.scenes[0], kind: 'chart'}]}).success, false);
  assert.equal(projectSchema.safeParse({...sample, scenes: Array.from({length: 7}, (_, i) => ({...sample.scenes[0], id: `s-${i}`, duration: 30}))}).success, false);
});
test('três formatos de saída em 1080p', () => {
  assert.deepEqual(dimensions['9:16'], {width: 1080, height: 1920});
  assert.deepEqual(dimensions['16:9'], {width: 1920, height: 1080});
  assert.deepEqual(dimensions['1:1'], {width: 1080, height: 1080});
});
