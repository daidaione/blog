(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(c){"use strict";c.registerHelper("fold","indent",function(e,t){var i=e.getOption("tabSize"),n=e.getLine(t.line);if(!/\S/.test(n))return;var r=function(e){return c.countColumn(e,null,i)};var o=r(n);var f=null;for(var l=t.line+1,u=e.lastLine();l<=u;++l){var s=e.getLine(l);var a=r(s);if(a>o){f=l}else if(!/\S/.test(s)){}else{break}}if(f)return{from:c.Pos(t.line,n.length),to:c.Pos(f,e.getLine(f).length)}})});