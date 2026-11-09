import React from 'react';
import {AbsoluteFill, Audio, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FPS, type Project, type Scene} from './project';

const ease = Easing.bezier(0.22, 1, 0.36, 1);
const tween = (f: number, start: number, end: number, a = 0, b = 1) => interpolate(f, [start, end], [a, b], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
const Pop = ({f, delay, children, style}: {f: number; delay: number; children: React.ReactNode; style?: React.CSSProperties}) => {
  const s = spring({frame: f - delay, fps: FPS, config: {damping: 19, stiffness: 110, mass: 0.8}});
  return <div style={{opacity: tween(f, delay, delay + 12), transform: `translateY(${(1 - s) * 45}px)`, ...style}}>{children}</div>;
};

function Icon({kind, color}: {kind: number; color: string}) {
  return <svg width="44" height="44" viewBox="0 0 40 40" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {kind === 0 ? <><rect x="15" y="5" width="10" height="20" rx="5"/><path d="M10 18v3a10 10 0 0020 0v-3M20 31v5M14 36h12"/></> : kind === 1 ? <><path d="M8 5h18l7 7v23H8zM25 5v8h8M14 20h13M14 26h10"/></> : <><path d="M7 12l13-7 13 7-13 7zM7 21l13 7 13-7M7 30l13 7 13-7"/></>}
  </svg>;
}

function Connections({scene, project, f}: {scene: Scene; project: Project; f: number}) {
  const {accent, ink, background} = project;
  const nodes = [{x: 126, y: 155}, {x: 468, y: 175}, {x: 304, y: 445}];
  const draw = tween(f, 15, 65);
  const rotation = tween(f, 0, 120, -8, 6);
  return <svg viewBox="0 0 610 610" width="100%" height="100%" overflow="visible">
    <g transform={`rotate(${rotation} 305 305)`}>
      {[180, 246, 297].map((r, i) => <circle key={r} cx="305" cy="305" r={r} stroke={ink} opacity={0.06 + i * 0.015} strokeWidth="1" fill="none" strokeDasharray={i === 2 ? '3 10' : undefined}/>)}
      <path d="M126 155 Q308 85 468 175 Q492 378 304 445 Q78 392 126 155Z" fill="none" stroke={ink} strokeWidth="1.5" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - draw} opacity=".35"/>
      <circle cx="305" cy="282" r={66 + 7 * Math.sin(f / 23)} fill={accent} opacity={tween(f, 12, 32)} />
      <path d="M282 282h46m-23-23v46" stroke={background} strokeWidth="2.5" opacity={tween(f, 26, 43)}/>
      {nodes.map((node, i) => {
        const s = spring({frame: f - 15 - i * 9, fps: FPS, config: {damping: 18}});
        const y = node.y + Math.sin(f / 28 + i * 2) * 6;
        return <g key={i} opacity={Math.min(1, s)} transform={`translate(${node.x} ${y}) scale(${s})`}>
          <circle r="48" fill={background} stroke={ink} strokeWidth="1.4"/>
          <circle r="7" fill={ink}/>
          <text y="83" textAnchor="middle" fill={ink} fontFamily="DM Sans" fontSize="20">{scene.labels[i]}</text>
        </g>;
      })}
      <circle cx={305 + Math.cos(f / 45) * 246} cy={305 + Math.sin(f / 45) * 246} r="5" fill={accent}/>
    </g>
  </svg>;
}

