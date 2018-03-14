'use babel';
/** @jsx etch.dom */

import etch from 'etch';

import { NewProjectComponent } from './components/pros.js';

export default class ProsAtom3View {
  constructor(serializedState) {
    const confirm = cmp => event => {
      console.log(cmp.path);
      atom.commands.dispatch(this.getElement(), 'pros-atom3:toggle');
    };
    console.log(confirm);
    const cancel = cmp => event => {
      console.log('cancelled!');
      atom.commands.dispatch(this.getElement(), 'pros-atom3:toggle');
    };
    const modal = new NewProjectComponent({confirm: confirm, cancel: cancel});
    console.log(modal);
    this.element = modal.element;
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement(): Element {
    return this.element;
  }

}
