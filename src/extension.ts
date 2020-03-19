'use strict';

import * as vscode from 'vscode';
import * as net from 'net';
import {JSONParser} from '@oresoftware/json-stream-parser';

const connections = new Set<net.Socket>()


const server  = net.createServer(s => {
   connections.add(s);

   s.pipe(new JSONParser()).on('data', d  => {
		console.log('server received data:', d);
		vscode.window.showInformationMessage('cprev server received data: ' + JSON.stringify(d));
   });

});



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


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
		vscode.window.showInformationMessage('Hello World xx!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {

	if(!server.listening){
		vscode.window.showInformationMessage('cprev extension deactivated, server was not listening.');
		return;
	}


  server.close(err => {

	if(err){
		console.error(err);
		vscode.window.showErrorMessage('Upon cprev extension deactivation, ' + 
		'we have an error closing cprev server: ' + err.message);
		return;
	}
	
	vscode.window.showInformationMessage('cprev extension deactivated.');

  });
}
