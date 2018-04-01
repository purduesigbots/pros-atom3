'use babel'

import etch from 'etch'
import { Disposable, CompositeDisposable } from 'atom'

import commands from './commands'
import config from './config'
import { consumeConsole, consumeBusySignal, consumeTerminalTab, provideBuilder } from './util'
import { NewProjectView, UpgradeProjectView } from './views'

toolbar = null
createTerminalSession = null

export default {
  subscriptions: null,
  config,

  consumeConsole,
  consumeBusySignal,
  consumeTerminalTab,

  provideBuilder,

  consumeToolBar: (getToolBar) => {
    toolBar = getToolBar('pros')
    toolBar.addSpacer({priority: 50})

    if(atom.config.get('pros-atom3.build.addToToolbar')) {
      toolBar.addButton({
        icon: 'checklist',
        callback: 'build:trigger',
        tooltip: 'Trigger Build'
      })
      toolBar.addButton({
        icon: 'tasklist',
        callback: 'build:select-active-target',
        tooltip: 'Select Active Build Target'
      })
    }

    toolBar.addButton({
      icon: 'zap',
      callback: 'pros:quick-action',
      tooltip: 'PROS Quick Action'
    })

    toolBar.addButton({
      icon: 'upload',
      callback: 'pros:upload',
      tooltip: 'Upload PROS project',
      iconset: 'fi'
    })
    toolBar.addButton({
      icon: 'serial-port',
      callback: 'pros:terminal',
      tooltip: 'Open PROS terminal',
      iconset: 'mdi'
    })
  },

  newView(view) {
    v = new view()
    v.show()
    // TODO: maybe do disposable stuff?
  },

  activate(state) {
    etch.setScheduler(atom.views)
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    const newProjectViewProvider = NewProjectView.register()
    const upgradeProjectViewProvider = UpgradeProjectView.register()

    this.subscriptions.add(atom.commands.add('atom-workspace', commands))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  serialize() {
    // TODO: maybe we should actually implement these
    return {}
  }
}
