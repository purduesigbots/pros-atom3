'use babel';

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
  'pros:upload': {
    displayName: 'PROS: Upload Project',
    didDispatch: (event) => {
      return zCLIjs(
        uploadProject,
        {label: 'PROS Basic Upload'},
        atom.project.relativizePath(atom.workspace.getActiveTextEditor().getPath())[0]
      )
    }
  },
  'pros:terminal': {
    displayName: 'PROS: Open Terminal',
    didDispatch: (event) => {
      createTerminalTab({
        shellPath: getzCLIExecutable(),
        shellArgs: 'terminal'
      })
    }
  },
  'pros:quick-action': {
    displayName: 'PROS: Quick Action',
    description: 'Upload the current project and display a terminal',
    didDispatch: (event) => {
      const element = atom.views.getView(atom.workspace.getActiveTextEditor() || atom.workspace);
      atom.commands.dispatch(element, 'pros:upload').then(() => {
        atom.commands.dispatch(element, 'pros:terminal')
      });
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
