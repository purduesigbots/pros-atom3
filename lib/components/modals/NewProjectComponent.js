'use babel'
/** @jsx etch.dom */

import etch from 'etch'

import GenericModalComponent from './GenericModalComponent.js'
import { YesNoButtonComponent } from '../buttons'
import { FolderPickerComponent, KernelPickerComponent } from '../pros'

export default class NewProjectComponent {
  constructor(props) {
    this.props = props

    this.path = ''
    this.setPath = path => this.path = path
    this.setKernel = kernel => this.kernel = kernel

    this.inputElem = <FolderPickerComponent onChanged={this.setPath} />
    this.dropdown = <KernelPickerComponent onChanged={this.setKernel} />
    this.buttons = [
      <YesNoButtonComponent yes onclick={this.props.confirm(this)} confirmText='Create Project' />,
      <YesNoButtonComponent onclick={this.props.cancel(this)} />
    ]

    etch.initialize(this)
  }
  update() {
    return etch.update(this)
  }
  render() {
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
