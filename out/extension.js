'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const net = require("net");
const json_stream_parser_1 = require("@oresoftware/json-stream-parser");
const connections = new Set();
const server = net.createServer(s => {
    connections.add(s);
    s.pipe(new json_stream_parser_1.JSONParser()).on('data', d => {
        console.log('server received data:', d);
        vscode.window.showInformationMessage('cprev server received data: ' + JSON.stringify(d));
    });
});
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    server.listen(3119, () => {
        vscode.window.showInformationMessage('cprev server is listening on port: ' + 3119);
    });
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "cprev-vscode-extension" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.helloWorld123', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('The CPREV extension has been invoked.');
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    if (!server.listening) {
        vscode.window.showInformationMessage('cprev extension deactivated, server was not listening.');
        return;
    }
    server.close(err => {
        if (err) {
            console.error(err);
            vscode.window.showErrorMessage('Upon cprev extension deactivation, ' +
                'we have an error closing cprev server: ' + err.message);
            return;
        }
        vscode.window.showInformationMessage('cprev extension deactivated.');
    });
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map