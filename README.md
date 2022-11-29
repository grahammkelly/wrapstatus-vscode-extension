# wrapstatus-vscode-extension
Adds a status bar item in VS Code (and VSCodium) to show current wrap status and allow changing without affecting settings

When editing files, I tend to swap between the word wrapping as needed as I read a file. It's always bugged me that I need to open the settings editor and find the specific setting to change in this case instead of having some easy way to toggle the wrapping.

I've allowed the setting to be set through double clicks on the status bar item, but the column to wrap on, I'm assuming you'll change less often so leaving that to be changed through the settings editor should be OK.

This will display the current wrap setting on the status bar. For those wrap settings that are dependant on the setting defining the wrap column ('bounded', which is shortest of window boundary and the wrap column, or the 'wordWrapColumn').

Also allows you to double click the status bar item, which will cycle through the wrap settings (in the order of 'on', 'off', 'wordWrapColumn', and 'bounded'). I'd prefer this to be in-memory only, and not stored, but unfortunately that doesn't seem possible in VSCode, so the changed setting is in the Workspace context. It will be 'remembered' through restarts only within the current workspace.

## Supported versions
This extension was tested on 
* VSCodium 1.73.1
* VisualStudio Code 1.73.1

## Acknowledgements
This extension is based upon the sample statusbar from https://github.com/microsoft/vscode-extension-samples
The double click detection is basd on tips & code from `medo64` (from this repo - https://github.com/medo64/Code-Point)


