//
// Based on the `statusbar-example` from https://github.com/microsoft/vscode-extension-samples
//

import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;
const extName = 'WordWrap status bar extension';
const cmdId = 'statusbar.wordwrap.status';

const wwSetting = "editor.wordWrap";
const wrapColSetting = 'editor.wordWrapColumn';

//
//This caused me a lot of trouble!
//  If you have trouble 'finding' any standard typescript/node functionality, make sure
//  you have run `npm install @types/node --save-dev` at the command line
//

export function activate({subscriptions}: vscode.ExtensionContext) {
    //Register the commands to be invoked when the status bar item is selected 
    //Create the status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 999);
    statusBarItem.command = cmdId;
    subscriptions.push(statusBarItem);

    //Register a listener to make sure the status bar status is always up to date when the user changes the settings
    subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => 
        doActionWhenSettingChangeDetected(event, [wwSetting, wrapColSetting], 
            updateWrapStatusBarItem)));

    console.log(`${extName}: Live status of the WordWrap setting will be shown in the status bar`)
    
    updateWrapStatusBarItem();
}

function doActionWhenSettingChangeDetected(event: vscode.ConfigurationChangeEvent, settingToListenFor: string[], action: () => any): void {
    const isSettingWeWant = settingToListenFor.some((setting:string) => event.affectsConfiguration(setting));
    
    if (isSettingWeWant) {
        console.debug(`${extName}: Setting change detected`)
        action();
    }
}

function updateWrapStatusBarItem(): void {
    const editorCfg = vscode.workspace.getConfiguration();
    const currentWrapStatus = editorCfg.get(wwSetting) as string;
    const wrapColumn = editorCfg.get(wrapColSetting);
    statusBarItem.text = `Wrap: ${statusBarText()}`;
   
    statusBarItem.tooltip = statusBarToolTip();

    statusBarItem.show();

    function statusBarToolTip(): string {
        switch(currentWrapStatus) {
            case "on":
                return 'Lines will wrap at window boundary';
            case "off":
                return 'Lines will not wrap';
            case 'wordWrapColumn':
                return `Lines will wrap at column ${wrapColumn}`;
            case 'bounded':
                return `Lines will wrap at lesser of window boundary or column ${wrapColumn}`;
        }
        return '';
    }

    function statusBarText(): string {
        switch (currentWrapStatus) {
            case 'wordWrapColumn':
                return `column(${wrapColumn})`;
            case 'bounded':
                return `bounded(${wrapColumn})`;
        }
        return currentWrapStatus;
    }
}

