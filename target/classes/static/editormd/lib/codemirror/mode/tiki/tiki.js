(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("tiki",function(e){function o(n,r,i){return function(e,t){while(!e.eol()){if(e.match(r)){t.tokenize=c;break}e.next()}if(i)t.tokenize=i;return n}}function f(n){return function(e,t){while(!e.eol()){e.next()}t.tokenize=c;return n}}function c(t,n){function e(e){n.tokenize=e;return e(t,n)}var r=t.sol();var i=t.next();switch(i){case"{":t.eat("/");t.eatSpace();var u="";var a;while(a=t.eat(/[^\s\u00a0=\"\'\/?(}]/))u+=a;n.tokenize=s;return"tag";break;case"_":if(t.eat("_")){return e(o("strong","__",c))}break;case"'":if(t.eat("'")){return e(o("em","''",c))}break;case"(":if(t.eat("(")){return e(o("variable-2","))",c))}break;case"[":return e(o("variable-3","]",c));break;case"|":if(t.eat("|")){return e(o("comment","||"))}break;case"-":if(t.eat("=")){return e(o("header string","=-",c))}else if(t.eat("-")){return e(o("error tw-deleted","--",c))}break;case"=":if(t.match("==")){return e(o("tw-underline","===",c))}break;case":":if(t.eat(":")){return e(o("comment","::"))}break;case"^":return e(o("tw-box","^"));break;case"~":if(t.match("np~")){return e(o("meta","~/np~"))}break}if(r){switch(i){case"!":if(t.match("!!!!!")){return e(f("header string"))}else if(t.match("!!!!")){return e(f("header string"))}else if(t.match("!!!")){return e(f("header string"))}else if(t.match("!!")){return e(f("header string"))}else{return e(f("header string"))}break;case"*":case"#":case"+":return e(f("tw-listitem bracket"));break}}return null}var r=e.indentUnit;var i,u;function s(e,t){var n=e.next();var r=e.peek();if(n=="}"){t.tokenize=c;return"tag"}else if(n=="("||n==")"){return"bracket"}else if(n=="="){u="equals";if(r==">"){n=e.next();r=e.peek()}if(!/[\'\"]/.test(r)){t.tokenize=l()}return"operator"}else if(/[\'\"]/.test(n)){t.tokenize=a(n);return t.tokenize(e,t)}else{e.eatWhile(/[^\s\u00a0=\"\'\/?]/);return"keyword"}}function a(n){return function(e,t){while(!e.eol()){if(e.next()==n){t.tokenize=s;break}}return"string"}}function l(){return function(e,t){while(!e.eol()){var n=e.next();var r=e.peek();if(n==" "||n==","||/[ )}]/.test(r)){t.tokenize=s;break}}return"string"}}var k,d;function n(){for(var e=arguments.length-1;e>=0;e--)k.cc.push(arguments[e])}function b(){n.apply(null,arguments);return true}function g(e,t){var n=k.context&&k.context.noIndent;k.context={prev:k.context,pluginName:e,indent:k.indented,startOfLine:t,noIndent:n}}function p(){if(k.context)k.context=k.context.prev}function h(e){if(e=="openPlugin"){k.pluginName=i;return b(x,m(k.startOfLine))}else if(e=="closePlugin"){var t=false;if(k.context){t=k.context.pluginName!=i;p()}else{t=true}if(t)d="error";return b(v(t))}else if(e=="string"){if(!k.context||k.context.name!="!cdata")g("!cdata");if(k.tokenize==c)p();return b()}else return b()}function m(t){return function(e){if(e=="selfclosePlugin"||e=="endPlugin")return b();if(e=="endPlugin"){g(k.pluginName,t);return b()}return b()}}function v(t){return function(e){if(t)d="error";if(e=="endPlugin")return b();return n()}}function x(e){if(e=="keyword"){d="attribute";return b(x)}if(e=="equals")return b(t,x);return n()}function t(e){if(e=="keyword"){d="string";return b()}if(e=="string")return b(w);return n()}function w(e){if(e=="string")return b(w);else return n()}return{startState:function(){return{tokenize:c,cc:[],indented:0,startOfLine:true,pluginName:null,context:null}},token:function(e,t){if(e.sol()){t.startOfLine=true;t.indented=e.indentation()}if(e.eatSpace())return null;d=u=i=null;var n=t.tokenize(e,t);if((n||u)&&n!="comment"){k=t;while(true){var r=t.cc.pop()||h;if(r(u||n))break}}t.startOfLine=false;return d||n},indent:function(e,t){var n=e.context;if(n&&n.noIndent)return 0;if(n&&/^{\//.test(t))n=n.prev;while(n&&!n.startOfLine)n=n.prev;if(n)return n.indent+r;else return 0},electricChars:"/"}});e.defineMIME("text/tiki","tiki")});