//
// Based on the `statusbar-example` from https://github.com/microsoft/vscode-extension-samples
//

import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;
const extName = 'WordWrap status bar extension';
const cmdId = 'statusbar.wordwrap.status';
const wwSetting = "editor.wordWrap";

export function activate({subscriptions}: vscode.ExtensionContext) {
    //Register the commands to be invoked when the status bar item is selected 
    //Create the status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 999);
    statusBarItem.command = cmdId;
    subscriptions.push(statusBarItem);

    //Register a listener to make sure the status bar status is always up to date on the status bar
    subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => 
        doActionForSettingChange(event, wwSetting, updateWrapStatusBar)));

    vscode.window.showInformationMessage(`${extName}: Live status of the WordWrap setting will be shown in the status bar`);
    
    updateWrapStatusBar();
}

function doActionForSettingChange(event: vscode.ConfigurationChangeEvent, settingToListenFor: string, action: () => any): void {
    const isSettingWeWant = event.affectsConfiguration(settingToListenFor);
    
    if (isSettingWeWant) {
        action();
    }
}

function updateWrapStatusBar(): void {
    const currentWrapStatus = vscode.workspace.getConfiguration().get(wwSetting);
    statusBarItem.text = `$(megaphone) ${currentWrapStatus}`;

    statusBarItem.show();
}