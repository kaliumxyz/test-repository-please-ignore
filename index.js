#!/usr/bin/env node
/* native */
import child from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';


/* npm */
import args from 'args';
import chalk from 'chalk';

args
  .option('repo', 'the name of the repo', 'history')
  .option('start', 'Date to begin at', '1990-01-01 00:00:01')
  .option('end', 'Date to end at', '2099-01-01 00:00:01')

const flags = args.parse(process.argv)

console.log()

fs.mkdir(flags.repo, console.error)
fs.writeFile(path.join(flags.repo, "readme.md"),`
#history

I am a really good developer look at my git timeline like woah all green all the time forever
`, console.error)

// init
child.exec(`
    git init
    export GIT_COMMITTER_DATE="${flags.start}"
    export GIT_AUTHOR_DATE="${flags.start}"
    git commit -am "init"
    for i in $(seq 12000 1);
       do date -v "-$i"d +%Y-%m-%d\ %H:%M:%S;
    done
`, {cwd: settings.repo, shell: true}).stderr.pipe(process.stderr)
// // date should always be yyyy-mm-dd hh:mm:ss
// child.exec(`
//     export GIT_COMMITTER_DATE="${flags.start}"
//     export GIT_AUTHOR_DATE="${flags.start}"
//     git commit -am "init"
// `, {cwd: settings.repo, shell: true}).stderr.pipe(process.stderr)
