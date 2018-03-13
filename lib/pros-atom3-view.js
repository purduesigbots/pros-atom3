'use babel';
/** @jsx etch.dom */

import etch from 'etch';

import { ConfirmModalComponent } from './components/modals.js';

export default class ProsAtom3View {

  constructor(serializedState) {
    const confirm = cmp => event => {
      console.log(cmp);
      cmp.update({message: 'confirmed!'});
      // atom.commands.dispatch(this.getElement(), 'pros-atom3:toggle');
    };
    console.log(confirm);
    const cancel = cmp => event => {
      atom.commands.dispatch(this.getElement(), 'pros-atom3:toggle');
    };
    const modal = new ConfirmModalComponent({message: 'hello frien', confirm: confirm, cancel:cancel});
    this.element = modal.element;
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
