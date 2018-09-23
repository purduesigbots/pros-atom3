'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { TextEditor } from 'atom'

export default class TextEditorWrapper {
  constructor(props) {
    etch.initialize(this)

    this.refs.editor.setText(props.value)
    this.refs.editor.onDidStopChanging((event) => props.update(this.refs.editor.getText()))
  }
  render() {
    return <TextEditor ref='editor' mini/>
  }

  update() {
    return etch.update(this)
  }
}
