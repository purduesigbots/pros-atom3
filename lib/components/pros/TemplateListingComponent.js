'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class TemplateListingComponent {
  constructor(props) {
    this.props = props
    this.noop = () => {}
    this.needUpgrade = !!this.props.upgradeList.length
    if (this.needUpgrade) { // only need to set these if there is an upgrade
      this.versionList = this.props.upgradeList.map(e => <option value={e}>{e}</option>)
      this.versionList.unshift(<option selected value='latest'>latest</option>)
      this.selectedVersion = this.versionList[0]
      this.handleChange = event => this.props.onChanged(`${this.props.name}@${event.target.value}`)
    }
    this.versionList = this.versionList || <option>up-to-date!</option>
    etch.initialize(this)
  }
  update() {
    return etch.update(this)
  }
  render() {
    return (
      <div>
        <h6>{this.props.name}@{this.props.currentVersion}</h6>
        <select
          class='form-control'
          onChange={this.handleChange || this.noop}
          disabled={!this.needUpgrade}>
          {this.versionList}
        </select>
      </div>
    )
  }
  destroy() {
    return etch.destroy(this)
  }
}
