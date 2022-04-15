(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("eiffel",function(){function e(e){var t={};for(var r=0,n=e.length;r<n;++r)t[e[r]]=true;return t}var i=e(["note","across","when","variant","until","unique","undefine","then","strip","select","retry","rescue","require","rename","reference","redefine","prefix","once","old","obsolete","loop","local","like","is","inspect","infix","include","if","frozen","from","external","export","ensure","end","elseif","else","do","creation","create","check","alias","agent","separate","invariant","inherit","indexing","feature","expanded","deferred","class","Void","True","Result","Precursor","False","Current","create","attached","detachable","as","and","implies","not","or"]);var o=e([":=","and then","and","or","<<",">>"]);var n;function a(e,t,r){r.tokenize.push(e);return e(t,r)}function t(e,t){n=null;if(e.eatSpace())return null;var r=e.next();if(r=='"'||r=="'"){return a(u(r,"string"),e,t)}else if(r=="-"&&e.eat("-")){e.skipToEnd();return"comment"}else if(r==":"&&e.eat("=")){return"operator"}else if(/[0-9]/.test(r)){e.eatWhile(/[xXbBCc0-9\.]/);e.eat(/[\?\!]/);return"ident"}else if(/[a-zA-Z_0-9]/.test(r)){e.eatWhile(/[a-zA-Z_0-9]/);e.eat(/[\?\!]/);return"ident"}else if(/[=+\-\/*^%<>~]/.test(r)){e.eatWhile(/[=+\-\/*^%<>~]/);return"operator"}else{return null}}function u(i,o,a){return function(e,t){var r=false,n;while((n=e.next())!=null){if(n==i&&(a||!r)){t.tokenize.pop();break}r=!r&&n=="%"}return o}}return{startState:function(){return{tokenize:[t]}},token:function(e,t){var r=t.tokenize[t.tokenize.length-1](e,t);if(r=="ident"){var n=e.current();r=i.propertyIsEnumerable(e.current())?"keyword":o.propertyIsEnumerable(e.current())?"operator":/^[A-Z][A-Z_0-9]*$/g.test(n)?"tag":/^0[bB][0-1]+$/g.test(n)?"number":/^0[cC][0-7]+$/g.test(n)?"number":/^0[xX][a-fA-F0-9]+$/g.test(n)?"number":/^([0-9]+\.[0-9]*)|([0-9]*\.[0-9]+)$/g.test(n)?"number":/^[0-9]+$/g.test(n)?"number":"variable"}return r},lineComment:"--"}});e.defineMIME("text/x-eiffel","eiffel")});