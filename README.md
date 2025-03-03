# wrapstatus-vscode-extension
Adds a status bar item in VS Code (and VSCodium) to show current wrap status and allow changing without affecting settings

When editing files, I tend to swap between the word wrapping as needed as I read a file. It's always bugged me that I need to open the settings editor and find the specific setting to change in this case instead of having some easy way to toggle the wrapping, so I've added a status bar item to show and allow changing the word-wrap.

I've allowed the setting to be set through double clicks on the status bar item, but the column to wrap on, I'm assuming you'll change less often so leaving that to be changed through the settings editor should be OK.

This will display the current wrap setting on the status bar. For those wrap settings that are dependant on the setting defining the wrap column (i.e. 'bounded', which is shortest of window boundary and the wrap column, or the 'wordWrapColumn'), the wrap setting on the status bar will also show the current wrap column.

As the wrap setting itself, or the wrap column is changed in the settings, this will be automatically reflected to show the explicitly set value in your status bar.

Also allows you to double click the status bar item, which will cycle through the wrap settings (in the order of 'on', 'off', 'wordWrapColumn', and 'bounded'). I'd prefer this to be in-memory only, and not stored, but unfortunately that doesn't seem possible in VSCode, so the changed setting is in the Workspace context. It will be 'remembered' through restarts only within the current workspace.

## Notices
This extension applies wrap settings for code files only. It will not affect the wrap settings for other file types (e.g. markdown, json, settings files, etc.). These seem to be managed elsewhere within Visual Studio Code. 

As the extension scratches _my_ itch, I'm not currently planning to add support for other file types, but if you'd like to see this, please raise an issue and I'll consider it.

## Supported versions
This extension was tested on 
* VSCodium 1.73.1+
* VisualStudio Code 1.73.1+

## Package and Release
1. **Important** Make sure the `package.json` file is updated with the correct version number
2. Ensure the `vsce` NPM package is installed
   If not, run `npm install -g @vscode/vsce`
3. Run `vsce package` to create the `.vsix` file
   To test the extension in _your_ copy of Visual Studio Code, open the Extensions view, click on the '...' and select 'Install from VSIX...'. Select and install the VSIX package created in step 1
4. To publish the extension, either
   - Run `vsce publish` (you'll need to be logged in to the marketplace)

   OR

   - Log into the [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage) and upload the `.vsix` file

## Acknowledgements
- This extension is based upon the sample statusbar from https://github.com/microsoft/vscode-extension-samples
- The double click detection is based on tips & code from `medo64` (from this repo - https://github.com/medo64/Code-Point)


# Change Log
[0.0.0](https://github.com/grahammkelly/wrapstatus-vscode-extension/tree/0.0.0) 

Initial code - no functionality

[0.1.0](https://github.com/grahammkelly/wrapstatus-vscode-extension/tree/0.1.0) 

Initially working status bar extension

[0.1.1](https://github.com/grahammkelly/wrapstatus-vscode-extension/tree/0.1.1) 

Same as 0.1.0, however removed the browser extension files (not working and I don't use `vscode.dev` enough to be bothered investigating)

[v0.1.2](https://github.com/grahammkelly/wrapstatus-vscode-extension/tree/v0.1.2) 

Added eslint action to the repository, updated README. No functional changes

[v0.1.3](https://github.com/grahammkelly/wrapstatus-vscode-extension/tree/v0.1.3) 

Updated URL for release 0.1.2 in README, no other changes

[0.1.4](https://github.com/grahammkelly/wrapstatus-vscode-extension/tree/0.1.4) 

- Fixed security issue (shown in Github) on 'module' var in `.eslintrc.js`
- Fixed typos in README
- dependabot updates

> **Note** - Changed Git tag format from `v1.2.3` to `1.2.3`

[0.1.5](https://github.com/grahammkelly/wrapstatus-vscode-extension/tree/0.1.5)

Updated README - I didnt' realise the README goes _INTO_ the VSIX. No functional changes from 0.1.4, only README

[0.1.6](https://github.com/grahammkelly/wrapstatus-vscode-extension/tree/0.1.6)

Updated `vsce` package to 1.108.0, and updated README to reflect this. This _should_ not affect funcitonality, only packaging.

[0.1.7](https://github.com/grahammkelly/wrapstatus-vscode-extension/tree/0.1.7)

Updated dependnecies based upon dependabot recommendations. No functional changes
Some typos fixed, and GH Actions changes (dependencies based upon the dependabot updates, and added new trigger)


---

[HEAD](https://github.com/grahammkelly/wrapstatus-vscode-extension) 

- _Nothing yet!_

