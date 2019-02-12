'use babel'
import glob from 'glob'

import { zCLIjs } from '../middleware-linkage'
import { uploadInteractive, GlobalProjectTracker } from '@purduesigbots/pros-cli-middleware'

export function uploadPrompt() {
  return zCLIjs(uploadInteractive, {
    label: 'PROS Upload Dialog'
  }, {
    project: GlobalProjectTracker.lastWeakProject()
  })
}
