(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('draft-js'), require('react'), require('semantic-ui-react'), require('classnames')) :
    typeof define === 'function' && define.amd ? define(['exports', 'draft-js', 'react', 'semantic-ui-react', 'classnames'], factory) :
    (factory((global.ReactMde = global.ReactMde || {}),global.Draft,global.React,global.semanticUIReact,global.classNames));
}(this, function (exports,draftJs,React,semanticUiReact,classNames) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        }
        return __assign.apply(this, arguments);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function getSurroundingWord(text, position) {
        if (!text)
            throw Error("Argument 'text' should be truthy");
        var isWordDelimiter = function (c) { return c === " " || c.charCodeAt(0) === 10; };
        // leftIndex is initialized to 0 because if position is 0, it won't even enter the iteration
        var leftIndex = 0;
        // rightIndex is initialized to text.length because if position is equal to text.length it won't even enter the interation
        var rightIndex = text.length;
        // iterate to the left
        for (var i = position; i - 1 > -1; i--) {
            if (isWordDelimiter(text[i - 1])) {
                leftIndex = i;
                break;
            }
        }
        // iterate to the right
        for (var i = position; i < text.length; i++) {
            if (isWordDelimiter(text[i])) {
                rightIndex = i;
                break;
            }
        }
        return {
            word: text.slice(leftIndex, rightIndex),
            position: {
                start: leftIndex,
                end: rightIndex,
            },
        };
    }
    function insertBeforeAndAfter(markdownState, insertion) {
        var text = markdownState.text;
        var selection = markdownState.selection;
        selection = selectWordIfCaretIsInsideOne({ text: text, selection: selection });
        // the user is selecting a word section
        var _a = insertText(text, insertion, selection.start), newText = _a.newText, insertionLength = _a.insertionLength;
        var finalText = insertText(newText, insertion, selection.end + insertionLength).newText;
        return {
            text: finalText,
            selection: {
                start: selection.start + insertionLength,
                end: selection.end + insertionLength,
            },
        };
    }
    function selectWordIfCaretIsInsideOne(_a) {
        var text = _a.text, selection = _a.selection;
        if (text && text.length && selection.start === selection.end) {
            // the user is pointing to a word
            return getSurroundingWord(text, selection.start).position;
        }
        return selection;
    }
    /**
     * Inserts breaks before, only if needed. The returned selection will not include this breaks
     *
     * @export
     * @param {any} text
     * @param {any} selection
     * @returns
     */
    function insertBreaksBeforeSoThatThereIsAnEmptyLineBefore(_a) {
        var text = _a.text, selection = _a.selection;
        var breaksNeededBefore = getBreaksNeededForEmptyLineBefore(text, selection.start);
        var insertionBefore = Array(breaksNeededBefore + 1).join("\n");
        var newText = text;
        var newSelection = selection;
        var insertionLength = 0;
        // if line-breaks have to be added before
        if (insertionBefore) {
            var textInsertion = insertText(text, insertionBefore, selection.start);
            newText = textInsertion.newText;
            insertionLength = textInsertion.insertionLength;
            newSelection = {
                start: selection.start + textInsertion.insertionLength,
                end: selection.end + textInsertion.insertionLength,
            };
        }
        return {
            newText: newText,
            insertionLength: insertionLength,
            newSelection: newSelection,
        };
    }
    /**
     * Inserts the given text before. The selection is moved ahead so the
     *
     * @export
     * @param {any} originalText
     * @param {any} textToInsert
     * @param {any} selection
     * @param selectInsertion {boolean} Whether or not the inserted text should be selected
     * @returns
     */
    function insertBefore(originalText, textToInsert, selection, selectInsertion) {
        if (selectInsertion === void 0) { selectInsertion = true; }
        var textInsertion = insertText(originalText, textToInsert, selection.start);
        var newSelection = {
            start: selectInsertion ? selection.start : selection.start + textInsertion.insertionLength,
            end: selection.end + textInsertion.insertionLength,
        };
        return __assign({}, textInsertion, { newSelection: newSelection });
    }
    /**
     * Inserts the given text after. The selection will change to encompass the new text
     *
     * @export
     * @param {any} originalText
     * @param {any} textToInsert
     * @param {any} selection
     * @returns
     */
    function insertAfter(originalText, textToInsert, selection) {
        var textInsertion = insertText(originalText, textToInsert, selection.end);
        var newSelection = {
            start: selection.start,
            end: selection.end + textInsertion.insertionLength,
        };
        return __assign({}, textInsertion, { newSelection: newSelection });
    }
    /**
     * Inserts "textToBeInserted" in "text" at the "insertionPosition"
     *
     * @param {any} originalText
     * @param {any} textToInsert
     * @param {any} insertionPosition
     * @returns
     */
    function insertText(originalText, textToInsert, insertionPosition) {
        var newText = [originalText.slice(0, insertionPosition), textToInsert, originalText.slice(insertionPosition)].join("");
        return { newText: newText, insertionLength: textToInsert.length };
    }
    /**
     *  Gets the number of line-breaks that would have to be inserted before the given 'startPosition'
     *  to make sure there's an empty line between 'startPosition' and the previous text
     */
    function getBreaksNeededForEmptyLineBefore(text, startPosition) {
        if (text === void 0) { text = ""; }
        if (startPosition === 0)
            return 0;
        // rules:
        // - If we're in the first line, no breaks are needed
        // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
        //      may need to insert 0, 1 or 2 breaks
        var neededBreaks = 2;
        var isInFirstLine = true;
        for (var i = startPosition - 1; i >= 0 && (neededBreaks >= 0); i--) {
            switch (text.charCodeAt(i)) {
                case 32: // blank space
                    continue;
                case 10: // line break
                    neededBreaks--;
                    isInFirstLine = false;
                    break;
                default:
                    return neededBreaks;
            }
        }
        return isInFirstLine ? 0 : neededBreaks;
    }
    /**
     *  Gets the number of line-breaks that would have to be inserted after the given 'startPosition'
     *  to make sure there's an empty line between 'startPosition' and the next text
     */
    function getBreaksNeededForEmptyLineAfter(text, startPosition) {
        if (text === void 0) { text = ""; }
        if (startPosition === text.length - 1)
            return 0;
        // rules:
        // - If we're in the first line, no breaks are needed
        // - Otherwise there must be 2 breaks before the previous character. Depending on how many breaks exist already, we
        //      may need to insert 0, 1 or 2 breaks
        var neededBreaks = 2;
        var isInLastLine = true;
        for (var i = startPosition; i < text.length && (neededBreaks >= 0); i++) {
            switch (text.charCodeAt(i)) {
                case 32:
                    continue;
                case 10: {
                    neededBreaks--;
                    isInLastLine = false;
                    break;
                }
                default:
                    return neededBreaks;
            }
        }
        return isInLastLine ? 0 : neededBreaks;
    }
    /**
     * Inserts breaks after, only if needed. The returned selection will not include this breaks
     *
     * @export
     * @returns
     * @param markdownState
     */
    function insertBreaksAfterSoThatThereIsAnEmptyLineAfter(_a) {
        var text = _a.text, selection = _a.selection;
        var breaksNeededBefore = getBreaksNeededForEmptyLineAfter(text, selection.end);
        var insertionAfter = Array(breaksNeededBefore + 1).join("\n");
        var newText = text;
        var insertionLength = 0;
        // if line-breaks have to be added before
        if (insertionAfter) {
            var textInsertion = insertText(text, insertionAfter, selection.end);
            newText = textInsertion.newText;
            insertionLength = textInsertion.insertionLength;
        }
        return {
            newText: newText,
            insertionLength: insertionLength,
            newSelection: selection,
        };
    }
    /**
     * Inserts insertionString before each line
     */
    function insertBeforeEachLine(text, insertion, selection) {
        var substring = text.slice(selection.start, selection.end);
        var lines = substring.split(/\n/);
        var insertionLength = 0;
        var modifiedText = lines.map(function (item, index) {
            if (typeof insertion === "string") {
                insertionLength += insertion.length;
                return insertion + item;
            }
            else if (typeof insertion === "function") {
                var insertionResult = insertion(item, index);
                insertionLength += insertionResult.length;
                return insertion(item, index) + item;
            }
            throw Error("insertion is expected to be either a string or a function");
        }).join("\n");
        var newText = text.slice(0, selection.start) + modifiedText + text.slice(selection.end);
        return {
            newText: newText,
            insertionLength: insertionLength,
            newSelection: {
                start: lines.length > 1 ? selection.start : selection.start + insertionLength,
                end: selection.end + insertionLength,
            },
        };
    }
    /**
     * Helper for creating commands that make lists
     * @export
     * @param markdownState
     * @param {any} insertionBeforeEachLine
     * @returns
     */
    function makeList(_a, insertionBeforeEachLine) {
        var text = _a.text, selection = _a.selection;
        var textInsertion;
        selection = selectWordIfCaretIsInsideOne({ text: text, selection: selection });
        // insert breaks before, if needed
        textInsertion = insertBreaksBeforeSoThatThereIsAnEmptyLineBefore({ text: text, selection: selection });
        text = textInsertion.newText;
        selection = textInsertion.newSelection;
        // insert breaks after, if needed
        textInsertion = insertBreaksAfterSoThatThereIsAnEmptyLineAfter({ text: text, selection: selection });
        text = textInsertion.newText;
        selection = textInsertion.newSelection;
        // inserts 'insertionBeforeEachLine' before each line
        textInsertion = insertBeforeEachLine(text, insertionBeforeEachLine, selection);
        text = textInsertion.newText;
        selection = textInsertion.newSelection;
        return {
            text: text,
            selection: selection,
        };
    }
    function onTab(_a, reverse) {
        var text = _a.text, selection = _a.selection;
        var start = 0;
        for (var i = selection.start; i - 1 > -1; i--) {
            if (text[i - 1] === "\n") {
                start = i;
                break;
            }
        }
        var end = text.length;
        for (var i = selection.end; i < text.length; i++) {
            if (text[i + 1] === "\n") {
                end = i;
                break;
            }
        }
        var substring = text.slice(start, end);
        var strings = substring.split(/\n/);
        var addLength = 0;
        var spaces = 0;
        var newText = strings.map(function (line) {
            var str = line.match(/^ +/);
            spaces = str && str[0] ? str[0].length : 0;
            if (reverse) {
                var removeSpaces = 4;
                if (!spaces || spaces % 4 !== 0)
                    removeSpaces = spaces % 4;
                addLength -= removeSpaces;
                return line.slice(removeSpaces);
            }
            var addSpaces = "    ";
            if (spaces % 4 === 1)
                addSpaces = "   ";
            if (spaces % 4 === 2)
                addSpaces = "  ";
            if (spaces % 4 === 3)
                addSpaces = " ";
            addLength += addSpaces.length;
            return addSpaces + line;
        }).join("\n");
        text = text.slice(0, start) + newText + text.slice(end);
        if (strings.length <= 1)
            selection = {
                start: start + addLength + spaces,
                end: start + addLength + spaces,
            };
        else
            selection = {
                start: start,
                end: end + addLength,
            };
        return { text: text, selection: selection };
    }
    /**
     * Helper for creating a command that makes a header
     * @param {any} text
     * @param {any} selection
     * @param {any} insertionBefore
     * @returns
     */
    function makeHeader(_a, insertionBefore) {
        var text = _a.text, selection = _a.selection;
        selection = selectWordIfCaretIsInsideOne({ text: text, selection: selection });
        // the user is selecting a word section
        var insertionText = insertBefore(text, insertionBefore, selection, false);
        var newText = insertionText.newText;
        var newSelection = insertionText.newSelection;
        return {
            text: newText,
            selection: newSelection,
        };
    }


    var MarkdownUtil = Object.freeze({
        getSurroundingWord: getSurroundingWord,
        insertBeforeAndAfter: insertBeforeAndAfter,
        selectWordIfCaretIsInsideOne: selectWordIfCaretIsInsideOne,
        insertBreaksBeforeSoThatThereIsAnEmptyLineBefore: insertBreaksBeforeSoThatThereIsAnEmptyLineBefore,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        insertText: insertText,
        getBreaksNeededForEmptyLineBefore: getBreaksNeededForEmptyLineBefore,
        getBreaksNeededForEmptyLineAfter: getBreaksNeededForEmptyLineAfter,
        insertBreaksAfterSoThatThereIsAnEmptyLineAfter: insertBreaksAfterSoThatThereIsAnEmptyLineAfter,
        insertBeforeEachLine: insertBeforeEachLine,
        makeList: makeList,
        onTab: onTab,
        makeHeader: makeHeader
    });

    function getContentLengthOfAllBlocksBefore(editorState, key) {
        var count = 0;
        var blockBefore;
        var currentKey = key;
        while (true) {
            blockBefore = editorState.getCurrentContent().getBlockBefore(currentKey);
            if (!blockBefore) {
                break;
            }
            // we have to add 1 here to account for the \n character
            count += blockBefore.getText().length + 1;
            currentKey = blockBefore.getKey();
        }
        return count;
    }
    function getSelection(editorState) {
        var selection = editorState.getSelection();
        var startKey = selection.getStartKey();
        var startOffset = selection.getStartOffset();
        var endKey = selection.getEndKey();
        var endOffset = selection.getEndOffset();
        var editorWiseOffset = getContentLengthOfAllBlocksBefore(editorState, startKey);
        var offsetBetweenKeys = getContentLengthBetween(editorState, startKey, startOffset, endKey, endOffset);
        // start and end are on the same block
        return { start: startOffset + editorWiseOffset, end: startOffset + offsetBetweenKeys + editorWiseOffset };
    }
    function getContentLengthBetween(editorState, startKey, startOffset, endKey, endOffset) {
        if (startKey === endKey) {
            return endOffset - startOffset;
        }
        var count = editorState.getCurrentContent().getBlockForKey(startKey).getText().length - startOffset;
        var blockAfter;
        var currentKey = startKey;
        while (true) {
            blockAfter = editorState.getCurrentContent().getBlockAfter(currentKey);
            if (!blockAfter || blockAfter.getKey() === endKey) {
                break;
            }
            // we have to add 1 here to account for the \n character
            count += (blockAfter.getText().length + 1);
            currentKey = blockAfter.getKey();
        }
        // we have to add 1 here to account for the \n character
        count += endOffset + 1;
        return count;
    }
    function getPlainText(editorState) {
        return editorState.getCurrentContent().getPlainText("\n");
    }
    var findBlockKeyAndOffsetForPosition = function (position, block, globalOffset, blockOffset, contentState) {
        if (!block || position < globalOffset + blockOffset) {
            return null;
        }
        if (position > globalOffset + block.getText().length) {
            // the princess is in another castle
            return findBlockKeyAndOffsetForPosition(position, contentState.getBlockAfter(block.getKey()), globalOffset + block.getText().length + 1, 0, contentState);
        }
        else {
            // the princess is in this castle
            return {
                block: block,
                globalOffset: globalOffset,
                blockOffset: position - globalOffset,
            };
        }
    };
    function buildSelectionState(contentState, selection) {
        var firstBlock = contentState.getFirstBlock();
        if (firstBlock === null) {
            return null;
        }
        var startBlockData = findBlockKeyAndOffsetForPosition(selection.start, firstBlock, 0, 0, contentState);
        if (startBlockData === null) {
            return null;
        }
        var endBlockData = findBlockKeyAndOffsetForPosition(selection.end, startBlockData.block, startBlockData.globalOffset, startBlockData.blockOffset, contentState);
        if (endBlockData === null) {
            return null;
        }
        var selectionState = draftJs.SelectionState.createEmpty(startBlockData.block.getKey());
        return selectionState.merge({
            anchorKey: startBlockData.block.getKey(),
            anchorOffset: startBlockData.blockOffset,
            focusKey: endBlockData.block.getKey(),
            focusOffset: endBlockData.blockOffset,
        });
    }
    function getMarkdownStateFromDraftState(editorState) {
        return {
            text: getPlainText(editorState),
            selection: getSelection(editorState),
        };
    }
    function getMdeStateFromDraftState(editorState, generateMarkdownPreview) {
        return __awaiter(this, void 0, void 0, function () {
            var markdown, html, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        markdown = getPlainText(editorState);
                        if (!generateMarkdownPreview) return [3 /*break*/, 2];
                        return [4 /*yield*/, generateMarkdownPreview(markdown)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = "";
                        _b.label = 3;
                    case 3:
                        html = _a;
                        return [2 /*return*/, {
                                html: html,
                                markdown: markdown,
                                draftEditorState: editorState,
                            }];
                }
            });
        });
    }
    function buildNewDraftState(currentState, markdownState) {
        var text = markdownState.text, selection = markdownState.selection;
        // TODO: Fix the redo. It's no working properly but this is an implementation detail.
        // handling text change history push
        var contentState = draftJs.ContentState.createFromText(text);
        var state = draftJs.EditorState.forceSelection(currentState, currentState.getSelection());
        state = draftJs.EditorState.push(state, contentState, "insert-characters");
        // handling text selection history push
        var selectionState = selection
            ? buildSelectionState(state.getCurrentContent(), selection)
            : currentState.getSelection();
        return draftJs.EditorState.forceSelection(state, selectionState);
    }


    var DraftUtil = Object.freeze({
        getContentLengthOfAllBlocksBefore: getContentLengthOfAllBlocksBefore,
        getSelection: getSelection,
        getContentLengthBetween: getContentLengthBetween,
        getPlainText: getPlainText,
        buildSelectionState: buildSelectionState,
        getMarkdownStateFromDraftState: getMarkdownStateFromDraftState,
        getMdeStateFromDraftState: getMdeStateFromDraftState,
        buildNewDraftState: buildNewDraftState
    });

    var boldCommand = {
        buttonContentBuilder: function (_a) {
            var iconProvider = _a.iconProvider;
            return iconProvider("bold");
        },
        buttonProps: { "aria-label": "Add bold text", "className": "mde-toolbar-button" },
        execute: function (state) {
            var mdState = getMarkdownStateFromDraftState(state);
            mdState = insertBeforeAndAfter(mdState, "**");
            return buildNewDraftState(state, mdState);
        },
    };

    var codeCommand = {
        buttonContentBuilder: function (_a) {
            var iconProvider = _a.iconProvider;
            return iconProvider("code");
        },
        buttonProps: { "aria-label": "Insert code", "className": "mde-toolbar-button" },
        execute: function (state) {
            var _a = getMarkdownStateFromDraftState(state), text = _a.text, selection = _a.selection;
            selection = selectWordIfCaretIsInsideOne({ text: text, selection: selection });
            // when there's no breaking line
            if (text.slice(selection.start, selection.end).indexOf("\n") === -1) {
                var mdState = insertBeforeAndAfter({ text: text, selection: selection }, "`");
                return buildNewDraftState(state, mdState);
            }
            var textInsertion;
            // insert breaks before, if needed
            textInsertion = insertBreaksBeforeSoThatThereIsAnEmptyLineBefore({ text: text, selection: selection });
            text = textInsertion.newText;
            selection = textInsertion.newSelection;
            // inserts ```\n before
            textInsertion = insertBefore(text, "```\n", selection, false);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;
            // inserts ```\n after
            textInsertion = insertAfter(text, "\n```", selection);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;
            // insert breaks after, if needed
            textInsertion = insertBreaksAfterSoThatThereIsAnEmptyLineAfter({ text: text, selection: selection });
            text = textInsertion.newText;
            selection = textInsertion.newSelection;
            return buildNewDraftState(state, { text: text, selection: selection });
        },
    };

    function setHeader(state, str) {
        var mdState = getMarkdownStateFromDraftState(state);
        mdState = makeHeader(mdState, str);
        return buildNewDraftState(state, mdState);
    }
    var headerCommand = {
        buttonContentBuilder: function (_a) {
            var iconProvider = _a.iconProvider;
            return iconProvider("heading");
        },
        buttonProps: { "aria-label": "Add header", "className": "mde-toolbar-button" },
        children: [
            {
                buttonContentBuilder: function () { return React.createElement("p", { className: "header-1" }, "Header 1"); },
                execute: function (state) { return setHeader(state, "# "); },
            },
            {
                buttonContentBuilder: function () { return React.createElement("p", { className: "header-2" }, "Header 2"); },
                execute: function (state) { return setHeader(state, "## "); },
            },
            {
                buttonContentBuilder: function () { return React.createElement("p", { className: "header-3" }, "Header 3"); },
                execute: function (state) { return setHeader(state, "### "); },
            },
            {
                buttonContentBuilder: function () { return React.createElement("p", { className: "header-4" }, "Header 4"); },
                execute: function (state) { return setHeader(state, "#### "); },
            },
        ],
    };

    var imageCommand = {
        buttonContentBuilder: function (_a) {
            var iconProvider = _a.iconProvider;
            return iconProvider("image");
        },
        buttonProps: { "aria-label": "Insert a picture", "className": "mde-toolbar-button" },
        execute: function (state) {
            var _a = getMarkdownStateFromDraftState(state), text = _a.text, selection = _a.selection;
            var _b = insertText(text, "![", selection.start), newText = _b.newText, insertionLength = _b.insertionLength;
            var finalText = insertText(newText, "](image-url)", selection.end + insertionLength).newText;
            return buildNewDraftState(state, {
                text: finalText,
                selection: {
                    start: selection.start + insertionLength,
                    end: selection.end + insertionLength,
                },
            });
        },
    };

    var italicCommand = {
        buttonContentBuilder: function (_a) {
            var iconProvider = _a.iconProvider;
            return iconProvider("italic");
        },
        buttonProps: { "aria-label": "Add italic text", "className": "mde-toolbar-button" },
        execute: function (state) {
            var mdState = getMarkdownStateFromDraftState(state);
            mdState = insertBeforeAndAfter(mdState, "_");
            return buildNewDraftState(state, mdState);
        },
    };

    var strikethroughCommand = {
        buttonContentBuilder: function (_a) {
            var iconProvider = _a.iconProvider;
            return iconProvider("strikethrough");
        },
        buttonProps: { "aria-label": "Add strikethrough text", "className": "mde-toolbar-button" },
        execute: function (state) {
            var mdState = getMarkdownStateFromDraftState(state);
            mdState = insertBeforeAndAfter(mdState, "~~");
            return buildNewDraftState(state, mdState);
        },
    };

    var linkCommand = {
        buttonContentBuilder: function (_a) {
            var iconProvider = _a.iconProvider;
            return iconProvider("link");
        },
        buttonProps: { "aria-label": "Insert a link", "className": "mde-toolbar-button" },
        execute: function (state) {
            var _a = getMarkdownStateFromDraftState(state), text = _a.text, selection = _a.selection;
            var newSelection = selectWordIfCaretIsInsideOne({ text: text, selection: selection });
            var _b = insertText(text, "[", newSelection.start), newText = _b.newText, insertionLength = _b.insertionLength;
            var finalText = insertText(newText, "](url)", newSelection.end + insertionLength).newText;
            return buildNewDraftState(state, {
                text: finalText,
                selection: {
                    start: newSelection.start + insertionLength,
                    end: newSelection.end + insertionLength,
                },
            });
        },
    };

    var orderedListCommand = {
        buttonContentBuilder: function (_a) {
            var iconProvider = _a.iconProvider;
            return iconProvider("list-ol");
        },
        buttonProps: { "aria-label": "Insert numbered list", "className": "mde-toolbar-button" },
        execute: function (state) {
            var mdState = getMarkdownStateFromDraftState(state);
            mdState = makeList(mdState, function (item, index) { return index + 1 + ". "; });
            return buildNewDraftState(state, mdState);
        },
    };

    var quoteCommand = {
        buttonContentBuilder: function (_a) {
            var iconProvider = _a.iconProvider;
            return iconProvider("quote-right");
        },
        buttonProps: { "aria-label": "Insert a quote", "className": "mde-toolbar-button" },
        execute: function (state) {
            var _a = getMarkdownStateFromDraftState(state), text = _a.text, selection = _a.selection;
            selection = selectWordIfCaretIsInsideOne({ text: text, selection: selection });
            var textInsertion;
            textInsertion = insertBreaksBeforeSoThatThereIsAnEmptyLineBefore({ text: text, selection: selection });
            text = textInsertion.newText;
            selection = textInsertion.newSelection;
            textInsertion = insertBefore(text, "> ", selection, false);
            text = textInsertion.newText;
            selection = textInsertion.newSelection;
            textInsertion = insertBreaksAfterSoThatThereIsAnEmptyLineAfter({ text: text, selection: selection });
            text = textInsertion.newText;
            selection = textInsertion.newSelection;
            return buildNewDraftState(state, { text: text, selection: selection });
        },
    };

    var unorderedListCommand = {
        buttonContentBuilder: function (_a) {
            var iconProvider = _a.iconProvider;
            return iconProvider("list-ul");
        },
        buttonProps: { "aria-label": "Insert a bulleted list", "className": "mde-toolbar-button" },
        execute: function (state) {
            var mdState = getMarkdownStateFromDraftState(state);
            mdState = makeList(mdState, "- ");
            return buildNewDraftState(state, mdState);
        },
    };

    var checkListCommand = {
        buttonContentBuilder: function (_a) {
            var iconProvider = _a.iconProvider;
            return iconProvider("tasks");
        },
        buttonProps: { "aria-label": "Insert checklist", "className": "mde-toolbar-button" },
        execute: function (state) {
            var mdState = getMarkdownStateFromDraftState(state);
            mdState = makeList(mdState, "- [ ] ");
            return buildNewDraftState(state, mdState);
        },
    };

    var tabCommand = {
        buttonContentBuilder: function () { return null; },
        buttonProps: null,
        execute: function (state, reverse) {
            var mdState = getMarkdownStateFromDraftState(state);
            mdState = onTab(mdState, reverse);
            return buildNewDraftState(state, mdState);
        },
    };

    var getDefaultCommands = function () { return [
        [headerCommand, boldCommand, italicCommand, strikethroughCommand],
        [linkCommand, quoteCommand, codeCommand, imageCommand],
        [unorderedListCommand, orderedListCommand, checkListCommand],
    ]; };


    var ReactMdeCommands = Object.freeze({
        boldCommand: boldCommand,
        codeCommand: codeCommand,
        headerCommand: headerCommand,
        imageCommand: imageCommand,
        italicCommand: italicCommand,
        strikethroughCommand: strikethroughCommand,
        linkCommand: linkCommand,
        orderedListCommand: orderedListCommand,
        quoteCommand: quoteCommand,
        unorderedListCommand: unorderedListCommand,
        checkListCommand: checkListCommand,
        tabCommand: tabCommand,
        getDefaultCommands: getDefaultCommands
    });



    var ReactMdeTypes = Object.freeze({

    });

    var MdeToolbarButtonGroup = function (props) {
        return (React.createElement("ul", { className: "mde-header-group" }, props.children));
    };

    var MdeToolbarButton = function (props) {
        var buttonComponentClass = props.buttonComponentClass, buttonContent = props.buttonContent, buttonProps = props.buttonProps, onClick = props.onClick, readOnly = props.readOnly;
        var finalButtonComponent = buttonComponentClass || "a";
        return (React.createElement("li", { className: "mde-header-item" }, React.createElement(finalButtonComponent, __assign({}, buttonProps, {
            onClick: onClick,
            disabled: readOnly,
        }), buttonContent)));
    };

    var MdeToolbarDropdown = /** @class */ (function (_super) {
        __extends(MdeToolbarDropdown, _super);
        function MdeToolbarDropdown(props) {
            var _this = _super.call(this, props) || this;
            _this.handleGlobalClick = function (e) {
                if (_this.clickedOutside(e)) {
                    _this.closeDropdown();
                }
            };
            _this.openDropdown = function () {
                _this.setState({
                    open: true,
                });
            };
            _this.clickedOutside = function (e) {
                var target = e.target;
                return _this.state.open
                    && _this.dropdown
                    && _this.dropdownOpener
                    && !_this.dropdown.contains(target)
                    && !_this.dropdownOpener.contains(target);
            };
            _this.handleOnClickCommand = function (e, command) {
                var onCommand = _this.props.onCommand;
                onCommand(command);
                _this.closeDropdown();
            };
            _this.handleClick = function (e) {
                e.preventDefault();
                if (!_this.state.open)
                    _this.openDropdown();
                else
                    _this.closeDropdown();
            };
            _this.state = {
                open: false,
            };
            return _this;
        }
        MdeToolbarDropdown.prototype.componentDidMount = function () {
            document.addEventListener("click", this.handleGlobalClick, false);
        };
        MdeToolbarDropdown.prototype.componentWillUnmount = function () {
            document.removeEventListener("click", this.handleGlobalClick, false);
        };
        MdeToolbarDropdown.prototype.closeDropdown = function () {
            this.setState({
                open: false,
            });
        };
        MdeToolbarDropdown.prototype.render = function () {
            var _this = this;
            var _a = this.props, buttonContentOptions = _a.buttonContentOptions, commands = _a.commands, readOnly = _a.readOnly;
            var open = this.state.open;
            var items = commands.map(function (command, index) { return (React.createElement(MdeToolbarButton, { key: "header-item" + index, buttonProps: command.buttonProps, buttonContent: command.buttonContentBuilder(buttonContentOptions), onClick: function (e) { return _this.handleOnClickCommand(e, command); }, readOnly: readOnly })); });
            var dropdown = open
                ? (React.createElement("ul", { className: "react-mde-dropdown", ref: function (ref) {
                        _this.dropdown = ref;
                    } }, items))
                : null;
            var _b = this.props, buttonContent = _b.buttonContent, buttonProps = _b.buttonProps;
            return (React.createElement("li", { className: "mde-header-item" },
                React.createElement("a", __assign({}, buttonProps, { ref: function (ref) {
                        _this.dropdownOpener = ref;
                    }, onClick: this.handleClick, disabled: readOnly }), buttonContent),
                dropdown));
        };
        return MdeToolbarDropdown;
    }(React.Component));

    var iconmap = {
        'heading': 'heading',
        'bold': 'bold',
        'italic': 'italic',
        'strikethrough': 'strikethrough',
        'link': 'linkify',
        'quote-right': 'quote right',
        'code': 'code',
        'image': 'image',
        'list-ul': 'list ul',
        'list-ol': 'list ol',
        'tasks': 'tasks',
    };
    var MdeToolbarIcon = (function (_a) {
        var icon = _a.icon;
        return React.createElement(semanticUiReact.Icon, { name: "" + iconmap[icon] });
    });

    var MdePreview = /** @class */ (function (_super) {
        __extends(MdePreview, _super);
        function MdePreview() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MdePreview.prototype.render = function () {
            var _this = this;
            var _a = this.props, html = _a.html, className = _a.className;
            return (React.createElement("div", { className: "mde-preview " + (className || "") },
                React.createElement("div", { className: "mde-preview-content", dangerouslySetInnerHTML: { __html: html || "<p>&nbsp;</p>" }, ref: function (p) { return _this.previewRef = p; } })));
        };
        return MdePreview;
    }(React.Component));

    var MdeEditor = /** @class */ (function (_super) {
        __extends(MdeEditor, _super);
        function MdeEditor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.handleOnChange = function (editorState) {
                var onChange = _this.props.onChange;
                onChange(editorState);
            };
            _this.executeCastAsEditorState = function (commandToExecute, editorState, data) {
                var newEditorState = commandToExecute.execute(editorState, data);
                return newEditorState;
            };
            _this.handleKeyCommand = function (command, editorState) {
                var onChange = _this.props.onChange;
                switch (command) {
                    case "bold":
                        onChange(_this.executeCastAsEditorState(boldCommand, editorState));
                        return "handled";
                    case "italic":
                        onChange(_this.executeCastAsEditorState(italicCommand, editorState));
                        return "handled";
                    case "code":
                        onChange(_this.executeCastAsEditorState(codeCommand, editorState));
                        return "handled";
                    default:
                        return "not-handled";
                }
            };
            _this.handleTab = function (event) {
                event.preventDefault();
                var _a = _this.props, draftEditorState = _a.editorState.draftEditorState, onChange = _a.onChange;
                onChange(_this.executeCastAsEditorState(tabCommand, draftEditorState, event.shiftKey));
            };
            return _this;
        }
        MdeEditor.prototype.render = function () {
            var _this = this;
            var _a = this.props, draftEditorState = _a.editorState.draftEditorState, className = _a.className, readOnly = _a.readOnly;
            return (React.createElement("div", { className: "mde-text " + (className || "") },
                React.createElement(draftJs.Editor, { ref: function (editor) { return (_this.editorRef = editor); }, stripPastedStyles: true, editorState: draftEditorState, onChange: this.handleOnChange, onTab: this.handleTab, handleKeyCommand: this.handleKeyCommand, readOnly: readOnly })));
        };
        return MdeEditor;
    }(React.Component));

    var MdeToolbar = function (props) {
        var buttonContentOptions = props.buttonContentOptions, children = props.children, commands = props.commands, onCommand = props.onCommand, readOnly = props.readOnly;
        if ((!commands || commands.length === 0) && !children) {
            return null;
        }
        return (React.createElement("div", { className: "mde-header" },
            commands.map(function (cg, i) { return (React.createElement(MdeToolbarButtonGroup, { key: i }, cg.map(function (c, j) {
                if (c.children) {
                    return (React.createElement(MdeToolbarDropdown, { key: j, buttonProps: c.buttonProps, buttonContentOptions: buttonContentOptions, buttonContent: c.buttonContentBuilder(buttonContentOptions), commands: c.children, onCommand: function (cmd) { return onCommand(cmd); }, readOnly: readOnly }));
                }
                return React.createElement(MdeToolbarButton, { key: j, buttonContent: c.buttonContentBuilder(buttonContentOptions), buttonProps: c.buttonProps, onClick: function () { return onCommand(c); }, readOnly: readOnly, buttonComponentClass: c.buttonComponentClass });
            }))); }),
            React.createElement("div", { className: "mde-toolbar-children" }, children)));
    };



    var ReactMdeComponents = Object.freeze({
    	MdeToolbarButtonGroup: MdeToolbarButtonGroup,
    	MdeToolbarButton: MdeToolbarButton,
    	MdeToolbarDropdown: MdeToolbarDropdown,
    	MdeToolbarIcon: MdeToolbarIcon,
    	MdePreview: MdePreview,
    	MdeEditor: MdeEditor,
    	MdeToolbar: MdeToolbar
    });

    var VerticalLayout = /** @class */ (function (_super) {
        __extends(VerticalLayout, _super);
        function VerticalLayout() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Handler for the textArea value change
             * @memberOf ReactMde
             */
            _this.handleMdeStateChange = function (value) {
                var onChange = _this.props.onChange;
                onChange(value);
            };
            _this.handleCommand = function (command) {
                var onCommand = _this.props.onCommand;
                onCommand(command);
            };
            return _this;
        }
        /**
         * Renders react-mde
         * @returns
         * @memberOf ReactMde
         */
        VerticalLayout.prototype.render = function () {
            var _this = this;
            var _a = this.props, buttonContentOptions = _a.buttonContentOptions, commands = _a.commands, mdeEditorState = _a.mdeEditorState, layoutOptions = _a.layoutOptions, emptyPreviewHtml = _a.emptyPreviewHtml, readOnly = _a.readOnly;
            var finalLayoutOptions = layoutOptions ? __assign({}, layoutOptions) : {};
            return (React.createElement("div", { className: "react-mde-vertical-layout" },
                React.createElement(MdeToolbar, { buttonContentOptions: buttonContentOptions, commands: commands, onCommand: this.handleCommand, readOnly: readOnly }),
                React.createElement("div", { className: "react-mde-content" },
                    React.createElement(MdeEditor, { className: classNames(finalLayoutOptions.editorClassName), editorRef: function (c) { return _this.editorRef = c; }, onChange: this.handleMdeStateChange, editorState: mdeEditorState, readOnly: readOnly }),
                    React.createElement(MdePreview, { className: classNames(finalLayoutOptions.previewClassName), previewRef: function (c) { return _this.previewRef = c; }, html: mdeEditorState ? mdeEditorState.html : "", emptyPreviewHtml: emptyPreviewHtml }))));
        };
        return VerticalLayout;
    }(React.Component));

    var NoPreviewLayout = /** @class */ (function (_super) {
        __extends(NoPreviewLayout, _super);
        function NoPreviewLayout() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Handler for the textArea value change
             * @memberOf ReactMde
             */
            _this.handleMdeStateChange = function (value) {
                var onChange = _this.props.onChange;
                onChange(value);
            };
            _this.handleCommand = function (command) {
                var onCommand = _this.props.onCommand;
                onCommand(command);
            };
            return _this;
        }
        /**
         * Renders react-mde
         * @returns
         * @memberOf ReactMde
         */
        NoPreviewLayout.prototype.render = function () {
            var _this = this;
            var _a = this.props, buttonContentOptions = _a.buttonContentOptions, commands = _a.commands, mdeEditorState = _a.mdeEditorState, readOnly = _a.readOnly;
            return (React.createElement("div", { className: "react-mde-no-preview-layout" },
                React.createElement(MdeToolbar, { buttonContentOptions: buttonContentOptions, commands: commands, onCommand: this.handleCommand, readOnly: readOnly }),
                React.createElement(MdeEditor, { editorRef: function (c) { return _this.editorRef = c; }, onChange: this.handleMdeStateChange, editorState: mdeEditorState, readOnly: readOnly })));
        };
        return NoPreviewLayout;
    }(React.Component));

    var HorizontalLayout = /** @class */ (function (_super) {
        __extends(HorizontalLayout, _super);
        function HorizontalLayout() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Handler for the textArea value change
             * @memberOf ReactMde
             */
            _this.handleMdeStateChange = function (value) {
                var onChange = _this.props.onChange;
                onChange(value);
            };
            _this.handleCommand = function (command) {
                var onCommand = _this.props.onCommand;
                onCommand(command);
            };
            return _this;
        }
        /**
         * Renders react-mde
         * @returns
         * @memberOf ReactMde
         */
        HorizontalLayout.prototype.render = function () {
            var _this = this;
            var _a = this.props, buttonContentOptions = _a.buttonContentOptions, commands = _a.commands, mdeEditorState = _a.mdeEditorState, layoutOptions = _a.layoutOptions, emptyPreviewHtml = _a.emptyPreviewHtml, readOnly = _a.readOnly;
            var finalLayoutOptions = layoutOptions ? __assign({}, layoutOptions) : {};
            return (React.createElement("div", { className: "react-mde-horizontal-layout" },
                React.createElement(MdeToolbar, { buttonContentOptions: buttonContentOptions, commands: commands, onCommand: this.handleCommand, readOnly: readOnly }),
                React.createElement("div", { className: "mde-content" },
                    React.createElement(MdeEditor, { className: classNames(finalLayoutOptions.editorClassName), editorRef: function (c) { return _this.editorRef = c; }, onChange: this.handleMdeStateChange, editorState: mdeEditorState, readOnly: readOnly }),
                    React.createElement(MdePreview, { className: classNames(finalLayoutOptions.editorClassName), previewRef: function (c) { return _this.previewRef = c; }, html: mdeEditorState ? mdeEditorState.html : "", emptyPreviewHtml: emptyPreviewHtml }))));
        };
        return HorizontalLayout;
    }(React.Component));

    var TAB_CODE = "TAB_CODE";
    var TAB_PREVIEW = "TAB_PREVIEW";
    var TabbedLayout = /** @class */ (function (_super) {
        __extends(TabbedLayout, _super);
        function TabbedLayout() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                tab: TAB_CODE,
            };
            /**
             * Handler for the textArea value change
             * @memberOf ReactMde
             */
            _this.handleMdeStateChange = function (value) {
                var onChange = _this.props.onChange;
                onChange(value);
            };
            _this.handleCommand = function (command) {
                var onCommand = _this.props.onCommand;
                onCommand(command);
            };
            return _this;
        }
        /**
         * Renders react-mde
         * @returns
         * @memberOf ReactMde
         */
        TabbedLayout.prototype.render = function () {
            var _this = this;
            var _a = this.props, buttonContentOptions = _a.buttonContentOptions, commands = _a.commands, mdeEditorState = _a.mdeEditorState, emptyPreviewHtml = _a.emptyPreviewHtml, readOnly = _a.readOnly;
            var styleTabCode = "mde-tab";
            var styleTabPreview = "mde-tab";
            switch (this.state.tab) {
                case TAB_CODE:
                    styleTabCode += " mde-tab-activated";
                    break;
                case TAB_PREVIEW:
                    styleTabPreview += " mde-tab-activated";
                    break;
            }
            return (React.createElement("div", { className: "react-mde-tabbed-layout" },
                React.createElement(MdeToolbar, { buttonContentOptions: buttonContentOptions, commands: commands, onCommand: this.handleCommand, readOnly: readOnly },
                    React.createElement("div", { className: "mde-tabs" },
                        React.createElement("button", { type: "button", className: styleTabCode, onClick: function () { return _this.setState({ tab: TAB_CODE }); } }, "Code"),
                        React.createElement("button", { type: "button", className: styleTabPreview, onClick: function () { return _this.setState({ tab: TAB_PREVIEW }); } }, "Preview"))),
                this.state.tab === TAB_CODE ?
                    React.createElement(MdeEditor, { editorRef: function (c) { return _this.editorRef = c; }, onChange: this.handleMdeStateChange, editorState: mdeEditorState, readOnly: readOnly })
                    :
                        React.createElement(MdePreview, { previewRef: function (c) { return _this.previewRef = c; }, html: mdeEditorState ? mdeEditorState.html : "", emptyPreviewHtml: emptyPreviewHtml })));
        };
        return TabbedLayout;
    }(React.Component));



    var ReactMdeLayoutComponents = Object.freeze({
    	VerticalLayout: VerticalLayout,
    	NoPreviewLayout: NoPreviewLayout,
    	HorizontalLayout: HorizontalLayout,
    	TAB_CODE: TAB_CODE,
    	TAB_PREVIEW: TAB_PREVIEW,
    	TabbedLayout: TabbedLayout
    });

    var LayoutMap = /** @class */ (function () {
        function LayoutMap() {
            this.vertical = VerticalLayout;
            this.noPreview = NoPreviewLayout;
            this.horizontal = HorizontalLayout;
            this.tabbed = TabbedLayout;
        }
        return LayoutMap;
    }());
    var layoutMap = new LayoutMap();

    var ReactMde = /** @class */ (function (_super) {
        __extends(ReactMde, _super);
        function ReactMde() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.handleOnChange = function (_a) {
                var markdown = _a.markdown, html = _a.html, draftEditorState = _a.draftEditorState;
                var onChange = _this.props.onChange;
                onChange({ markdown: markdown, html: html, draftEditorState: draftEditorState });
            };
            _this.handleDraftStateChange = function (draftEditorState) {
                var generateMarkdownPreview = _this.props.generateMarkdownPreview;
                getMdeStateFromDraftState(draftEditorState, generateMarkdownPreview).then(function (mdeState) {
                    _this.handleOnChange({
                        html: mdeState.html,
                        markdown: mdeState.markdown,
                        draftEditorState: draftEditorState,
                    });
                });
            };
            _this.onCommand = function (command) {
                if (!command.execute)
                    return;
                var draftEditorState = _this.props.editorState.draftEditorState;
                var executedCommand = command.execute(draftEditorState);
                return Promise.resolve(executedCommand).then(function (result) { return _this.handleDraftStateChange(result); });
            };
            return _this;
        }
        // The user is **only** supposed to pass the 'markdown' prop of the editorState. Both 'html' and 'draftEditorState'
        // are supposed to be populated by React-Mde. If 'draftEditorState' has value here, this means that the whole 'editorState'
        // has been generated by React-Mde. Otherwise, we will generate an 'initializedMdeState' and call 'handleOnChange'
        // so the user has it
        ReactMde.prototype.ensureMdeStateIsInSync = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, editorState, generateMarkdownPreview, initializedMdeState, html, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = this.props, editorState = _a.editorState, generateMarkdownPreview = _a.generateMarkdownPreview;
                            if (!editorState) return [3 /*break*/, 5];
                            if (editorState.draftEditorState) {
                                // editor states with a draftEditorState are considered to be in sync already
                                return [2 /*return*/];
                            }
                            _b = editorState.html;
                            if (_b) return [3 /*break*/, 4];
                            if (!(editorState.markdown && generateMarkdownPreview)) return [3 /*break*/, 2];
                            return [4 /*yield*/, generateMarkdownPreview(editorState.markdown)];
                        case 1:
                            _c = _d.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _c = "";
                            _d.label = 3;
                        case 3:
                            _b = (_c);
                            _d.label = 4;
                        case 4:
                            html = _b;
                            initializedMdeState = {
                                markdown: editorState.markdown,
                                html: html,
                                draftEditorState: editorState.draftEditorState || draftJs.EditorState.createWithContent(draftJs.ContentState.createFromText(editorState.markdown)),
                            };
                            return [3 /*break*/, 6];
                        case 5:
                            initializedMdeState = {
                                html: "",
                                markdown: "",
                                draftEditorState: draftJs.EditorState.createEmpty(),
                            };
                            _d.label = 6;
                        case 6:
                            this.handleOnChange(initializedMdeState);
                            return [2 /*return*/];
                    }
                });
            });
        };
        ReactMde.prototype.componentDidMount = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureMdeStateIsInSync()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ReactMde.prototype.componentDidUpdate = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureMdeStateIsInSync()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ReactMde.prototype.render = function () {
            var Layout = layoutMap[this.props.layout];
            var _a = this.props, buttonContentOptions = _a.buttonContentOptions, commands = _a.commands, layoutOptions = _a.layoutOptions, className = _a.className, emptyPreviewHtml = _a.emptyPreviewHtml, readOnly = _a.readOnly;
            var editorState = this.props.editorState;
            var finalEditorState = editorState;
            if (!finalEditorState || !finalEditorState.draftEditorState) {
                // This is only supposed to prevent React-Mde from receiving an empty draftEditorState. In this case,
                // componentDidMount or componentDidUpdate will call handleOnChange to pass a valid MdeState to the user
                finalEditorState = {
                    html: "",
                    markdown: "",
                    draftEditorState: draftJs.EditorState.createEmpty(),
                };
            }
            return (React.createElement("div", { className: "react-mde " + (className || "") },
                React.createElement(Layout, { buttonContentOptions: buttonContentOptions, onChange: this.handleDraftStateChange, onCommand: this.onCommand, commands: commands, layoutOptions: layoutOptions, mdeEditorState: finalEditorState, emptyPreviewHtml: emptyPreviewHtml, readOnly: readOnly })));
        };
        ReactMde.defaultProps = {
            commands: getDefaultCommands(),
            buttonContentOptions: {
                iconProvider: function (name) { return React.createElement(MdeToolbarIcon, { icon: name }); },
            },
            layout: "vertical",
            emptyPreviewHtml: "<p>&nbsp;</p>",
            readOnly: false,
        };
        return ReactMde;
    }(React.Component));

    exports.ReactMdeTypes = ReactMdeTypes;
    exports.ReactMdeCommands = ReactMdeCommands;
    exports.ReactMdeComponents = ReactMdeComponents;
    exports.ReactMdeLayoutComponents = ReactMdeLayoutComponents;
    exports.DraftUtil = DraftUtil;
    exports.MarkdownUtil = MarkdownUtil;
    exports['default'] = ReactMde;

    Object.defineProperty(exports, '__esModule', { value: true });

}));