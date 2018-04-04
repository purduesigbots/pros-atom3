'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import { getProjectInfo } from '@purduesigbots/pros-cli-middleware'

import GenericModalComponent from './GenericModalComponent.js'
import { YesNoButtonComponent } from '../buttons'
import { FolderPickerComponent, ListProjectTemplatesComponent } from '../pros'
import { zCLIjs } from '../../middleware-linkage'

export default class UpgradeProjectComponent {
  constructor(props) {
    this.props = props
    this.setPath = path => {
      console.log('getting project info')
      this.path = path
      this.listTemplates = <span class='loading loading-spinner-medium'></span>
      etch.update(this) // show loading spinner
      const cn = lst => {
        this.props.onChanged(lst)
        etch.update(this)
      }
      zCLIjs(
        getProjectInfo, {
          finalize: data => {
            this.listTemplates = <ListProjectTemplatesComponent templates={data.data.project.templates} onChanged={cn} />
            etch.update(this)
          }
        }, this.path, {upgrades: true}
      ).catch(e => console.error(e))
    }
    this.inputElem = <FolderPickerComponent onChanged={this.setPath} />
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
