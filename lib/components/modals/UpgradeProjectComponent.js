'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { getProjectInfo } from '@purduesigbots/pros-cli-middleware'

import GenericModalComponent from './GenericModalComponent.js'
import { YesNoButtonComponent } from '../buttons'
import { FilePickerComponent, ListProjectTemplatesComponent } from '../pros'

export default class UpgradeProjectComponent {
  constructor(props) {
    this.props = props
    this.generateList = d => {
        console.log('generating list', d)
        this.listTemplates = (
          <ListProjectTemplatesComponent
            templates={d.data.project.templates}
            onChanged={this.props.onChanged} />
        )
        console.log(this.listTemplates)
        etch.update(this)
    }
    this.setPath = path => {
      console.log('getting project info')
      this.path = path
      this.listTemplates = <span class='loading loading-spinner-medium'></span>
      etch.update(this) // show loading spinner
      getProjectInfo({
          notify: n => console.log(n),
          log: l => console.log(l),
          finalize: finalData => this.generateList(finalData)
        }, // update list when ready
        this.path, {upgrades: true}
      ).catch(e => console.error(e))
    }
    this.inputElem = <FilePickerComponent onChanged={this.setPath} />
    this.buttons = [
      <YesNoButtonComponent yes onclick={this.props.confirm(this)} confirmText='Upgrade' />,
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
        message='Upgrade a PROS Project'
        inputElem={this.inputElem}
        dropdownElem={this.listTemplates}
        buttons={this.buttons} />
      )
  }
  destroy() {
    return etch.destroy(this)
  }
}
