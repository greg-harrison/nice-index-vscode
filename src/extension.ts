'use strict';

import { ExtensionContext, window, workspace, commands } from 'vscode';

export function activate(context: ExtensionContext) {
    context.subscriptions.push(window.onDidChangeActiveTextEditor(e => updateFileName()));
    updateFileName()
}

function updateFileName() {
    const editor = window.activeTextEditor.document;
    const config = workspace.getConfiguration('workbench.editor');

    console.log('hasIndex()', hasIndex());

    if (hasIndex() && config.get('labelFormat') !== 'short') {
        config.update('labelFormat', 'short')
    } else {
        config.update('labelFormat', 'default')
    }
}

function hasIndex(): boolean {
    const editor = window.activeTextEditor.document;
    let currentFileName: string;
    let text: boolean;
    let path: Array<string>;

    if (editor) {
        if (editor.uri.path) {
            path = editor.uri.path.split('/');

            currentFileName = path[path.length - 1]

            console.log('currentFileName', currentFileName);

            text = (currentFileName === 'index.js')
        }
    }

    return text;
}