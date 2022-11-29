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

    //Register the action to do when the user clicks the status bar item
    vscode.commands.registerCommand(cmdId, handleClick);

    console.log(`${extName}: Live status of the WordWrap setting will be shown in the status bar`)
    
    updateWrapStatusBarItem();
}

//
// Thanks to medo64 for the double click detection (https://github.com/medo64/Code-Point/blob/main/out/extension.js)
//
// Just to point out though, even with the timeout, the 'double-click' seems to be handled twice (once for each click!)
//  Seems to set the setting correctly though. I think the config is 'read' simultaneously for both handlers
//
var dblClickTimerId: ReturnType<typeof setTimeout> | null = null;
const dblClickTimeMs = 250; //Anything over 250ms is NOT a double click

function handleClick(): void {
    if (dblClickTimerId == null) {  //If timer does not exist, it's the first click (we're only reponding to double clicks)
        dblClickTimerId = setTimeout(() => {
            //We won't do anything for a single click, so the clear timout and do nothing else once the timer expires
            clearDblClickTimeout();
        }, dblClickTimeMs);
    } else if (canChangeSettings()) {
        console.debug(`${extName}: Double-click detected`);
        clearDblClickTimeout();
        changeWrapSetting();
    } else {
        vscode.window.showInformationMessage(`${extName}: Editor does not have an open workspace or folder, unable to change wrap setting`);
    }

    function canChangeSettings(): boolean {
        const s = vscode.workspace.workspaceFolders
        return (s != undefined) && (s.length > 0); //Negative is simpler to code, just (!s), but harder to understand in calling code
    }

    function clearDblClickTimeout() {
        clearTimeout(dblClickTimerId as ReturnType<typeof setTimeout>);
        dblClickTimerId = null;
    }

    function changeWrapSetting(): void {
        const wrapSettingsOrder = ["on", "off", "wordWrapColumn", "bounded"];
        const cfg = vscode.workspace.getConfiguration()
        const origWrapSetting = cfg.get(wwSetting) as string
        const curSettingElem= wrapSettingsOrder.indexOf(origWrapSetting);
        const newSetting = wrapSettingsOrder[(curSettingElem+1) % wrapSettingsOrder.length];
    
        cfg.update(wwSetting, newSetting, vscode.ConfigurationTarget.Workspace);
        console.debug(`${extName}: Wrap was '${origWrapSetting}', updating to '${newSetting}'`);    
    }    
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

