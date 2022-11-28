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
    subscriptions.forEach(element => {
        vscode.window.showInformationMessage(`${extName}: [1] element - ${element}`);
    });


    //Create the status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 999);
    statusBarItem.command = cmdId;
    subscriptions.push(statusBarItem);

    //Register a listener to make sure the status bar status is always up to date on the status bar
    subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => 
        doActionForSettingChange(event, wwSetting, updateWrapStatusBar)));

    subscriptions.forEach(element => {
        vscode.window.showInformationMessage(`${extName}: [2] element - ${element}`);
    });

    vscode.window.showInformationMessage(`${extName}: Extension starting now`);
    
    updateWrapStatusBar();
}

function doActionForSettingChange(event: vscode.ConfigurationChangeEvent, settingToListenFor: string, action: () => any): void {
    const isSettingWeWant = event.affectsConfiguration(settingToListenFor);
    vscode.window.showInformationMessage(`${extName}: Was '${settingToListenFor}' changed? ${isSettingWeWant ? 'Yes' : 'No'}`);
    if (isSettingWeWant) {
        action();
    }
}

function updateWrapStatusBar(): void {
    const currentWrapStatus = vscode.workspace.getConfiguration().get(wwSetting);
    statusBarItem.text = `$(megaphone) ${currentWrapStatus}`;
    vscode.window.showInformationMessage(`${extName}: wrap status - ${currentWrapStatus}`);

    statusBarItem.show();
}