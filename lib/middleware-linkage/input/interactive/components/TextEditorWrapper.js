'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { TextEditor } from 'atom'

export default class TextEditorWrapper {
  constructor(props) {
    etch.initialize(this)

    this.refs.editor.setText(props.value)
    this.refs.editor.onDidStopChanging((event) => props.update(this.refs.editor.getText()))

    if(props.placeholder) {
      this.refs.editor.setPlaceholderText(props.placeholder)
    }
  }
  render() {
    return <TextEditor ref='editor' mini/>
  }

  update(props) {
    if(props.value) {
      this.refs.editor.setText(props.value)
    }
    if(props.update) {
      this.refs.editor.onDidStopChanging((event) => props.update(this.refs.editor.getText()))
    }
    if(props.placeholder) {
      this.refs.editor.setPlaceholderText(props.placeholder)
    }

    return etch.update(this)
  }
}
