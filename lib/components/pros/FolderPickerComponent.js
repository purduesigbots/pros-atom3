'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { TextEditor } from 'atom'

export default class FolderPickerComponent {
  constructor(props) {
    this.props = props

    this.onPickDir = event => {
      atom.pickFolder(paths => {
        if (paths && paths[0]) {
          this._updateDir(paths[0])
        }
      })
    }

    etch.initialize(this)

    this.refs.editor.setPlaceholderText('Enter a path')
    this.refs.editor.onDidStopChanging((event) => {
      this._updateDir()
    })
    if (this.props.defaultPath) {
      this.refs.editor.setText(this.props.defaultPath)
      this._updateDir()
    }
  }

  _updateDir(dir) {
    this.props.onChanged(this.refs.editor.getText())
    if(dir) {
      this.refs.editor.setText(dir)
    }
  }

  update(props) {
    return etch.update(this)
  }

  render() {
    return (
      <div class='file-picker-container'>
        <h4>Choose a directory</h4>
        <div class='file-picker' style='display: flex; flex-direction: row-reverse'>
          <button class='btn btn-default' onclick={this.onPickDir}>
            <span class='icon icon-ellipsis'></span>
          </button>
          <div class='editor-container' style='flex-grow: 3'>
            <TextEditor mini ref='editor' />
          </div>
        </div>
      </div>
    )
  }
  destroy() {
    return etch.destroy(this)
  }
}
