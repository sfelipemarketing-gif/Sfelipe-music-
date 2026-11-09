import React from 'react';
import {Composition, registerRoot} from 'remotion';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import sample from '../projects/demo.json';
import {Motion} from './motion';
import {dimensions, durationFrames, FPS, projectSchema} from './project';

const demo = projectSchema.parse(sample);
const Root = () => <Composition
  id="Motion" component={Motion} fps={FPS}
  width={1920} height={1080} durationInFrames={durationFrames(demo)}
  defaultProps={{project: demo}}
  calculateMetadata={({props}) => {
    const project = projectSchema.parse(props.project);
    return {...dimensions[project.format], durationInFrames: durationFrames(project), fps: FPS, props: {project}};
  }}
/>;
registerRoot(Root);
