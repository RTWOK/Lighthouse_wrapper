import { spawn } from 'node:child_process';

const commands = [
    {
        name: 'css',
        command: 'npm',
        args: ['run', 'watch:css']
    },
    {
        name: 'js',
        command: 'npm',
        args: ['run', 'watch:js']
    }
];

const children = commands.map(({ name, command, args }) => {
    const child = spawn(command, args, {
        shell: true,
        stdio: 'inherit'
    });

    child.on('exit', (code) => {
        if (code) {
            console.error(`${name} watcher exited with code ${code}`);
            process.exitCode = code;
        }
    });

    return child;
});

function stopWatchers() {
    for (const child of children) {
        child.kill();
    }
}

process.on('SIGINT', () => {
    stopWatchers();
    process.exit();
});

process.on('SIGTERM', () => {
    stopWatchers();
    process.exit();
});
