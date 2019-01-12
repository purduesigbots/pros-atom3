'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import TextEditorWrapper from './TextEditorWrapper'
import { InputBox  as _InputBox} from '@purduesigbots/pros-cli-middleware'
import { InputBox } from './InputBox'


export class DirectorySelector extends _InputBox {
  constructor(args) {
    super(args)

    this._inputBox = new InputBox(args)
  }

  showDirectoryDialog() {
    atom.pickFolder((paths) => {
      if (Array.isArray(paths) && paths.length > 0) {
        this.update(paths[0])
      }
    })
  }

  render(children = null) {
    if (children === null) {
      children = <TextEditorWrapper value={this.value} update={(value) => this.update(value)}
                         placeholder={this.placeholder}/>
    }
    return this._inputBox.render(
      <div class="pros-directory-selector">
        {children}

        <button class="btn" onclick={() => this.showDirectoryDialog()}>
          <span class="icon icon-file-directory" />
        </button>
      </div>
    )
  }
}
