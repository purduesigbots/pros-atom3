'use babel';

import path from 'path'
import { promisify } from 'util'
import which from 'which'

import { testUi, uploadProject } from '@purduesigbots/pros-cli-middleware'
import { zCLIjs, getzCLIExecutable } from './middleware-linkage'
import { createTerminalTab } from './util'
import { UpgradeProjectView } from './views'
import { conductNewProject } from './conductor'

const newView = (view) => {
  v = new view()
  v.show()
}

const getShell = () => {
  const cmd = atom.config.get('pros-atom3.build.cmd');
  let shell = ''
  let cmdOpt = ''
  if (cmd === 'make') {
    shell = which.sync('make', {nothrow: true}) || 'make'
  } else {
    shell = getzCLIExecutable()
    cmdOpt = `${cmd} `
  }
  return [shell, cmdOpt]
}

const getProjectPathOrError = (action = 'build') => {
  if (atom.workspace.getActiveTextEditor() && atom.workspace.getActiveTextEditor().getPath()) {
    return path.dirname(atom.workspace.getActiveTextEditor().getPath())
  } else {
    atom.notifications.addError(`Could not determine which project to ${action}! Please open a file from a PROS project and try again.`)
    return null
  }
}

export default {
  'pros:new-project': {
    displayName: 'PROS: New Project',
    didDispatch: (event) => {
      conductNewProject()
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
    description: 'Build the current PROS project with the rule specified in settings',
    didDispatch: (event) => {
      const [shell, cmdOpt] = getShell()
      const cwd = getProjectPathOrError()
      if (!cwd) return
      return createTerminalTab({
        shellPath: shell,
        shellArgs: `${cmdOpt}${atom.config.get('pros-atom3.build.buildAction')}`,
        cwd
      })
    }
  },
  'pros:build-default': {
    displayName: 'PROS: Build Project (default)',
    description: 'Build the current PROS project with the default rule',
    didDispatch: (event) => {
      const [shell, cmdOpt] = getShell()
      const cwd = getProjectPathOrError()
      if (!cwd) return
      return createTerminalTab({
        shellPath: shell,
        shellArgs: `${cmdOpt}`,
        cwd
      })
    }
  },
  'pros:build-quick': {
    displayName: 'PROS: Build Project (quick)',
    description: 'Build the current PROS project with the \'quick\' rule',
    didDispatch: (event) => {
      const [shell, cmdOpt] = getShell()
      const cwd = getProjectPathOrError()
      if (!cwd) return
      return createTerminalTab({
        shellPath: shell,
        shellArgs: `${cmdOpt}quick`,
        cwd
      })
    }
  },
  'pros:build-clean': {
    displayName: 'PROS: Build Project (clean)',
    description: 'Clean the current PROS project (pros build clean)',
    didDispatch: (event) => {
      const [shell, cmdOpt] = getShell()
      const cwd = getProjectPathOrError()
      if (!cwd) return
      return createTerminalTab({
        shellPath: shell,
        shellArgs: `${cmdOpt}clean`,
        cwd
      })
    }
  },
  'pros:build-all': {
    displayName: 'PROS: Build Project (all)',
    description: 'Build the current PROS project with the \'all \' rule',
    didDispatch: (event) => {
      const [shell, cmdOpt] = getShell()
      const cwd = getProjectPathOrError()
      if (!cwd) return
      return createTerminalTab({
        shellPath: shell,
        shellArgs: `${cmdOpt}all`,
        cwd
      })
    }
  },
  'pros:upload': {
    displayName: 'PROS: Upload Project',
    didDispatch: (event) => {
      const cwd = getProjectPathOrError('upload')
      if (!cwd) return
      return zCLIjs(
        uploadProject,
        {label: 'PROS Basic Upload'},
        cwd
      )
    }
  },
  'pros:terminal': {
    displayName: 'PROS: Open Terminal',
    didDispatch: (event) => {
      // TODO: something better for this? maybe reword
      const cwd = getProjectPathOrError('use')
      if (!cwd) return
      return createTerminalTab({
        shellPath: getzCLIExecutable(),
        shellArgs: 'terminal',
        cwd
      });
    }
  },
  'pros:quick-action': {
    displayName: 'PROS: Quick Action',
    description: 'Upload the current project and display a terminal',
    didDispatch: async (event) => {
      const element = atom.views.getView(atom.workspace.getActiveTextEditor() || atom.workspace)
      let execChain = Promise.resolve()
      if (atom.config.get('pros-atom3.quickAction.build')) {
        execChain = execChain.then(async () => await atom.commands.dispatch(element, 'pros:build').then((result) => {
          return new Promise((resolve, reject) => result[0].pty.on('exit', (code) => code === 0 ? resolve(code) : reject(code)))
        }))
      }
      if (atom.config.get('pros-atom3.quickAction.upload')) {
        execChain = execChain.then(async () => await atom.commands.dispatch(element, 'pros:upload'))
      }
      if (atom.config.get('pros-atom3.quickAction.terminal')) {
        execChain = execChain.then(atom.commands.dispatch(element, 'pros:terminal'))
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
