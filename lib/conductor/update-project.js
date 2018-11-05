'use babel'
import glob from 'glob'

import { zCLIjs } from '../middleware-linkage'
import { updateProjectInteractive } from '@purduesigbots/pros-cli-middleware'

export function conductUpdateProject() {
  return zCLIjs(updateProjectInteractive, {
    label: 'PROS Update Project Dialog'
  })
}
