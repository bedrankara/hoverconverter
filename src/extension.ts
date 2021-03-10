'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	var regexHex = /^0x[0-9a-fA-F]+$/g;
	var regexHexc = /^[0-9a-fA-F]+[h]$/g;
	var regexDec = /^-?[0-9]+$/g;
	var regexBin = /^0b[01]+$/g;
	let hover = vscode.languages.registerHoverProvider({ scheme: '*', language: '*' }, {
		provideHover(document, position, token) {
			var hoveredWord = document.getText(document.getWordRangeAtPosition(position));
			var markdownString = new vscode.MarkdownString();
			if (regexBin.test(hoveredWord.toString())) {

				var input: Number = Number(parseInt(hoveredWord.substring(2), 2).toString());
				markdownString.appendCodeblock(`Dec:\n${input}\nHex:\n0x${input.toString(16).toUpperCase()} `, 'javascript');

				return {
					contents: [markdownString]
				};
			}
			else if (regexHex.test(hoveredWord.toString()) || regexHexc.test(hoveredWord.toString())) {

				markdownString.appendCodeblock(`Dec:\n${parseInt(hoveredWord, 16)}\nBinary:\n${parseInt(hoveredWord, 16).toString(2)}`, 'javascript');

				return {
					contents: [markdownString]
				};
			}
			else if (regexDec.test(hoveredWord.toString())) {

				var input: Number = Number(hoveredWord.toString());
				markdownString.appendCodeblock(`Hex:\n0x${input.toString(16).toUpperCase()}\nBinary:\n${input.toString(2).replace(/(^\s+|\s+$)/, '')} `, 'javascript');

				return {
					contents: [markdownString]
				};

			}
		}
	});

	context.subscriptions.push(hover);

}

export function deactivate() { }