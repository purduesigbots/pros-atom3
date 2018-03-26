'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { TextEditor } from 'atom'

export default class FodlerPickerComponent {
  constructor(props) {
    this.props = props

    this.onPickDir = cmp => event => {
      const { onChanged } = cmp.props
      atom.pickFolder(paths => {
        if (paths && paths[0]) {
          onChanged(paths[0])
          this.update({dir: paths[0]})
        }
      })
    }

    etch.initialize(this)

    this.refs.editor.setPlaceholderText('Enter a path')
  }
  update(props) {
    if (props.dir && this.dir !== props.dir) {
      this.refs.editor.setText(props.dir)
    }
    return etch.update(this)
  }
  render() {
    return (
      <div class='file-picker-container'>
        <h4>Choose a directory</h4>
        <div class='file-picker' style='display: flex; flex-direction: row-reverse'>
          <button class='btn btn-default' onclick={this.onPickDir(this)}>
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
