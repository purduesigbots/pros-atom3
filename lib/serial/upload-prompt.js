'use babel'
import glob from 'glob'

import { zCLIjs } from '../middleware-linkage'
import { uploadInteractive } from '@purduesigbots/pros-cli-middleware'

export function uploadPrompt() {
  return zCLIjs(uploadInteractive, {
    label: 'PROS Upload Dialog'
  })
}
