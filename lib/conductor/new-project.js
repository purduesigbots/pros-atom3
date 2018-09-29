'use babel'

import { zCLIjs } from '../middleware-linkage'
import { createNewProjectInteractive } from '@purduesigbots/pros-cli-middleware'

export function conductNewProject() {
  return zCLIjs(createNewProjectInteractive, {
    finalize: ({d}) => {
      if(d.method != 'project-report') {
        return
      }
      proj = d.data.project
      lines = d.human.split('\n')
      atom.notifications.addSuccess(lines[0], {
        detail: lines.slice(1).join('\n')
      })
      loc = proj.location
    }
  }).then(code => {
    // NOTE: createNewProject will definitely return -1 on error
    //       (we want to open the project even if it didn't compile)
    if (code !== -1) {
      atom.project.addPath(loc)
      glob(`${loc}/src/opcontrol.*`, (err, files) => {
        if(files.length > 0) {
          atom.workspace.open(files[0], {pending: true})
        }
      })
    } else {
      console.error(`failed to create and compile project (code ${code})`)
    }
  })
}
