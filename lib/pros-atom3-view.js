'use babel';
/** @jsx etch.dom */

import etch from 'etch';

import { createNewProject } from '@purduesigbots/pros-cli-middleware';

import { NewProjectComponent } from './components/pros.js';

const prog = document.createElement('progress');
prog.max = 100;
prog.style.width = '100%';
let n;

const notify = data => {
  switch (data.type.split('/')[1]) {
    case 'echo':
      atom.notifications.addInfo(data.text);
      break;
    case 'progress':
      prog.value = data.pct * 100;
      n = atom.notifications.addInfo(data.label, {dismissable: true});
      try {
        const v = atom.views.getView(n);
        const c = v.querySelector('.detail-content');
        if (c) {
          c.appendChild(prog);
        }
      } catch (_) {}
      break;
  }
}
const finalize = data => {
  atom.notifications.addSuccess(`Created PROS project for ${data.target} at ${data.location}`);
}

export default class ProsAtom3View {
  constructor(serializedState) {
    const confirm = cmp => event => {
      console.log(cmp.path);
      console.log(cmp.kernel);
      createNewProject(notify, d => console.log(d), finalize, cmp.path, cmp.kernel);
      atom.commands.dispatch(this.getElement(), 'pros-atom3:toggle');
    };
    const cancel = cmp => event => {
      console.log('cancelled!');
      atom.commands.dispatch(this.getElement(), 'pros-atom3:toggle');
    };
    const modal = new NewProjectComponent({confirm: confirm, cancel: cancel});
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
