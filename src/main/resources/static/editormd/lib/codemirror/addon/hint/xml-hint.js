(function(t){if(typeof exports=="object"&&typeof module=="object")t(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],t);else t(CodeMirror)})(function(C){"use strict";var j=C.Pos;function t(t,e){var r=e&&e.schemaInfo;var i=e&&e.quoteChar||'"';if(!r)return;var s=t.getCursor(),n=t.getTokenAt(s);if(n.end>s.ch){n.end=s.ch;n.string=n.string.slice(0,s.ch-n.start)}var a=C.innerMode(t.getMode(),n.state);if(a.mode.name!="xml")return;var f=[],o=false,l;var g=/\btag\b/.test(n.type)&&!/>$/.test(n.string);var c=g&&/^\w/.test(n.string),h;if(c){var u=t.getLine(s.line).slice(Math.max(0,n.start-2),n.start);var p=/<\/$/.test(u)?"close":/<$/.test(u)?"open":null;if(p)h=n.start-(p=="close"?2:1)}else if(g&&n.string=="<"){p="open"}else if(g&&n.string=="</"){p="close"}if(!g&&!a.state.tagName||p){if(c)l=n.string;o=p;var v=a.state.context,d=v&&r[v.tagName];var m=v?d&&d.children:r["!top"];if(m&&p!="close"){for(var y=0;y<m.length;++y)if(!l||m[y].lastIndexOf(l,0)==0)f.push("<"+m[y])}else if(p!="close"){for(var x in r)if(r.hasOwnProperty(x)&&x!="!top"&&x!="!attrs"&&(!l||x.lastIndexOf(l,0)==0))f.push("<"+x)}if(v&&(!l||p=="close"&&v.tagName.lastIndexOf(l,0)==0))f.push("</"+v.tagName+">")}else{var d=r[a.state.tagName],O=d&&d.attrs;var b=r["!attrs"];if(!O&&!b)return;if(!O){O=b}else if(b){var w={};for(var I in b)if(b.hasOwnProperty(I))w[I]=b[I];for(var I in O)if(O.hasOwnProperty(I))w[I]=O[I];O=w}if(n.type=="string"||n.string=="="){var u=t.getRange(j(s.line,Math.max(0,s.ch-60)),j(s.line,n.type=="string"?n.start:n.end));var P=u.match(/([^\s\u00a0=<>\"\']+)=$/),A;if(!P||!O.hasOwnProperty(P[1])||!(A=O[P[1]]))return;if(typeof A=="function")A=A.call(this,t);if(n.type=="string"){l=n.string;var M=0;if(/['"]/.test(n.string.charAt(0))){i=n.string.charAt(0);l=n.string.slice(1);M++}var N=n.string.length;if(/['"]/.test(n.string.charAt(N-1))){i=n.string.charAt(N-1);l=n.string.substr(M,N-2)}o=true}for(var y=0;y<A.length;++y)if(!l||A[y].lastIndexOf(l,0)==0)f.push(i+A[y]+i)}else{if(n.type=="attribute"){l=n.string;o=true}for(var $ in O)if(O.hasOwnProperty($)&&(!l||$.lastIndexOf(l,0)==0))f.push($)}}return{list:f,from:o?j(s.line,h==null?n.start:h):s,to:o?j(s.line,n.end):s}}C.registerHelper("hint","xml",t)});