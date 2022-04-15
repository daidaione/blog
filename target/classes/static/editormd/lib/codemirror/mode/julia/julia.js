(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("julia",function(e,a){var f="error";function r(e){return new RegExp("^(("+e.join(")|(")+"))\\b")}var c=a.operators||/^\.?[|&^\\%*+\-<>!=\/]=?|\?|~|:|\$|\.[<>]|<<=?|>>>?=?|\.[<>=]=|->?|\/\/|\bin\b/;var s=a.delimiters||/^[;,()[\]{}]/;var m=a.identifiers||/^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*!*/;var t=["begin","function","type","immutable","let","macro","for","while","quote","if","else","elseif","try","finally","catch","do"];var n=["end","else","elseif","catch","finally"];var i=["if","else","elseif","while","for","begin","let","end","do","try","catch","finally","return","break","continue","global","local","const","export","import","importall","using","function","macro","module","baremodule","type","immutable","quote","typealias","abstract","bitstype","ccall"];var l=["true","false","enumerate","open","close","nothing","NaN","Inf","print","println","Int","Int8","Uint8","Int16","Uint16","Int32","Uint32","Int64","Uint64","Int128","Uint128","Bool","Char","Float16","Float32","Float64","Array","Vector","Matrix","String","UTF8String","ASCIIString","error","warn","info","@printf"];var p=/^(`|'|"{3}|([br]?"))/;var h=r(i);var v=r(l);var d=r(t);var g=r(n);var b=/^@[_A-Za-z][_A-Za-z0-9]*/;var x=/^:[_A-Za-z][_A-Za-z0-9]*/;var o=null;function y(e){var r=_(e);if(r=="["||r=="{"){return true}else{return false}}function _(e){if(e.scopes.length==0){return null}return e.scopes[e.scopes.length-1]}function u(e,r){var t=r.leaving_expr;if(e.sol()){t=false}r.leaving_expr=false;if(t){if(e.match(/^'+/)){return"operator"}}if(e.match(/^\.{2,3}/)){return"operator"}if(e.eatSpace()){return null}var n=e.peek();if(n==="#"){e.skipToEnd();return"comment"}if(n==="["){r.scopes.push("[")}if(n==="{"){r.scopes.push("{")}var i=_(r);if(i==="["&&n==="]"){r.scopes.pop();r.leaving_expr=true}if(i==="{"&&n==="}"){r.scopes.pop();r.leaving_expr=true}if(n===")"){r.leaving_expr=true}var a;if(!y(r)&&(a=e.match(d,false))){r.scopes.push(a)}if(!y(r)&&e.match(g,false)){r.scopes.pop()}if(y(r)){if(e.match(/^end/)){return"number"}}if(e.match(/^=>/)){return"operator"}if(e.match(/^[0-9\.]/,false)){var l=RegExp(/^im\b/);var o=false;if(e.match(/^\d*\.(?!\.)\d+([ef][\+\-]?\d+)?/i)){o=true}if(e.match(/^\d+\.(?!\.)\d*/)){o=true}if(e.match(/^\.\d+/)){o=true}if(o){e.match(l);r.leaving_expr=true;return"number"}var u=false;if(e.match(/^0x[0-9a-f]+/i)){u=true}if(e.match(/^0b[01]+/i)){u=true}if(e.match(/^0o[0-7]+/i)){u=true}if(e.match(/^[1-9]\d*(e[\+\-]?\d+)?/)){u=true}if(e.match(/^0(?![\dx])/i)){u=true}if(u){e.match(l);r.leaving_expr=true;return"number"}}if(e.match(/^(::)|(<:)/)){return"operator"}if(!t&&e.match(x)){return"string"}if(e.match(c)){return"operator"}if(e.match(p)){r.tokenize=z(e.current());return r.tokenize(e,r)}if(e.match(b)){return"meta"}if(e.match(s)){return null}if(e.match(h)){return"keyword"}if(e.match(v)){return"builtin"}if(e.match(m)){r.leaving_expr=true;return"variable"}e.next();return f}function z(t){while("rub".indexOf(t.charAt(0).toLowerCase())>=0){t=t.substr(1)}var n=t.length==1;var i="string";function e(e,r){while(!e.eol()){e.eatWhile(/[^'"\\]/);if(e.eat("\\")){e.next();if(n&&e.eol()){return i}}else if(e.match(t)){r.tokenize=u;return i}else{e.eat(/['"]/)}}if(n){if(a.singleLineStringErrors){return f}else{r.tokenize=u}}return i}e.isString=true;return e}function F(e,r){o=null;var t=r.tokenize(e,r);var n=e.current();if(n==="."){t=e.match(m,false)?null:f;if(t===null&&r.lastStyle==="meta"){t="meta"}return t}return t}var k={startState:function(){return{tokenize:u,scopes:[],leaving_expr:false}},token:function(e,r){var t=F(e,r);r.lastStyle=t;return t},indent:function(e,r){var t=0;if(r=="end"||r=="]"||r=="}"||r=="else"||r=="elseif"||r=="catch"||r=="finally"){t=-1}return(e.scopes.length+t)*4},lineComment:"#",fold:"indent",electricChars:"edlsifyh]}"};return k});e.defineMIME("text/x-julia","julia")});