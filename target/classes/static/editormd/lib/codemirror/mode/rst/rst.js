(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"),require("../python/python"),require("../stex/stex"),require("../../addon/mode/overlay"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror","../python/python","../stex/stex","../../addon/mode/overlay"],e);else e(CodeMirror)})(function(V){"use strict";V.defineMode("rst",function(e,t){var a=/^\*\*[^\*\s](?:[^\*]*[^\*\s])?\*\*/;var r=/^\*[^\*\s](?:[^\*]*[^\*\s])?\*/;var c=/^``[^`\s](?:[^`]*[^`\s])``/;var n=/^(?:[\d]+(?:[\.,]\d+)*)/;var s=/^(?:\s\+[\d]+(?:[\.,]\d+)*)/;var m=/^(?:\s\-[\d]+(?:[\.,]\d+)*)/;var o="[Hh][Tt][Tt][Pp][Ss]?://";var l="(?:[\\d\\w.-]+)\\.(?:\\w{2,6})";var i="(?:/[\\d\\w\\#\\%\\&\\-\\.\\,\\/\\:\\=\\?\\~]+)*";var f=new RegExp("^"+o+l+i);var h={token:function(e){if(e.match(a)&&e.match(/\W+|$/,false))return"strong";if(e.match(r)&&e.match(/\W+|$/,false))return"em";if(e.match(c)&&e.match(/\W+|$/,false))return"string-2";if(e.match(n))return"number";if(e.match(s))return"positive";if(e.match(m))return"negative";if(e.match(f))return"link";while(e.next()!=null){if(e.match(a,false))break;if(e.match(r,false))break;if(e.match(c,false))break;if(e.match(n,false))break;if(e.match(s,false))break;if(e.match(m,false))break;if(e.match(f,false))break}return null}};var u=V.getMode(e,t.backdrop||"rst-base");return V.overlayMode(u,h,true)},"python","stex");V.defineMode("rst-base",function(e){function t(e){var a=Array.prototype.slice.call(arguments,1);return e.replace(/{(\d+)}/g,function(e,t){return typeof a[t]!="undefined"?a[t]:e})}var r=V.getMode(e,"python");var c=V.getMode(e,"stex");var a="\\s+";var n="(?:\\s*|\\W|$)",s=new RegExp(t("^{0}",n));var m="(?:[^\\W\\d_](?:[\\w!\"#$%&'()\\*\\+,\\-\\./:;<=>\\?]*[^\\W_])?)",o=new RegExp(t("^{0}",m));var l="(?:[^\\W\\d_](?:[\\w\\s!\"#$%&'()\\*\\+,\\-\\./:;<=>\\?]*[^\\W_])?)";var i=t("(?:{0}|`{1}`)",m,l);var f="(?:[^\\s\\|](?:[^\\|]*[^\\s\\|])?)";var h="(?:[^\\`]+)",u=new RegExp(t("^{0}",h));var p=new RegExp("^([!'#$%&\"()*+,-./:;<=>?@\\[\\\\\\]^_`{|}~])\\1{3,}\\s*$");var d=new RegExp(t("^\\.\\.{0}",a));var k=new RegExp(t("^_{0}:{1}|^__:{1}",i,n));var x=new RegExp(t("^{0}::{1}",i,n));var v=new RegExp(t("^\\|{0}\\|{1}{2}::{3}",f,a,i,n));var b=new RegExp(t("^\\[(?:\\d+|#{0}?|\\*)]{1}",i,n));var w=new RegExp(t("^\\[{0}\\]{1}",i,n));var g=new RegExp(t("^\\|{0}\\|",f));var E=new RegExp(t("^\\[(?:\\d+|#{0}?|\\*)]_",i));var H=new RegExp(t("^\\[{0}\\]_",i));var P=new RegExp(t("^{0}__?",i));var R=new RegExp(t("^`{0}`_",h));var y=new RegExp(t("^:{0}:`{1}`{2}",m,h,n));var _=new RegExp(t("^`{1}`:{0}:{2}",m,h,n));var $=new RegExp(t("^:{0}:{1}",m,n));var z=new RegExp(t("^{0}",i));var B=new RegExp(t("^::{0}",n));var S=new RegExp(t("^\\|{0}\\|",f));var D=new RegExp(t("^{0}",a));var F=new RegExp(t("^{0}",i));var G=new RegExp(t("^::{0}",n));var J=new RegExp("^_");var K=new RegExp(t("^{0}|_",i));var L=new RegExp(t("^:{0}",n));var N=new RegExp("^::\\s*$");var O=new RegExp("^\\s+(?:>>>|In \\[\\d+\\]:)\\s");function M(e,t){var a=null;if(e.sol()&&e.match(O,false)){I(t,T,{mode:r,local:V.startState(r)})}else if(e.sol()&&e.match(d)){I(t,W);a="meta"}else if(e.sol()&&e.match(p)){I(t,M);a="header"}else if(C(t)==y||e.match(y,false)){switch(A(t)){case 0:I(t,M,j(y,1));e.match(/^:/);a="meta";break;case 1:I(t,M,j(y,2));e.match(o);a="keyword";if(e.current().match(/^(?:math|latex)/)){t.tmp_stex=true}break;case 2:I(t,M,j(y,3));e.match(/^:`/);a="meta";break;case 3:if(t.tmp_stex){t.tmp_stex=undefined;t.tmp={mode:c,local:V.startState(c)}}if(t.tmp){if(e.peek()=="`"){I(t,M,j(y,4));t.tmp=undefined;break}a=t.tmp.mode.token(e,t.tmp.local);break}I(t,M,j(y,4));e.match(u);a="string";break;case 4:I(t,M,j(y,5));e.match(/^`/);a="meta";break;case 5:I(t,M,j(y,6));e.match(s);break;default:I(t,M)}}else if(C(t)==_||e.match(_,false)){switch(A(t)){case 0:I(t,M,j(_,1));e.match(/^`/);a="meta";break;case 1:I(t,M,j(_,2));e.match(u);a="string";break;case 2:I(t,M,j(_,3));e.match(/^`:/);a="meta";break;case 3:I(t,M,j(_,4));e.match(o);a="keyword";break;case 4:I(t,M,j(_,5));e.match(/^:/);a="meta";break;case 5:I(t,M,j(_,6));e.match(s);break;default:I(t,M)}}else if(C(t)==$||e.match($,false)){switch(A(t)){case 0:I(t,M,j($,1));e.match(/^:/);a="meta";break;case 1:I(t,M,j($,2));e.match(o);a="keyword";break;case 2:I(t,M,j($,3));e.match(/^:/);a="meta";break;case 3:I(t,M,j($,4));e.match(s);break;default:I(t,M)}}else if(C(t)==g||e.match(g,false)){switch(A(t)){case 0:I(t,M,j(g,1));e.match(S);a="variable-2";break;case 1:I(t,M,j(g,2));if(e.match(/^_?_?/))a="link";break;default:I(t,M)}}else if(e.match(E)){I(t,M);a="quote"}else if(e.match(H)){I(t,M);a="quote"}else if(e.match(P)){I(t,M);if(!e.peek()||e.peek().match(/^\W$/)){a="link"}}else if(C(t)==R||e.match(R,false)){switch(A(t)){case 0:if(!e.peek()||e.peek().match(/^\W$/)){I(t,M,j(R,1))}else{e.match(R)}break;case 1:I(t,M,j(R,2));e.match(/^`/);a="link";break;case 2:I(t,M,j(R,3));e.match(u);break;case 3:I(t,M,j(R,4));e.match(/^`_/);a="link";break;default:I(t,M)}}else if(e.match(N)){I(t,U)}else{if(e.next())I(t,M)}return a}function W(e,t){var a=null;if(C(t)==v||e.match(v,false)){switch(A(t)){case 0:I(t,W,j(v,1));e.match(S);a="variable-2";break;case 1:I(t,W,j(v,2));e.match(D);break;case 2:I(t,W,j(v,3));e.match(F);a="keyword";break;case 3:I(t,W,j(v,4));e.match(G);a="meta";break;default:I(t,M)}}else if(C(t)==x||e.match(x,false)){switch(A(t)){case 0:I(t,W,j(x,1));e.match(z);a="keyword";if(e.current().match(/^(?:math|latex)/))t.tmp_stex=true;else if(e.current().match(/^python/))t.tmp_py=true;break;case 1:I(t,W,j(x,2));e.match(B);a="meta";if(e.match(/^latex\s*$/)||t.tmp_stex){t.tmp_stex=undefined;I(t,T,{mode:c,local:V.startState(c)})}break;case 2:I(t,W,j(x,3));if(e.match(/^python\s*$/)||t.tmp_py){t.tmp_py=undefined;I(t,T,{mode:r,local:V.startState(r)})}break;default:I(t,M)}}else if(C(t)==k||e.match(k,false)){switch(A(t)){case 0:I(t,W,j(k,1));e.match(J);e.match(K);a="link";break;case 1:I(t,W,j(k,2));e.match(L);a="meta";break;default:I(t,M)}}else if(e.match(b)){I(t,M);a="quote"}else if(e.match(w)){I(t,M);a="quote"}else{e.eatSpace();if(e.eol()){I(t,M)}else{e.skipToEnd();I(t,Q);a="comment"}}return a}function Q(e,t){return q(e,t,"comment")}function U(e,t){return q(e,t,"meta")}function q(e,t,a){if(e.eol()||e.eatSpace()){e.skipToEnd();return a}else{I(t,M);return null}}function T(e,t){if(t.ctx.mode&&t.ctx.local){if(e.sol()){if(!e.eatSpace())I(t,M);return null}return t.ctx.mode.token(e,t.ctx.local)}I(t,M);return null}function j(e,t,a,r){return{phase:e,stage:t,mode:a,local:r}}function I(e,t,a){e.tok=t;e.ctx=a||{}}function A(e){return e.ctx.stage||0}function C(e){return e.ctx.phase}return{startState:function(){return{tok:M,ctx:j(undefined,0)}},copyState:function(e){var t=e.ctx,a=e.tmp;if(t.local)t={mode:t.mode,local:V.copyState(t.mode,t.local)};if(a)a={mode:a.mode,local:V.copyState(a.mode,a.local)};return{tok:e.tok,ctx:t,tmp:a}},innerMode:function(e){return e.tmp?{state:e.tmp.local,mode:e.tmp.mode}:e.ctx.mode?{state:e.ctx.local,mode:e.ctx.mode}:null},token:function(e,t){return t.tok(e,t)}}},"python","stex");V.defineMIME("text/x-rst","rst")});