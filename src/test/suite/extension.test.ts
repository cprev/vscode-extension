import * as assert from 'assert';
import * as net from 'net';
import * as vscode from 'vscode';
import { deactivate } from '../../extension';

suite('Extension host integration', () => {
    suiteSetup(async () => {
        const extension = vscode.extensions.getExtension('cprev.cprev-vscode-extension');
        assert.ok(extension, 'development extension must be installed');
        await extension!.activate();
        assert.strictEqual(extension!.isActive, true);
    });

    suiteTeardown(() => deactivate());

    test('activation registers the command in the real extension host', async () => {
        const commands = await vscode.commands.getCommands(true);
        assert.ok(commands.includes('extension.helloWorld123'));
    });

    test('the host dispatches the registered command without an error', async () => {
        await vscode.commands.executeCommand('extension.helloWorld123');
    });

    test('the activated server accepts and closes a real loopback connection', () => {
        return new Promise<void>((resolve, reject) => {
            const socket = net.createConnection({ host: '127.0.0.1', port: 3119 });
            socket.setTimeout(2000);
            socket.once('error', reject);
            socket.once('timeout', () => socket.destroy(new Error('local connection timed out')));
            socket.once('connect', () => socket.end());
            socket.once('close', hadError => {
                if (!hadError) {
                    resolve();
                }
            });
        });
    });
});
