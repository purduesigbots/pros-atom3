'use babel';
/** @jsx etch.dom */

import etch from 'etch';

import { TextEditor } from 'atom';
import { YesNoButtonComponent } from './buttons.js';
import { GenericModalComponent } from './modals.js';

class FilePickerComponent {
  constructor(props) {
    this.props = props;

    this.onPickDir = cmp => event => {
      const { onChanged } = cmp.props;
      atom.pickFolder(paths => {
        if (paths && paths[0]) {
          onChanged(paths[0]);
          this.update({dir: paths[0]});
        }
      });
    };

    etch.initialize(this);

    this.refs.editor.setPlaceholderText('Enter a path');
  }
  update(props) {
    if (props.dir && this.dir !== props.dir) {
      this.refs.editor.setText(props.dir);
    }
    return etch.update(this);
  }
  render() {
    return (
      <div class='file-picker'>
        <h4>Choose a directory</h4>
        <div style='display: flex; flex-direction: row-reverse;'>
          <button class='btn btn-default' onclick={this.onPickDir(this)}>
            <span class='icon icon-ellipsis'></span>
          </button>
          <div class='editor-container' style='flex-grow: 3;'>
            <TextEditor mini ref='editor' />
          </div>
        </div>
      </div>
    );
  }
  destroy() {
    return etch.destroy(this);
  }
}

class KernelPickerComponent {
  constructor(props) {
    this.props = props;

    this.onPickKernel = cmp => event => {};

    etch.initialize(this);
  }
  update() {
    return etch.update(this);
  }
  render() {
    return <div></div>;
  }
  destroy() {
    return etch.destroy(this);
  }
}

export class NewProjectComponent {
  constructor(props) {
    this.props = props;

    this.path = '';
    this.setPath = path => this.path = path;

    this.inputElem = <FilePickerComponent onChanged={this.setPath} />
    this.buttons = [
      <YesNoButtonComponent yes onclick={this.props.confirm(this)} text='Create Project' />,
      <YesNoButtonComponent onclick={this.props.cancel(this)} />
    ];

    etch.initialize(this);
  }
  get path() {
    return this.path;
  }
  update() {
    return etch.update(this);
  }
  render() {
    return (
      <GenericModalComponent
        modalClass='new-project-modal'
        message='Create a new PROS Project'
        inputElem={this.inputElem}
        buttons={this.buttons}/>
    );
  }
  destroy() {
    return etch.destroy(this);
  }
}

// TODO: add other components
