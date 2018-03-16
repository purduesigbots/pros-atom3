'use babel';
/** @jsx etch.dom */

import etch from 'etch';

import { TextEditor } from 'atom';
import { listTemplates } from '@purduesigbots/pros-cli-middleware';

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

    this.latestOption = <option selected>latest</option>;
    this.kList = [this.latestOption];
    // set up callback for updating this value
    this.handleChange = event => this.props.onChanged(event.target.value);

    etch.initialize(this);

    // set initial value
    this.props.onChanged(this.latestOption.domNode.value);
    listTemplates(
      n => console.log(n),
      l => console.log(l),
      finalData => this.dispList(finalData)
    ).catch(e => console.error(e));
  }
  dispList(d) {
    this.kList = d.data.map(e => {
      return <option value={e.version}>{`${e.name}@${e.version} from ${e.location}`}></option>;
    });
    this.kList.unshift(this.latestOption);
    etch.update(this);
  }
  update() {
    return etch.update(this);
  }
  render() {
    return (
      <div class='kernel-picker'>
        <h4>Choose a kernel</h4>
        <div>
          <select value={this.selectedKernel} onChange={this.handleChange}>
            {this.kList || ''}
          </select>
        </div>
      </div>
    );
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
    this.setKernel = kernel => this.kernel = kernel;

    this.inputElem = <FilePickerComponent onChanged={this.setPath} />;
    this.dropdown = <KernelPickerComponent onChanged={this.setKernel} />;
    this.buttons = [
      <YesNoButtonComponent yes onclick={this.props.confirm(this)} confirmText='Create Project' />,
      <YesNoButtonComponent onclick={this.props.cancel(this)} />
    ];

    etch.initialize(this);
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
        dropdownElem={this.dropdown}
        buttons={this.buttons}/>
    );
  }
  destroy() {
    return etch.destroy(this);
  }
}

// TODO: add other components
