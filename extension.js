const vscode = require('vscode');

function activate(context) {
  let disposable = vscode.commands.registerCommand('songcode.write', async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      if (document.isUntitled || document.isDirty) {
        try {
          await vscode.workspace.saveTextDocument(document);
          vscode.window.showInformationMessage('Document saved successfully!');
        } catch (error) {
          vscode.window.showErrorMessage('Error saving the document.');
        }
      } else {
        vscode.window.showInformationMessage('Document is already saved.');
      }
    } else {
      vscode.window.showErrorMessage('No active text editor found.');
    }
  });

  let disposable2 = vscode.commands.registerCommand('songcode.quit', function () {
    vscode.commands.executeCommand('workbench.action.closeActiveEditor');
  });

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable2);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};