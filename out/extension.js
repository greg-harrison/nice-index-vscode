'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_1 = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode_1.workspace.onDidOpenTextDocument(function (e) { return updateFileName(); }));
    context.subscriptions.push(vscode_1.commands.registerCommand('extension.nice-index-vscode', function () {
        vscode_1.window.showInformationMessage(getFileName());
    }));
    updateFileName();
}
exports.activate = activate;
function updateFileName() {
    var editor = vscode_1.window.activeTextEditor.document;
    var text = getFileName();
    if (text) {
        console.log(text);
    }
}
function getFileName() {
    var editor = vscode_1.window.activeTextEditor.document;
    var currentFileName;
    var text;
    var path;
    if (editor) {
        if (editor.uri.path) {
            path = editor.uri.path.split('/');
            currentFileName = path[path.length - 1];
            if (currentFileName === 'index.js') {
                text = path[path.length - 2];
            }
        }
    }
    return text;
}
//# sourceMappingURL=extension.js.map