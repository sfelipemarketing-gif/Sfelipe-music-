import {mkdirSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

// Original synthetic test sound. No speech, cloning, stock audio or external API.
export function demoAudio(seconds = 12, rate = 48000) {
  const samples = Math.round(rate * seconds);
  const data = Buffer.alloc(44 + samples * 2);
  data.write('RIFF', 0); data.writeUInt32LE(data.length - 8, 4); data.write('WAVEfmt ', 8);
  data.writeUInt32LE(16, 16); data.writeUInt16LE(1, 20); data.writeUInt16LE(1, 22);
  data.writeUInt32LE(rate, 24); data.writeUInt32LE(rate * 2, 28);
  data.writeUInt16LE(2, 32); data.writeUInt16LE(16, 34); data.write('data', 36); data.writeUInt32LE(samples * 2, 40);
  for (let i = 0; i < samples; i++) {
    const t = i / rate;
    const fade = Math.min(1, t / .45, (seconds - t) / .8);
    const chord = Math.sin(t * Math.PI * 2 * 130.81) + .5 * Math.sin(t * Math.PI * 2 * 196) + .3 * Math.sin(t * Math.PI * 2 * 261.63);
    const beat = t % 4;
    const bell = Math.sin(beat * Math.PI * 2 * 783.99) * Math.exp(-beat * 5) * .06;
    data.writeInt16LE(Math.round((chord * .025 + bell) * fade * 32767), 44 + i * 2);
  }
  return data;
}
const target = fileURLToPath(new URL('../public/', import.meta.url));
mkdirSync(target, {recursive: true});
writeFileSync(`${target}/demo.wav`, demoAudio());
console.log('Áudio sintético de teste: public/demo.wav (12 segundos).');
