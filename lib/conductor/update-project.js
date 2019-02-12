'use babel'
import glob from 'glob'

import { zCLIjs } from '../middleware-linkage'
import { updateProjectInteractive, UnsupportedVersionException } from '@purduesigbots/pros-cli-middleware'
import { UpgradeProjectView } from '../views'

export function conductUpdateProject() {
  return zCLIjs(updateProjectInteractive, {
    label: 'PROS Update Project Dialog'
  }, {
    project: GlobalProjectTracker.lastWeakProject()
  }).catch(
    (error) => {
      if(error instanceof UnsupportedVersionException) {
        // CLI not up to date. Fall-back to previous method of doing things
        const v = new UpgradeProjectView()
        v.show()
      }
    }
  )
}
