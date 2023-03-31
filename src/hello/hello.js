/*
 * @Author: xiaoHao
 */
const vscode = require('vscode');
module.exports=function(context){
    console.log(context);
    context.subscriptions.push(vscode.commands.registerCommand('code-auto-pull', () => {
        vscode.window.showInformationMessage('Hello World from code-auto-pull!');
    }));
}