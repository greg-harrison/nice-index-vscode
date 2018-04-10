'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_1 = require("vscode");
function activate(context) {
    var status = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, 100);
    status.command = 'extension.selectedLines';
    context.subscriptions.push(status);
    context.subscriptions.push(vscode_1.window.onDidChangeActiveTextEditor(function (e) { return updateStatus(status); }));
    context.subscriptions.push(vscode_1.window.onDidChangeTextEditorSelection(function (e) { return updateStatus(status); }));
    context.subscriptions.push(vscode_1.window.onDidChangeTextEditorViewColumn(function (e) { return updateStatus(status); }));
    context.subscriptions.push(vscode_1.workspace.onDidOpenTextDocument(function (e) { return updateStatus(status); }));
    context.subscriptions.push(vscode_1.workspace.onDidCloseTextDocument(function (e) { return updateStatus(status); }));
    context.subscriptions.push(vscode_1.commands.registerCommand('extension.selectedLines', function () {
        vscode_1.window.showInformationMessage(getSelectedLines());
    }));
    updateStatus(status);
}
exports.activate = activate;
function updateStatus(status) {
    var text = getSelectedLines();
    if (text) {
        status.text = '$(megaphone) ' + text;
    }
    if (text) {
        status.show();
    }
    else {
        status.hide();
    }
}
function getSelectedLines() {
    var editor = vscode_1.window.activeTextEditor;
    var text;
    if (editor) {
        var lines_1 = 0;
        editor.selections.forEach(function (selection) {
            lines_1 += (selection.end.line - selection.start.line + 1);
        });
        if (lines_1 > 0) {
            text = lines_1 + " line(s) selected";
        }
    }
    return text;
}
//# sourceMappingURL=extension.js.map