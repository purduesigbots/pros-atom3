'use babel'
/** @jsx etch.dom */

import etch from 'etch'

import TemplateListingComponent from './TemplateListingComponent.js'

export default class ListProjectTemplatesComponent {
  constructor(props) {
    this.props = props
    this.upgradeList = []
    this.updateUpgradeList = q => {
      this.upgradeList = this.upgradeList.filter(e => !e.startsWith(q.split('@')[0]))
      this.upgradeList.push(q)
      this.props.onChanged(this.upgradeList)
    }
    this.templateList = this.props.templates.map(t => {
      return (
        <li>
          <TemplateListingComponent
            name={t.name}
            currentVersion={t.version}
            upgradeList={t.upgrades}
            onChanged={this.updateUpgradeList} />
        </li>
      )
    })
    etch.initialize(this)
  }
  update() {
    return etch.update(this)
  }
  render() {
    return <ul>{this.templateList}</ul>
  }
  destroy() {
    return etch.destroy(this)
  }
}
