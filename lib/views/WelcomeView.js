'use babel'
/** @jsx etch.dom */

import etch from 'etch'
//import { getVersion } from '@purduesigbots/pros-cli-middleware'
import { default as Brand } from './Brand'
import { CompositeDisposable } from 'atom'
import shell from 'shell'

class Welcome {
  constructor(props, children) {
    //this.props = props

    this.subscriptions = new CompositeDisposable()

    etch.initialize(this)
  }

  update() {
    return etch.update(this)
  }

  readAfterUpdate() {
    if (!atom.tooltips.findTooltips(document.getElementById('ga-input')).length) {
      this.subscriptions.add(
        atom.tooltips.add(
        document.getElementById('ga-input'), {
          title: "We send anonymous analytics on startup of Atom to track active users.<br/> To disable, uncheck this box or disable telemetry within Atom"
        })
      )
    }

    if (!atom.tooltips.findTooltips(document.getElementByClass('versions')).length) {
      this.subscriptions.add(
        atom.tooltips.add(
        document.getElementByClass('versions'), {
          title: "Click to copy version info"
        })
      )
    }
  }

  getTitle(){
    return "Welcome"
  }

  getIconName(){
    return "pros"
  }

  getURI(){
    return "pros://welcome"
  }

  render() {
    const handleCheckBox = id => event => atom.config.set(id, event.target.value)
    /*
    try {
      this.cliVersion = getVersion()
    } catch (ex) {
      this.cliVersion = null
      // TODO: some other stuff
      console.error(ex)
    }
    */

    this.cliVersion = null
    this.pkgVersion = atom.packages.getLoadedPackage('pros-atom3').metadata.version

    return (
      <div className="pros-welcome">
        <div className="container">
          <header className="header">
            {/*<Brand.Tux fullColor={true} />
            <Brand.Text />*/}
            <h1 className="title">Open Source C/C++ Development for VEX V5 and VEX Cortex</h1>
          </header>
          <section className="cli-update">
            {/* TODO */}
          </section>
          <section className="panel">
            <p>For help, please visit:</p>
            <ul>
              <li>
              {' '}
                <a
                href="https://pros.cs.purdue.edu/v5/getting-started/new-users.html"
                >
                This Page
                </a>{' '}
                for a guide to getting started with PROS for Atom.
              </li>

              <li>
              The{' '}
               <a
                 href="https://pros.cs.purdue.edu/v5/tutorials/index.html"
               >
               PROS tutorial page
               </a>{' '}
               to learn about using everything from sensors to motors to tasks and multithreading in PROS.
               </li>

              <li>
              The{' '}
              <a
                href="https://pros.cs.purdue.edu/v5/api/index.html"
              >
              PROS API documentation
              </a>{' '}
              </li>

            </ul>
            <div className="welcome-settings">
              <form>
                <label>
                  <input
                    type="checkbox"
                    className="input-checkbox"
                    defaultChecked={atom.config.get("pros.welcome.enabled")}
                    onChange={handleCheckBox('pros.welcome.enabled')} />
                  Show this page when opening Atom
                </label>
                <br />
                <label>
                  <input
                    id="ga-input"
                    type="checkbox"
                    className="input-checkbox"
                    defaultChecked={atom.config.get("pros.googleAnalytics.enabled")}
                    onChange={handleCheckBox('pros.googleAnalytics.enabled')} />
                  Send anonymous usage statistics
                </label>
              </form>
            </div>
            <div
              className="versions"
              onclick={atom.clipboard.write(`PROS CLI: ${this.cliVersion} - Package: ${this.pkgVersion}`)} >
              <div>
                <div className="block">
                  <span>CLI: </span>
                  <span className="badge badge-flexible">
                    {this.cliVersion}
                  </span>
                </div>
                <div className="block">
                  <span>Plugin: </span>
                  <span className="badge badge-flexible">
                    {this.pkgVersion}
                  </span>
                </div>
              </div>
            </div>
          </section>
          <footer className="footer">
            <a href="https://pros.cs.purdue.edu">
              pros.cs.purdue.edu
              </a>{' '}
              <span className="text-subtle">×</span>{' '}
              <a
                className="icon icon-octoface"
                href="https://github.com//purduesigbots"
                dataset={{ event: 'footer-octocat' }}
              />
          </footer>
        </div>
      </div>
    )
  }

  destroy() {
    this.subscriptions.dispose()

    return etch.destroy(this)
  }
}

export default class WelcomeViewWrapper {
  constructor() {
    this.wv = new Welcome()
  }

  getDefaultLocation() {
    return "center"
  }
  getTitle() {
    return "Welcome"
  }
  getURI() {
    return "pros://welcome"
  }
  getIconName() {
    return "pros"
  }
  async destroy() {
    await this.wv.destroy()
  }
  getElement() {
    return this.wv.element
  }
}
