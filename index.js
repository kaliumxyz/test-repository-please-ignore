#!/usr/bin/env node
"use strict"
/* native */
const child = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')


/* npm */
const parseArgs = require('minimist')(process.argv)
const chalk = require('chalk')

const settings = {
	repo: parseArgs.dir || "test",
	date: parseArgs.time || "2000-01-01 00:00:01" // why 2k?
}

fs.mkdir(settings.repo, console.error)
fs.writeFile(path.join(settings.repo, "test"),"wat", console.error)

// doesn't work on windows, so terminates (probably works on linux)
if(os.type() === 'Windows_NT'){
	console.log(chalk.bgRed("Windows is not supported </3"))
	process.exit(1)
}

// date should always be yyyy-mm-dd hh:mm:ss
child.exec(`git init; export GIT_COMMITTER_DATE="${settings.date}" && export GIT_AUTHOR_DATE="${settings.date}" && git commit -am "init"`, {cwd: settings.repo, shell: true}).stderr.pipe(process.stderr)