function Flow({scene, project, f}: {scene: Scene; project: Project; f: number}) {
  const {ink, accent, background} = project;
  return <div style={{position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <svg viewBox="0 0 610 610" style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}}>
      {[0, 1].map(i => <g key={i}>
        <path d={`M${153 + i * 185} 305h110`} stroke={ink} strokeWidth="1.5" opacity=".25" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - tween(f, 27 + i * 16, 52 + i * 16)}/>
        <circle cx={153 + i * 185 + ((Math.max(0, f - 40 - i * 14) % 52) / 52) * 110} cy="305" r="4" fill={accent} opacity={tween(f, 40 + i * 14, 50 + i * 14)}/>
      </g>)}
    </svg>
    <div style={{display: 'flex', gap: 28, alignItems: 'center', position: 'relative'}}>
      {scene.labels.map((label, i) => <Pop key={i} f={f} delay={12 + i * 13} style={{width: 156, height: 198, border: `1.5px solid ${ink}30`, background: i === 2 ? ink : background, color: i === 2 ? background : ink, borderRadius: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, transform: `translateY(${tween(f, 12 + i * 13, 42 + i * 13, 40, 0) + Math.sin(f / 30 + i) * 3}px)`}}>
        <Icon kind={i} color={i === 2 ? accent : ink}/>
        <span style={{fontSize: 22, fontWeight: 500, textAlign: 'center', padding: '0 8px'}}>{label}</span>
      </Pop>)}
    </div>
  </div>;
}

function Focus({scene, project, f}: {scene: Scene; project: Project; f: number}) {
  const {accent, ink, background} = project;
  const shape = tween(f, 12, 60);
  return <svg viewBox="0 0 610 610" width="100%" height="100%">
    <g transform={`translate(305 290) rotate(${tween(f, 0, 120, -15, 8)})`}>
      {[0, 1, 2].map(i => <rect key={i} x={-116 - i * 22 * (1 - shape)} y={-116 - i * 22 * (1 - shape)} width={232 + i * 44 * (1 - shape)} height={232 + i * 44 * (1 - shape)} rx={58 + shape * 58} fill={i === 2 ? ink : 'none'} stroke={ink} strokeWidth="1" opacity={i === 2 ? tween(f, 5, 27) : .15} transform={`rotate(${i * 27 * (1 - shape)})`}/>)}
      <circle r={83 * tween(f, 28, 60)} fill={accent}/>
      <path d="M-30 0l20 21 42-45" fill="none" stroke={background} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - tween(f, 45, 70)}/>
    </g>
    {scene.labels.map((label, i) => <g key={i} opacity={tween(f, 38 + i * 8, 56 + i * 8)}>
      <circle cx={167 + i * 139} cy="480" r="3.5" fill={accent}/>
      <text x={167 + i * 139} y="516" textAnchor="middle" fill={ink} fontFamily="DM Sans" fontSize="19">{label}</text>
    </g>)}
  </svg>;
}

function Chart({scene, project, f}: {scene: Scene; project: Project; f: number}) {
  const {ink, accent} = project;
  return <svg viewBox="0 0 610 610" width="100%" height="100%">
    {[0, 1, 2, 3].map(i => <path key={i} d={`M60 ${125 + i * 100}H550`} stroke={ink} opacity=".1"/>)}
    {scene.values?.map((value, i) => {
      const progress = tween(f, 12 + i * 9, 66 + i * 9);
      const h = 3.5 * value * progress;
      return <g key={i}>
        <rect x={93 + i * 164} y={425 - h} width="90" height={h} rx="12" fill={i === 2 ? accent : ink} opacity={i === 0 ? .35 : 1}/>
        <text x={138 + i * 164} y={400 - h} textAnchor="middle" fill={ink} fontFamily="DM Sans" fontSize="32">{Math.round(value * progress)}%</text>
        <text x={138 + i * 164} y="473" textAnchor="middle" fill={ink} fontFamily="DM Sans" fontSize="19">{scene.labels[i]}</text>
      </g>;
    })}
  </svg>;
}

