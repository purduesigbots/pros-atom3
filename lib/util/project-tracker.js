'use babel'

import { CompositeDisposable } from 'atom'
import { GlobalProjectTracker } from '@purduesigbots/pros-cli-middleware';

export function setupProjectTracker() {
  disposable = new CompositeDisposable()

  disposable.add(atom.workspace.observeActiveTextEditor((editor) => {
    if (editor) {
      GlobalProjectTracker.visit(editor.getPath())
    }
  }))

  return disposable
}
