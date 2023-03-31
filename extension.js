/*
 * @Author: xiaoHao
 */


const vscode = require('vscode');


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "code-auto-pull" is now active!');

	
	require('./src/main/main')(context)
	// require('./src/hello/hello')(context)

}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
