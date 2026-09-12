"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const net = require("net");
const vscode = require("vscode");
const extension_1 = require("../../extension");
suite('Extension host integration', () => {
    suiteSetup(() => __awaiter(void 0, void 0, void 0, function* () {
        const extension = vscode.extensions.getExtension('cprev.cprev-vscode-extension');
        assert.ok(extension, 'development extension must be installed');
        yield extension.activate();
        assert.strictEqual(extension.isActive, true);
    }));
    suiteTeardown(() => (0, extension_1.deactivate)());
    test('activation registers the command in the real extension host', () => __awaiter(void 0, void 0, void 0, function* () {
        const commands = yield vscode.commands.getCommands(true);
        assert.ok(commands.includes('extension.helloWorld123'));
    }));
    test('the host dispatches the registered command without an error', () => __awaiter(void 0, void 0, void 0, function* () {
        yield vscode.commands.executeCommand('extension.helloWorld123');
    }));
    test('the activated server accepts and closes a real loopback connection', () => {
        return new Promise((resolve, reject) => {
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
//# sourceMappingURL=extension.test.js.map