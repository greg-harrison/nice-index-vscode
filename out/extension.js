'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var vscode_1 = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode_1.window.onDidChangeActiveTextEditor(function (e) { return updateFileName(); }));
    updateFileName();
}
exports.activate = activate;
function updateFileName() {
    var editor = vscode_1.window.activeTextEditor.document;
    var config = vscode_1.workspace.getConfiguration('workbench.editor');
    console.log('hasIndex()', hasIndex());
    if (hasIndex() && config.get('labelFormat') !== 'short') {
        config.update('labelFormat', 'short');
    }
    else {
        config.update('labelFormat', 'default');
    }
}
function hasIndex() {
    var editor = vscode_1.window.activeTextEditor.document;
    var currentFileName;
    var text;
    var path;
    if (editor) {
        if (editor.uri.path) {
            path = editor.uri.path.split('/');
            currentFileName = path[path.length - 1];
            console.log('currentFileName', currentFileName);
            text = (currentFileName === 'index.js');
        }
    }
    return text;
}
//# sourceMappingURL=extension.js.map