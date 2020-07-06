"use babel";
/** @jsx etch.dom */

import etch from "etch";
import { getVersion } from '@purduesigbots/pros-cli-middleware'
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

          <svg viewBox='0 0 89 89.6'>
          <polygon points='73.4 37.6 88.6 50.7 44.4 89.2 44.4 89.1 44.4 89.2 0.4 50.9 15.7 37.7 44.5 79.9 ' style={
      { fill: '#E7BC70' }}/>
          <polygon points='44.5 89.1 88.6 50.7 73.4 37.6 44.5 79.9 ' style={{fill: '#E7BC70'}}/>
          <polygon points='81.9 21.6 44.5 76.5 7.1 21.6 44.5 0.4 ' style={
      { fill: '#E7BC70' }}/>
          <path d='M44.5 76.4l37.3-54.8 -6 8.6H44.5V76.4zM56.5 52.9l-0.3-19.6 19.4-2.8L56.5 52.9z' style={{fill: '#E7BC70'}}/>
          <polygon points='44.5 0.4 44.5 10.7 47.4 12.1 47.4 15 44.5 16.5 44.5 21.6 81.9 21.6 ' style={
      { fill: '#E7BC70' }}/>
          <polygon points='81.9 21.6 44.5 67.7 7.1 21.6 44.5 4.8 ' style={{fill: '#060500'}}/>
          <polygon points='44.5 4.8 44.5 4.8 44.5 67.6 44.5 67.7 81.9 21.6 ' style={
      { fill: '#2F2D29' }}/>
          <polygon points='13.1 30.3 75.8 30.3 81.9 21.6 7.1 21.6 ' style={{fill: '#E7BC70'}}/>
          <polygon points='44.5 21.6 44.5 30.3 75.8 30.3 81.9 21.6 ' style={
      { fill: '#E7BC70' }}/>
          <polygon points='65.6 25.9 23.4 25.9 20.4 21.5 68.5 21.5 ' style={{fill: '#060500'}}/>
          <polygon points='44.5 21.5 44.5 25.9 65.6 25.9 68.6 21.5 ' style={
      { fill: '#2F2D29' }}/>
          <polygon points='22.5 24.4 23.4 25.9 65.6 25.9 66.5 24.4 ' style={{fill: '#7E868C'}}/>
          <circle cx='44.5' cy='33.7' r='1.2' style={
      { fill: '#7E868C' }}/>
          <circle cx='44.5' cy='38.8' r='1.2' style={{fill: '#7E868C'}}/>
          <circle cx='44.5' cy='43.8' r='1.2' style={
      { fill: '#7E868C' }}/>
          <polygon points='32.5 52.7 32.7 33.2 13.3 30.3 ' style={{fill: '#E7BC70'}}/>
          <polygon points='32.5 52.7 27.5 38.2 13.3 30.3 ' style={
      { fill: '#060500' }}/>
          <polygon points='56.5 52.9 56.2 33.2 75.6 30.4 ' style={{fill: '#E7BC70'}}/>
          <polygon points='56.2 33.2 56.5 52.9 75.6 30.4 ' style={
      { fill: '#E7BC70' }}/>
          <polygon points='56.5 52.9 61.6 38.2 75.6 30.4 ' style={{fill: '#2F2D29'}}/>
          <polygon points='47.4 15 44.5 16.5 41.5 15 41.5 12.1 44.5 10.7 47.4 12.1 ' style={
      { fill: '#E7BC70' }}/>
          <polygon points='44.5 10.7 44.5 16.5 47.4 15 47.4 12.1 ' style={{fill: '#E7BC70'}}/>
          <path d='M45.2 70.8c0 0.3-0.3 0.6-0.6 0.6h-0.3c-0.3 0-0.6-0.3-0.6-0.6v-22.3c0-0.3 0.3-0.6 0.6-0.6h0.3c0.3 0 0.6 0.3 0.6 0.6V70.8z' style={
      { fill: '#7E868C' }}/>
        </svg>

        <svg xmlns='http://www.w3.org/2000/svg' width='160' height='35' viewBox='0 0 160 35'>
          <path d='M29.9 12.6c0 7.8-4.9 12.4-13.4 12.4h-5.9v9.2H1.9V0.9h14.6C25 0.9 29.9 5.2 29.9 12.6zM21.6 12.8c0-3.3-2-5-5.5-5h-5.5v10.2h5.5C19.6 18 21.6 16.2 21.6 12.8z'/>
          <path d='M62.5 34.1l-4.8-9.2h-0.2 -6.3v9.2h-8.7V0.9h14.9c8.8 0 13.8 4.3 13.8 11.7 0 5-2.1 8.7-5.9 10.7l6.9 10.8H62.5zM51.3 18h6.3c3.5 0 5.5-1.8 5.5-5.2 0-3.3-2-5-5.5-5h-6.3V18z'/>
          <path d='M119.1 17.5c0 9.7-7.7 17-18 17 -10.3 0-17.9-7.3-17.9-17 0-9.7 7.7-16.8 18-16.8C111.4 0.7 119.1 7.9 119.1 17.5zM92.1 17.5c0 5.4 4.2 9.6 9.1 9.6 5 0 9-4.2 9-9.6s-4-9.5-9-9.5C96.3 8.1 92.1 12.1 92.1 17.5z'/>
          <path d='M144 7.6c-2.1 0-3.5 0.8-3.5 2.3 0 5.5 17.5 2.4 17.5 14.3 0 6.8-6 10.2-13.4 10.2 -5.5 0-11.3-2-15.3-5.3l3.4-6.8c3.4 2.9 8.6 5 12 5 2.6 0 4.2-0.9 4.2-2.7 0-5.6-17.5-2.2-17.5-14 0-6.2 5.3-10.1 13.3-10.1 4.9 0 9.8 1.5 13.3 3.7l-3.3 6.9C151.2 9.1 146.8 7.6 144 7.6z'/>
        </svg>

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