function SceneView({scene, project, index, count}: {scene: Scene; project: Project; index: number; count: number}) {
  const f = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const tall = height >= width;
  // Author on a constant logical canvas, then fit without CSS viewport units.
  const logicalWidth = tall ? 1080 : 1920;
  const logicalHeight = tall ? (height > width ? 1920 : 1080) : 1080;
  const opacity = tween(f, 0, 10) * (1 - tween(f, Math.round(scene.duration * FPS) - 9, Math.round(scene.duration * FPS)));
  const Graphic = {connections: Connections, flow: Flow, focus: Focus, chart: Chart}[scene.kind];
  const words = scene.title.split('\n');
  const titleSize = tall ? (scene.title.length > 55 ? 68 : 82) : (scene.title.length > 55 ? 83 : 106);
  return <AbsoluteFill style={{opacity}}>
    <div style={{position: 'absolute', width: logicalWidth, height: logicalHeight, transform: `scale(${width / logicalWidth})`, transformOrigin: 'top left', color: project.ink, fontFamily: 'DM Sans, sans-serif'}}>
      <div style={{position: 'absolute', left: tall ? 85 : 142, right: tall ? 85 : 142, top: tall ? 75 : 76, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 17, letterSpacing: 2}}>
        <span style={{display: 'flex', alignItems: 'center', gap: 14}}><span style={{width: 12, height: 12, background: project.accent, borderRadius: '50%'}}/>MOTION / EXPLICAR COM FORMA</span>
        <span style={{opacity: .45}}>{String(index + 1).padStart(2, '0')} — {String(count).padStart(2, '0')}</span>
      </div>
      <div style={{position: 'absolute', left: tall ? 85 : 142, top: tall ? (height > width ? 300 : 183) : 285, width: tall ? 910 : 850}}>
        <Pop f={f} delay={5} style={{fontSize: 17, letterSpacing: 3, fontWeight: 500, marginBottom: 33, color: project.accent}}>{scene.eyebrow}</Pop>
        <div style={{fontSize: titleSize, fontWeight: 500, lineHeight: 1.08, letterSpacing: -5}}>
          {words.map((line, i) => <div key={i} style={{overflow: 'hidden', paddingBottom: 10, marginBottom: -10}}><Pop f={f} delay={10 + i * 7} style={{color: i === 1 ? project.accent : project.ink}}>{line}</Pop></div>)}
        </div>
        <Pop f={f} delay={27} style={{fontSize: tall ? 26 : 27, lineHeight: 1.55, opacity: .65, maxWidth: tall ? 800 : 640, marginTop: 30}}>{scene.body}</Pop>
      </div>
      <div style={{position: 'absolute', left: tall ? 235 : 1105, top: tall ? (height > width ? 970 : 470) : 200, width: tall ? (height > width ? 610 : 570) : 660, height: tall ? (height > width ? 610 : 570) : 660}}>
        <Graphic scene={scene} project={project} f={f}/>
      </div>
      <div style={{position: 'absolute', left: tall ? 85 : 142, right: tall ? 85 : 142, bottom: tall ? 74 : 80, display: 'flex', justifyContent: 'space-between', fontSize: 17, opacity: .45}}>
        <span>{project.title}</span><span>DESIGN EM MOVIMENTO</span>
      </div>
    </div>
  </AbsoluteFill>;
}

export function Motion({project}: {project: Project}) {
  let start = 0;
  const {width} = useVideoConfig();
  return <AbsoluteFill style={{background: project.background, overflow: 'hidden'}}>
    <AbsoluteFill style={{backgroundImage: `radial-gradient(${project.ink}16 1px, transparent 1px)`, backgroundSize: `${width / 48}px ${width / 48}px`, opacity: .45}}/>
    {project.scenes.map((scene, index) => {
      const from = start;
      const frames = Math.round(scene.duration * FPS);
      start += frames;
      return <Sequence key={scene.id} from={from} durationInFrames={frames}><SceneView scene={scene} project={project} index={index} count={project.scenes.length}/></Sequence>;
    })}
    {project.audio ? <Audio src={staticFile(project.audio)} volume={1}/> : null}
  </AbsoluteFill>;
}
