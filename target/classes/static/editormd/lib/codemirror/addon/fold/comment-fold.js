(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(C){"use strict";C.registerGlobalHelper("fold","comment",function(e){return e.blockCommentStart&&e.blockCommentEnd},function(e,t){var r=e.getModeAt(t),n=r.blockCommentStart,o=r.blockCommentEnd;if(!n||!o)return;var i=t.line,f=e.getLine(i);var l;for(var a=t.ch,c=0;;){var m=a<=0?-1:f.lastIndexOf(n,a-1);if(m==-1){if(c==1)return;c=1;a=f.length;continue}if(c==1&&m<t.ch)return;if(/comment/.test(e.getTokenTypeAt(C.Pos(i,m+1)))){l=m+n.length;break}a=m-1}var u=1,d=e.lastLine(),s,b;e:for(var g=i;g<=d;++g){var v=e.getLine(g),h=g==i?l:0;for(;;){var k=v.indexOf(n,h),p=v.indexOf(o,h);if(k<0)k=v.length;if(p<0)p=v.length;h=Math.min(k,p);if(h==v.length)break;if(h==k)++u;else if(!--u){s=g;b=h;break e}++h}}if(s==null||i==s&&b==l)return;return{from:C.Pos(i,l),to:C.Pos(s,b)}})});