"""Recria só os áudios sintéticos de teste. Opcional: Python 3 e FFmpeg.
Não é necessário executar para usar ou publicar o site: os MP3 já estão prontos.
"""
from pathlib import Path
import math
import subprocess
import tempfile
import wave
from array import array

ROOT = Path(__file__).resolve().parents[1]
RATE = 32000
TRACKS = [
    ('entre-frequencias', 24, [220, 261.626, 329.628, 392], 0),
    ('horizonte-azul', 28, [196, 246.942, 293.665, 369.994], 1),
    ('depois-da-meia-noite', 26, [164.814, 196, 246.942, 329.628], 2),
]
for name, duration, notes, variant in TRACKS:
    samples = array('h')
    for i in range(duration * RATE):
        t = i / RATE
        fade = min(1, t / 1.8, (duration - t) / 2.5)
        chord = sum(math.sin(2 * math.pi * hz * t + .2 * math.sin(t * .3)) for hz in notes) / 4
        chord *= .07 * (.8 + .2 * math.sin(t * .7))
        beat = t % .5
        note_index = (int(t * 2) * (variant + 1)) % len(notes)
        hz = notes[note_index] * 2
        bell = (.11 * math.sin(2 * math.pi * hz * beat) + .025 * math.sin(2 * math.pi * hz * 2 * beat))
        bell *= min(1, beat * 100) * math.exp(-beat * 8)
        pulse = .045 * math.sin(2 * math.pi * 55 * t) * math.exp(-(t % 1) * 12)
        samples.append(int(32767 * (chord + bell + pulse) * max(fade, 0)))
    with tempfile.TemporaryDirectory() as temp:
        wav_path = Path(temp) / 'demo.wav'
        with wave.open(str(wav_path), 'wb') as wav:
            wav.setnchannels(1)
            wav.setsampwidth(2)
            wav.setframerate(RATE)
            wav.writeframes(samples.tobytes())
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(wav_path), '-codec:a', 'libmp3lame', '-b:a', '96k', '-metadata', 'title=DEMONSTRACAO - ' + name, '-metadata', 'artist=Audio sintetico de teste - nao e uma musica de SFelipe', str(ROOT / 'assets/audio' / (name + '-demo.mp3'))], check=True)
    print(name, duration, 'segundos')
