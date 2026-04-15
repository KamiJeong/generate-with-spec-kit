const { EventEmitter } = require('node:events');
const { PassThrough } = require('node:stream');
const childProcess = require('node:child_process');
const { syncBuiltinESMExports } = require('node:module');

const originalExec = childProcess.exec;

childProcess.exec = function exec(command, options, callback) {
  const normalizedCommand = String(command).trim().toLowerCase();
  const done = typeof options === 'function' ? options : callback;

  if (normalizedCommand === 'net use') {
    const child = new EventEmitter();
    child.stdout = new PassThrough();
    child.stderr = new PassThrough();
    child.stdin = new PassThrough();
    child.kill = () => true;

    process.nextTick(() => {
      if (done) done(null, '', '');
      child.emit('close', 0);
      child.emit('exit', 0);
      child.stdout.end();
      child.stderr.end();
    });

    return child;
  }

  return originalExec.apply(this, arguments);
};

syncBuiltinESMExports();
