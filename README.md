# cprev-vscode-extension README

This extension allows devs to get notified when other devs are making changes to
relevant files.

## Features

TBD: add a gif here

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**

## Development verification

Use Node 22.22.1 and `npm ci --ignore-scripts`, then `npm test`. The pretest
command compiles all TypeScript and requires zero ESLint warnings. The test
runner uses the maintained `@vscode/test-electron` package and a pinned VS Code
1.104.3 development host; Linux CI supplies Xvfb. It checks real extension
activation, command dispatch, and a bounded synthetic loopback connection.
The generated `out/` files must match a fresh compile. Tests use an isolated
editor profile and do not install or publish a Marketplace extension.

TypeScript 5.6.3 satisfies the existing lint-tool peer range while retaining the
Node 12 and VS Code 1.43 API declaration baseline. The host test above certifies
VS Code 1.104.3 only; it is not evidence for every version in the declared range.
