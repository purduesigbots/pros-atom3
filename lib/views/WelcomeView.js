"use babel";
/** @jsx etch.dom */

import etch from "etch";
import { getVersion } from '@purduesigbots/pros-cli-middleware'
import { Logo, Text } from '../components/pros'
import { CompositeDisposable } from "atom";

class Welcome {
  constructor() {
    this.cliVersion = "0.0.0"
    this.pkgVersion = "0.0.0"

    this.subscriptions = new CompositeDisposable();
    getVersion().then(version => { this.version = version; etch.update(this); })

    etch.initialize(this);
  }

  didChangeShowOnStartup() {
    atom.config.set("pros-atom3.welcome.enabled", this.checked);
  }

  didChangeAnalytics() {
    atom.config.set("pros-atom3.googleAnalytics.enabled", this.checked);
  }

  update() {
    return etch.update(this);
  }

  getTitle() {
    return "Welcome";
  }

  getIconName() {
    return "pros";
  }

  getURI() {
    return "pros://welcome";
  }

  render() {
    const cliVersion = this.version ? <span className="badge badge-flexible">{this.version}</span> : <span className='loading loading-spinner-large inline-block'></span>

    this.pkgVersion = atom.packages.getLoadedPackage(
      "pros-atom3"
    ).metadata.version;

    return (
      <div className='pros-welcome'>
        <div className='container'>
          <header className='header'>
                <Logo />
                <Text />
            <h1 className="title">
              Open Source C/C++ Development for VEX V5 and VEX Cortex
            </h1>
          </header>
          <section className='cli-update'>{/* TODO */}</section>
          <section className="panel">
            <p>For help, please visit:</p>
            <ul>
              <li>
                <a href='https://pros.cs.purdue.edu/v5/getting-started/new-users.html'>
                  This Page
                </a>{" "}
                for a guide to getting started with PROS for Atom.
              </li>

              <li>
                The{' '}
                <a href='https://pros.cs.purdue.edu/v5/tutorials/index.html'>
                  PROS tutorial page
                </a>{" "}
                to learn about using everything from sensors to motors to tasks
                and multithreading in PROS.
              </li>

              <li>
                The{' '}
                <a href='https://pros.cs.purdue.edu/v5/api/index.html'>
                  PROS API documentation
                </a>{" "}
              </li>
            </ul>
            <section className="welcome-panel">
              <form>
                <label>
                  <input
                    className="input-checkbox"
                    type="checkbox"
                    checked={atom.config.get("pros-atom3.welcome.enabled")}
                    onchange={this.didChangeShowOnStartup}
                  />
                  Show Welcome Guide when opening Atom
                </label>
                <br />
                <label>
                  <input
                    className="input-checkbox"
                    type="checkbox"
                    checked={atom.config.get("pros-atom3.googleAnalytics.enabled")}
                    onchange={this.didChangeAnalytics}
                  />
                  Send anonymous usage statistics
                </label>
              </form>
            </section>
            <div
              className="versions"
              onclick={atom.clipboard.write(
                `PROS CLI: ${this.version} - Package: ${this.pkgVersion}`
              )}
            >
              <div>
                <div className="block">
                  <span>CLI: </span>
                    {cliVersion}
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
            <a href="https://pros.cs.purdue.edu">pros.cs.purdue.edu</a>{" "}
            <span className="text-subtle">×</span>{" "}
            <a
              className="icon icon-octoface"
              href="https://github.com/purduesigbots"
              dataset={{ event: "footer-octocat" }}
            />
          </footer>
        </div>
      </div>
    );
  }

  destroy() {
    this.subscriptions.dispose();

    return etch.destroy(this);
  }
}

export default class WelcomeViewWrapper {
  constructor() {
    this.wv = new Welcome();
  }

  getDefaultLocation() {
    return "center";
  }
  getTitle() {
    return "Welcome";
  }
  getURI() {
    return "pros://welcome";
  }
  getIconName() {
    return "pros";
  }
  async destroy() {
    await this.wv.destroy();
  }
  getElement() {
    return this.wv.element;
  }
}
