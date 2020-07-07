"use babel";
/** @jsx etch.dom */

import etch from "etch";
import { getVersion } from '@purduesigbots/pros-cli-middleware'
import { Logo, Text } from '../components/pros'
import { CompositeDisposable } from "atom";
import semver from 'semver'

class Welcome {
  constructor() {
    this.cliVersion = null
    this.pkgVersion = null
    this.manifestVersion = null
    this.manifestUrl = null

    this.subscriptions = new CompositeDisposable();
    getVersion().then(version => { this.version = version; etch.update(this); })

    fetch("https://purduesigbots.github.io/pros-mainline/stable/UpgradeManifestV1.json")
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        this.manifestUrl = jsonResponse.info_url
        this.manifestVersion = `${jsonResponse.version.major}.${jsonResponse.version.minor}.${jsonResponse.version.patch}`
      });

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
    const cliVersion = this.version ? <span className="badge badge-flexible">{this.version}</span> : <span className='loading loading-spinner-tiny inline-block'></span>
    updateView = ""

      if (this.version == null) {
        updateView =
            <section className='cli-update error'>
              <div>
            <span class='icon icon-stop'></span>
              <div>
                PROS CLI was not found on your PATH!<br/>
                Make sure PROS CLI is installed and available on PATH.
              </div>
              <div class='actions'>
              <div class='btn-group'>
                  <a href ="https://pros.cs.purdue.edu/" class='btn btn-primary icon icon-globe' id='goToTroubleshootingPath'>
                    Learn more
                  </a>
                  <button class='btn icon icon-sync' id='refreshPROSCLI'>
                      Refresh
                  </button>
                </div>
              </div>
              </div>
            </section>
      } else if (semver.gt(this.manifestVersion, this.version)) {
        var elem = document.getElementById('id');
        updateView =
          <section className='cli-update'>
              <div>
                <span class='icon icon-info'></span>
                  <div>
                    PROS CLI is out of date! Some features may not be available.
                    Update to {this.manifestVersion} get the latest features and patches.
                  </div>
                    <div class='actions'>
                      <div class='btn-group'>
                        <a href = {this.manifestUrl} class='btn btn-primary icon icon-cloud-download' id='downloadPROSUpdate'>
                            Install
                        </a>
                        <button class='btn icon icon-sync' id='refreshPROSCLI'>
                            Refresh
                        </button>
                      </div>
                    </div>
              </div>
          </section>
      }

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
          {updateView}
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
            <div className="versions">
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
