'use babel'

import { zCLIjs } from '../middleware-linkage'
import { updateProjectInteractive, UnsupportedVersionException } from '@purduesigbots/pros-cli-middleware'
import { UpgradeProjectView } from '../views'

export function conductUpdateProject() {
  return zCLIjs(updateProjectInteractive, {
    label: 'PROS Update Project Dialog'
  }).catch(
    (error) => {
      if(error instanceof UnsupportedVersionException) {
        // CLI not up to date. Fall-back to previous method of doing things
        const v = new UpgradeProjectView()
        v.show()
      } else {
        throw error
      }
    }
  )
}
