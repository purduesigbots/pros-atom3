'use babel';

import etch from 'etch';
import ProsAtom3View from './pros-atom3-view';
import { CompositeDisposable } from 'atom';

export default {

  prosAtom3View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    etch.setScheduler(atom.views);
    this.prosAtom3View = new ProsAtom3View(state.prosAtom3ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.prosAtom3View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pros-atom3:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.prosAtom3View.destroy();
  },

  serialize() {
    return {
      prosAtom3ViewState: this.prosAtom3View.serialize()
    };
  },

  toggle() {
    console.log('ProsAtom3 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
