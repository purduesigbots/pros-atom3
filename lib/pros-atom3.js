'use babel'

import etch from 'etch'
import { CompositeDisposable } from 'atom'

import { NewProjectView } from './views'

export default {

  prosAtom3View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    etch.setScheduler(atom.views)
    // // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()
    const newProjectViewProvider = NewProjectView.register()
    this.newProjectPanel = new NewProjectView(state.newProjectViewState)
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pros:new-project': () => this.newProjectPanel.toggle()
    }))
    // TODO: add others
  },

  deactivate() {
    this.subscriptions.dispose()
    this.newProjectPanel.destroy()
  },

  serialize() {
    // TODO: maybe we should actually implement these
    return {
      newProjectViewState: this.newProjectPanel.serialize()
    }
  }
}
