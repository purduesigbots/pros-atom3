'use babel';

import path from 'path'
import { promisify } from 'util'

import { testUi, uploadProject } from '@purduesigbots/pros-cli-middleware'
import { zCLIjs, getzCLIExecutable } from './middleware-linkage'
import { createTerminalTab } from './util'
import { NewProjectView, UpgradeProjectView } from './views'

const newView = (view) => {
  v = new view()
  v.show()
}

export default {
  'pros:new-project': {
    displayName: 'PROS: New Project',
    didDispatch: (event) => {
      newView(NewProjectView)
    }
  },
  'pros:upgrade-project': {
    displayName: 'PROS: Upgrade Project',
    didDispatch: (event) => {
      newView(UpgradeProjectView)
    }
  },
  'pros:build': {
    displayName: 'PROS: Build Project',
    description: 'Build the current PROS project',
    didDispatch: (event) => {
      return createTerminalTab({
        shellPath: getzCLIExecutable(),
        shellArgs: 'build',
        cwd: path.dirname(atom.workspace.getActiveTextEditor().getPath())
      })
    }
  },
  'pros:upload': {
    displayName: 'PROS: Upload Project',
    didDispatch: (event) => {
      return zCLIjs(
        uploadProject,
        {label: 'PROS Basic Upload'},
        path.dirname(atom.workspace.getActiveTextEditor().getPath())
      )
    }
  },
  'pros:terminal': {
    displayName: 'PROS: Open Terminal',
    didDispatch: (event) => {
      return createTerminalTab({
        shellPath: getzCLIExecutable(),
        shellArgs: 'terminal',
        cwd: path.dirname(atom.workspace.getActiveTextEditor().getPath())
      });
    }
  },
  'pros:quick-action': {
    displayName: 'PROS: Quick Action',
    description: 'Upload the current project and display a terminal',
    didDispatch: async (event) => {
      const element = atom.views.getView(atom.workspace.getActiveTextEditor() || atom.workspace)
      let something = Promise.resolve()
      if (atom.config.get('pros-atom3.quickAction.build')) {
        something = something.then(async () => await atom.commands.dispatch(element, 'pros:build').then((result) => {
          return new Promise((resolve, reject) => result[0].pty.on('exit', (code) => code === 0 ? resolve(code) : reject(code)))
        }))
      }
      console.log(something)
      if (atom.config.get('pros-atom3.quickAction.upload')) {
        something = something.then(async () => await atom.commands.dispatch(element, 'pros:upload'))
      }
      if (atom.config.get('pros-atom3.quickAction.terminal')) {
        something = something.then(atom.commands.dispatch(element, 'pros:terminal'))
      }
    }
  },
  'pros:test-ui': {
    displayName: 'PROS: Test UI',
    hiddenInCommandPallete: !atom.inDevMode(),
    didDispatch: (event) => {
      return zCLIjs(testUi, {label: 'PROS UI Test'})
    }
  }
};
