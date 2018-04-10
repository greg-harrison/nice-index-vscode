'use strict';

import { ExtensionContext, window, workspace, commands } from 'vscode';

export function activate(context: ExtensionContext) {

    context.subscriptions.push(workspace.onDidOpenTextDocument(e => updateFileName()));

    context.subscriptions.push(commands.registerCommand('extension.nice-index-vscode', () => {
        window.showInformationMessage(getFileName());
    }));

    updateFileName()
}

function updateFileName(): void {
    const editor = window.activeTextEditor.document;
    let text = getFileName();
    if (text) {
        console.log(text)
    }
}

function getFileName(): string {
    const editor = window.activeTextEditor.document;
    let currentFileName: string;
    let text: string;
    let path: Array<string>;

    if (editor) {
        if (editor.uri.path) {
            path = editor.uri.path.split('/');
            currentFileName = path[path.length - 1]
            if (currentFileName === 'index.js') {
                text = path[path.length - 2]
            }
        }
    }

    return text;
}