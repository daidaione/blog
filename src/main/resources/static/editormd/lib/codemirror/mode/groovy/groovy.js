(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("groovy",function(o){function e(e){var t={},n=e.split(" ");for(var r=0;r<n.length;++r)t[n[r]]=true;return t}var i=e("abstract as assert boolean break byte case catch char class const continue def default "+"do double else enum extends final finally float for goto if implements import in "+"instanceof int interface long native new package private protected public return "+"short static strictfp super switch synchronized threadsafe throw throws transient "+"try void volatile while");var a=e("catch class do else finally for if switch try while enum interface def");var l=e("null true false this");var f;function r(e,t){var n=e.next();if(n=='"'||n=="'"){return s(n,e,t)}if(/[\[\]{}\(\),;\:\.]/.test(n)){f=n;return null}if(/\d/.test(n)){e.eatWhile(/[\w\.]/);if(e.eat(/eE/)){e.eat(/\+\-/);e.eatWhile(/\d/)}return"number"}if(n=="/"){if(e.eat("*")){t.tokenize.push(c);return c(e,t)}if(e.eat("/")){e.skipToEnd();return"comment"}if(p(t.lastToken)){return s(n,e,t)}}if(n=="-"&&e.eat(">")){f="->";return null}if(/[+\-*&%=<>!?|\/~]/.test(n)){e.eatWhile(/[+\-*&%=<>|~]/);return"operator"}e.eatWhile(/[\w\$_]/);if(n=="@"){e.eatWhile(/[\w\$_\.]/);return"meta"}if(t.lastToken==".")return"property";if(e.eat(":")){f="proplabel";return"property"}var r=e.current();if(l.propertyIsEnumerable(r)){return"atom"}if(i.propertyIsEnumerable(r)){if(a.propertyIsEnumerable(r))f="newstatement";return"keyword"}return"variable"}r.isBase=true;function s(o,e,t){var a=false;if(o!="/"&&e.eat(o)){if(e.eat(o))a=true;else return"string"}function n(e,t){var n=false,r,i=!a;while((r=e.next())!=null){if(r==o&&!n){if(!a){break}if(e.match(o+o)){i=true;break}}if(o=='"'&&r=="$"&&!n&&e.eat("{")){t.tokenize.push(u());return"string"}n=!n&&r=="\\"}if(i)t.tokenize.pop();return"string"}t.tokenize.push(n);return n(e,t)}function u(){var n=1;function e(e,t){if(e.peek()=="}"){n--;if(n==0){t.tokenize.pop();return t.tokenize[t.tokenize.length-1](e,t)}}else if(e.peek()=="{"){n++}return r(e,t)}e.isBase=true;return e}function c(e,t){var n=false,r;while(r=e.next()){if(r=="/"&&n){t.tokenize.pop();break}n=r=="*"}return"comment"}function p(e){return!e||e=="operator"||e=="->"||/[\.\[\{\(,;:]/.test(e)||e=="newstatement"||e=="keyword"||e=="proplabel"}function d(e,t,n,r,i){this.indented=e;this.column=t;this.type=n;this.align=r;this.prev=i}function m(e,t,n){return e.context=new d(e.indented,t,n,null,e.context)}function h(e){var t=e.context.type;if(t==")"||t=="]"||t=="}")e.indented=e.context.indented;return e.context=e.context.prev}return{startState:function(e){return{tokenize:[r],context:new d((e||0)-o.indentUnit,0,"top",false),indented:0,startOfLine:true,lastToken:null}},token:function(e,t){var n=t.context;if(e.sol()){if(n.align==null)n.align=false;t.indented=e.indentation();t.startOfLine=true;if(n.type=="statement"&&!p(t.lastToken)){h(t);n=t.context}}if(e.eatSpace())return null;f=null;var r=t.tokenize[t.tokenize.length-1](e,t);if(r=="comment")return r;if(n.align==null)n.align=true;if((f==";"||f==":")&&n.type=="statement")h(t);else if(f=="->"&&n.type=="statement"&&n.prev.type=="}"){h(t);t.context.align=false}else if(f=="{")m(t,e.column(),"}");else if(f=="[")m(t,e.column(),"]");else if(f=="(")m(t,e.column(),")");else if(f=="}"){while(n.type=="statement")n=h(t);if(n.type=="}")n=h(t);while(n.type=="statement")n=h(t)}else if(f==n.type)h(t);else if(n.type=="}"||n.type=="top"||n.type=="statement"&&f=="newstatement")m(t,e.column(),"statement");t.startOfLine=false;t.lastToken=f||r;return r},indent:function(e,t){if(!e.tokenize[e.tokenize.length-1].isBase)return 0;var n=t&&t.charAt(0),r=e.context;if(r.type=="statement"&&!p(e.lastToken))r=r.prev;var i=n==r.type;if(r.type=="statement")return r.indented+(n=="{"?0:o.indentUnit);else if(r.align)return r.column+(i?0:1);else return r.indented+(i?0:o.indentUnit)},electricChars:"{}",fold:"brace"}});e.defineMIME("text/x-groovy","groovy")});