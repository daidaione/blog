(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("smalltalk",function(i){var r=/[+\-\/\\*~<>=@%|&?!.,:;^]/;var s=/true|false|nil|self|super|thisContext/;var o=function(e,t){this.next=e;this.parent=t};var l=function(e,t,n){this.name=e;this.context=t;this.eos=n};var e=function(){this.context=new o(a,null);this.expectVariable=true;this.indentation=0;this.userIndentationDelta=0};e.prototype.userIndent=function(e){this.userIndentationDelta=e>0?e/i.indentUnit-this.indentation:0};var a=function(e,t,n){var i=new l(null,t,false);var a=e.next();if(a==='"'){i=f(e,new o(f,t))}else if(a==="'"){i=u(e,new o(u,t))}else if(a==="#"){if(e.peek()==="'"){e.next();i=c(e,new o(c,t))}else{if(e.eatWhile(/[^\s.{}\[\]()]/))i.name="string-2";else i.name="meta"}}else if(a==="$"){if(e.next()==="<"){e.eatWhile(/[^\s>]/);e.next()}i.name="string-2"}else if(a==="|"&&n.expectVariable){i.context=new o(d,t)}else if(/[\[\]{}()]/.test(a)){i.name="bracket";i.eos=/[\[{(]/.test(a);if(a==="["){n.indentation++}else if(a==="]"){n.indentation=Math.max(0,n.indentation-1)}}else if(r.test(a)){e.eatWhile(r);i.name="operator";i.eos=a!==";"}else if(/\d/.test(a)){e.eatWhile(/[\w\d]/);i.name="number"}else if(/[\w_]/.test(a)){e.eatWhile(/[\w\d_]/);i.name=n.expectVariable?s.test(e.current())?"keyword":"variable":null}else{i.eos=n.expectVariable}return i};var f=function(e,t){e.eatWhile(/[^"]/);return new l("comment",e.eat('"')?t.parent:t,true)};var u=function(e,t){e.eatWhile(/[^']/);return new l("string",e.eat("'")?t.parent:t,false)};var c=function(e,t){e.eatWhile(/[^']/);return new l("string-2",e.eat("'")?t.parent:t,false)};var d=function(e,t){var n=new l(null,t,false);var i=e.next();if(i==="|"){n.context=t.parent;n.eos=true}else{e.eatWhile(/[^|]/);n.name="variable"}return n};return{startState:function(){return new e},token:function(e,t){t.userIndent(e.indentation());if(e.eatSpace()){return null}var n=t.context.next(e,t.context,t);t.context=n.context;t.expectVariable=n.eos;return n.name},blankLine:function(e){e.userIndent(0)},indent:function(e,t){var n=e.context.next===a&&t&&t.charAt(0)==="]"?-1:e.userIndentationDelta;return(e.indentation+n)*i.indentUnit},electricChars:"]"}});e.defineMIME("text/x-stsrc",{name:"smalltalk"})});