const fs = require('fs');
const exec = require('child_process').exec;

let timer;

document.getElementById('path-input').addEventListener('keyup', event => {
    clearTimeout(timer);

    timer = setTimeout(_ => {
        const directoryPath = event.target.value;
        if (isValid(directoryPath)) checkGitStatus(directoryPath);
    }, 500);
});

function checkGitStatus(directoryPath) {
    exec('git status', {
        cwd: directoryPath
    }, (error, stdout, stderror) => {
        console.log('error', error);
        console.log('stdout', stdout);
        console.log('stderror', stderror);

        if (error) setStatus('Error, this directory is not a git repository');
        if (stdout) setStatus(stdout);
    });
}

function setStatus(statusText) {
    document.getElementById('status').innerHTML = statusText;
}

function isValid(directoryPath) {
    try {
        return fs.lstatSync(directoryPath).isDirectory();
    } catch (error) {
        return false;
    }
}
