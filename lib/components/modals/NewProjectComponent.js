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
    // TODO: properly handle target param
    this.setTarget = target => this.target = target

    // default path logic:
    // 1. path = os.homedir()
    // 2. if there is an active editor, path = editor.getDirectoryPath()
    // 2.1 if there are also projects open, find project directory associated
    //      with the currently active file and set path to parent directory of
    //      that directory
    // 2.2 if there are no projects open or the active file isn't part of one,
    //      fallthrough case is (2)
    // 3. if there is no active editor (in (2)), use first project's parent dir
    // 4. if after 1-3 the default path is still undefined (e.g. default buffer
    //      is open), set to os.homedir
    // 5. if all else fails, fallthrough case is (1)
    let defaultPath = os.homedir()
    const activeEditor = atom.workspace.getActiveTextEditor()
    if (activeEditor) {
      defaultPath = activeEditor.getDirectoryPath()
      if (atom.project.rootDirectories.length) {
        for (let dir of atom.project.rootDirectories) {
          if (dir.isPathPrefixOf(dir.realPath, activeEditor.getPath())) {
            defaultPath = path.dirname(dir.realPath)
          }
        }
      }
    } else {
      if (atom.workspace.project.getPaths().length) {
        defaultPath = path.dirname(atom.workspace.project.getPaths()[0])
      }
    }
    if (defaultPath === undefined) defaultPath = os.homedir()

    this.inputElem = <FolderPickerComponent defaultPath={defaultPath} onChanged={this.setPath} />
    this.dropdown = <KernelPickerComponent onChanged={this.setKernel} onTargetChanged={this.setTarget} />

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
