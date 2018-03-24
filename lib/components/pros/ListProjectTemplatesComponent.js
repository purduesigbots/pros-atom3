'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class ListProjectTemplatesComponent {
  constructor(props) {
    this.props = props
    this.upgradeList = []
    this.updateUpgradeList = q => {
      this.upgradeList.filter(e => !e.startsWith(q.split('@')[0])).push(q)
      this.props.onChanged(this.upgradeList)
    }
    console.log(this.props.templates)
    this.templateList = this.props.templates.map(t => {
      console.log(t)
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
    console.log(this.templateList)
    etch.initialize(this)
  }
  update() {
    return etch.update(this)
  }
  render() {
    return (
      <div>
        <ul>{this.templateList}</ul>
      </div>
    )
  }
  destroy() {
    return etch.destroy(this)
  }
}
