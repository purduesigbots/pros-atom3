'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class TemplateListingComponent {
  constructor(props) {
    this.props = props
    this.needUpgrade = !!this.props.upgradeList.length
    if (this.needUpgrade) { // only need to set these if there is an upgrade
      this.versionList = this.props.upgradeList.map(e => <option>{e}</option>)
      this.versionList.unshift(<option selected>latest</option>)
      this.handleChange = event => this.props.onChanged(`${this.props.name}@${event.target.value}`)
    }
    etch.initialize(this)
    this.contents = this.needUpgrade ? (<div>
      Upgrade to:
      <select class='form-control' value={this.selectedVersion} onChange={this.handleChange}>
        {this.versionList}
      </select>
    </div>) : 'up-to-date!'
  }
  update() {
    return etch.update(this)
  }
  render() {
    return (
      <div>
        <h6>{this.props.name}@{this.props.currentVersion}</h6>
        {this.contents}
      </div>
    )
  }
}
