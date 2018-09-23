'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { TextEditor } from 'atom'
import { ParameterizedComponent  as _ParameterizedComponent} from '@purduesigbots/pros-cli-middleware'

class TextEditorWrapper {
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

export class ParameterizedComponent extends _ParameterizedComponent {
  constructor(args) {
    super(args);
  }

  render() {
    console.log(this.valid)
    return (
      <div class={`pros ${this.valid === false ? 'is-invalid' : ''}`}>
        <TextEditorWrapper value={this.value} update={(value) => this.update(value)} />
      </div>
    )
  }
}
