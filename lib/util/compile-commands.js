'use babel'

import fs from 'fs';
import path from 'path';
import debounce from 'debounce';

import { buildCompileCommands } from '@purduesigbots/pros-cli-middleware';
import { zCLIjs, MiddlewareCallbackHelper } from '../middleware-linkage';

const serviceQueue = {}

export function projectFilesChanged(fileEvents) {
  const projects = new Set();
  const pros_projects = new Set();
  for(const fileEvent of fileEvents) {
    [projectPath, relPath] = atom.project.relativizePath(fileEvent.path);
    if(projectPath == null || projects.has(projectPath)) {
      continue;
    }
    let process = false;
    if((relPath.startsWith("src") || relPath.startsWith("include")) &&
       fileEvent.action !== 'modified') {
      process = true;
    }
    if(relPath == "Makefile" || relPath == "common.mk") {
      process = true;
    }

    if(!process) {
      continue;
    }

    projects.add(projectPath);
    if(fs.existsSync(path.join(projectPath, 'project.pros'))) {
      pros_projects.add(projectPath);
    }
  }

  for(const project of pros_projects) {
    if(!(project in serviceQueue)) {
      serviceQueue[project] = debounce((project) => {
        zCLIjs(buildCompileCommands, {finalize: () => {}}, project, ['all'], {
          sandbox: true,
          suppressOutput: true
        }).then(code => {
          if(code == 0) {
            console.debug(`Finished compile-commands for ${project}`);
          }
        });
      }, 500);
    }
    serviceQueue[project](project);
  }
}
