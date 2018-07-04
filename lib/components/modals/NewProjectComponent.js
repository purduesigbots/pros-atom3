'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import os from 'os'
import path from 'path'

import GenericModalComponent from './GenericModalComponent.js'
import { YesNoButtonComponent } from '../buttons'
import { FolderPickerComponent, KernelPickerComponent } from '../pros'

export default class NewProjectComponent {
  constructor(props) {
    this.props = props

    this.path = ''
    this.setPath = path => {
      this.path = path
      this.update()
    }
    this.setKernel = kernel => this.kernel = kernel
    let defaultPath = os.homedir()
    const activeEditor = atom.workspace.getActiveTextEditor()
    if (activeEditor) {
      defaultPath = path.dirname(activeEditor.getPath())
    } else {
      if (atom.workspace.project.getPaths().length) {
        defaultPath = path.dirname(atom.workspace.project.getPaths()[0])
      } // fallthrough: os.homedir()
    }
    this.inputElem = <FolderPickerComponent defaultPath={defaultPath} onChanged={this.setPath} />
    this.dropdown = <KernelPickerComponent onChanged={this.setKernel} />

    etch.initialize(this)
  }
  update() {
    return etch.update(this)
  }
  render() {
    this.buttons = [
      <YesNoButtonComponent yes onclick={this.props.confirm(this)} disabled={this.path === ''} confirmText='Create Project' />,
      <YesNoButtonComponent onclick={this.props.cancel(this)} />
    ]
    return (
      <GenericModalComponent
        modalClass='new-project-modal'
        message='Create a new PROS Project'
        inputElem={this.inputElem}
        dropdownElem={this.dropdown}
        buttons={this.buttons}/>
    )
  }
  destroy() {
    return etch.destroy(this)
  }
}
