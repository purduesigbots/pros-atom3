'use babel';

import fs from 'fs';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';
import voucher from 'voucher';
import { EventEmitter } from 'events';

export function provideBuilder() {
  const gccErrorMatch = '(?<file>([A-Za-z]:[\\/])?[^:\\n]+):(?<line>\\d+):(?<col>\\d+):\\s*(fatal error|error):\\s*(?<message>.+)';
  const gfortranErrorMatch = '(?<file>[^:\\n]+):(?<line>\\d+):(?<col>\\d+):[\\s\\S]+?Error: (?<message>.+)';
  const ocamlErrorMatch = '(?<file>[\\/0-9a-zA-Z\\._\\-]+)", line (?<line>\\d+), characters (?<col>\\d+)-(?<col_end>\\d+):\\n(?<message>.+)';
  const golangErrorMatch = '(?<file>([A-Za-z]:[\\/])?[^:\\n]+):(?<line>\\d+):\\s*(?<message>.*error.+)';
  const errorMatch = [
    gccErrorMatch, gfortranErrorMatch, ocamlErrorMatch, golangErrorMatch
  ];

  const gccWarningMatch = '(?<file>([A-Za-z]:[\\/])?[^:\\n]+):(?<line>\\d+):(?<col>\\d+):\\s*(warning):\\s*(?<message>.+)';
  const warningMatch = [
    gccWarningMatch
  ];

  return class MakeBuildProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
      atom.config.observe('pros-atom3.build.cmd', () => this.emit('refresh'));
    }

    getNiceName() {
      return 'PROS Make';
    }

    isEligible() {
      this.files = [ 'Makefile', 'GNUmakefile', 'makefile' ]
        .map(f => path.join(this.cwd, f))
        .filter(fs.existsSync);
      return this.files.length > 0;
    }

    settings() {
      const buildCmd = atom.config.get('pros-atom3.build.cmd')[0];
      const args = atom.config.get('pros-atom3.build.cmd').slice(1);

      const defaultTarget = {
        exec: buildCmd,
        name: 'PROS Make: default (no target)',
        args,
        sh: false,
        errorMatch: errorMatch,
        warningMatch: warningMatch,
        postBuild: (buildOutput, stdout, stderr) => {
          console.log(`Build outcome: ${buildOutput}`);
        }
      };

      const promise = atom.config.get('pros-atom3.build.useMake') ?
        voucher(exec, `${atom.config.get('pros-atom3.build.cmd').join(' ')} -prRn :`, { cwd: this.cwd }) :
        voucher(fs.readFile, this.files[0]); // Only take the first file

      return promise.then(output => {
        return [ defaultTarget ].concat(output.toString('utf8')
          .split(/[\r\n]{1,2}/)
          .filter(line => /^[a-zA-Z0-9][^$#\/\t=]*:([^=]|$)/.test(line))
          .map(targetLine => targetLine.split(':').shift())
          .filter( (elem, pos, array) => (array.indexOf(elem) === pos) )
          .map(target => ({
            exec: buildCmd,
            args: args.concat([ target ]),
            name: `PROS Make: ${target}`,
            sh: false,
            errorMatch: errorMatch,
            warningMatch: warningMatch
          })));
      }).catch(e => [ defaultTarget ]);
    }
  };
}
