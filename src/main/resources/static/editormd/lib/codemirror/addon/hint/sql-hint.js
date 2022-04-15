(function(r){if(typeof exports=="object"&&typeof module=="object")r(require("../../lib/codemirror"),require("../../mode/sql/sql"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror","../../mode/sql/sql"],r);else r(CodeMirror)})(function(e){"use strict";var d;var c;var u;var A={QUERY_DIV:";",ALIAS_KEYWORD:"AS"};var y=e.Pos;function l(r){var t=r.doc.modeOption;if(t==="sql")t="text/x-sql";return e.resolveMode(t).keywords}function i(r){return typeof r=="string"?r:r.text}function m(r,t){if(!r.slice)return r[t];for(var e=r.length-1;e>=0;e--)if(i(r[e])==t)return r[e]}function v(r){var t={};for(var e in r)if(r.hasOwnProperty(e))t[e]=r[e];return t}function a(r,t){var e=r.length;var n=i(t).substr(0,e);return r.toUpperCase()===n.toUpperCase()}function p(r,t,e,n){for(var i in e){if(!e.hasOwnProperty(i))continue;if(Array.isArray(e)){i=e[i]}if(a(t,i)){r.push(n(i))}}}function g(r){if(r.charAt(0)=="."){r=r.substr(1)}return r.replace(/`/g,"")}function h(r){var t=i(r).split(".");for(var e=0;e<t.length;e++)t[e]="`"+t[e]+"`";var n=t.join(".");if(typeof r=="string")return n;r=v(r);r.text=n;return r}function x(r,t,e,n){var i=false;var a=[];var o=t.start;var s=true;while(s){s=t.string.charAt(0)==".";i=i||t.string.charAt(0)=="`";o=t.start;a.unshift(g(t.string));t=n.getTokenAt(y(r.line,t.start));if(t.string=="."){s=true;t=n.getTokenAt(y(r.line,t.start))}}var f=a.join(".");p(e,f,d,function(r){return i?h(r):r});p(e,f,c,function(r){return i?h(r):r});f=a.pop();var u=a.join(".");if(!m(d,u))u=C(u,n);var l=m(d,u);if(l&&Array.isArray(d)&&l.columns)l=l.columns;if(l){p(e,f,l,function(r){if(typeof r=="string"){r=u+"."+r}else{r=v(r);r.text=u+"."+r.text}return i?h(r):r})}return o}function b(r,t){if(!r)return;var e=/[,;]/g;var n=r.split(" ");for(var i=0;i<n.length;i++){t(n[i]?n[i].replace(e,""):"")}}function q(r){return r.line+r.ch/Math.pow(10,6)}function w(r){return y(Math.floor(r),+r.toString().split(".").pop())}function C(r,t){var e=t.doc;var n=e.getValue();var i=r.toUpperCase();var a="";var o="";var s=[];var f={start:y(0,0),end:y(t.lastLine(),t.getLineHandle(t.lastLine()).length)};var u=n.indexOf(A.QUERY_DIV);while(u!=-1){s.push(e.posFromIndex(u));u=n.indexOf(A.QUERY_DIV,u+1)}s.unshift(y(0,0));s.push(y(t.lastLine(),t.getLineHandle(t.lastLine()).text.length));var l=0;var c=q(t.getCursor());for(var v=0;v<s.length;v++){var p=q(s[v]);if(c>l&&c<=p){f={start:w(l),end:w(p)};break}l=p}var g=e.getRange(f.start,f.end,false);for(var v=0;v<g.length;v++){var h=g[v];b(h,function(r){var t=r.toUpperCase();if(t===i&&m(d,a))o=a;if(t!==A.ALIAS_KEYWORD)a=r});if(o)break}return o}e.registerHelper("hint","sql",function(r,t){d=t&&t.tables||{};var e=t&&t.defaultTable;c=e&&m(d,e)||[];u=u||l(r);var n=r.getCursor();var i=[];var a=r.getTokenAt(n),o,s,f;if(a.end>n.ch){a.end=n.ch;a.string=a.string.slice(0,n.ch-a.start)}if(a.string.match(/^[.`\w@]\w*$/)){f=a.string;o=a.start;s=a.end}else{o=s=n.ch;f=""}if(f.charAt(0)=="."||f.charAt(0)=="`"){o=x(n,a,i,r)}else{p(i,f,d,function(r){return r});p(i,f,c,function(r){return r});p(i,f,u,function(r){return r.toUpperCase()})}return{list:i,from:y(n.line,o),to:y(n.line,s)}})});