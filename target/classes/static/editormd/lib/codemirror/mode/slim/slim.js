(function(t){if(typeof exports=="object"&&typeof module=="object")t(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed"),require("../ruby/ruby"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror","../htmlmixed/htmlmixed","../ruby/ruby"],t);else t(CodeMirror)})(function(X){"use strict";X.defineMode("slim",function(r){var n=X.getMode(r,{name:"htmlmixed"});var u=X.getMode(r,"ruby");var e={html:n,ruby:u};var a={ruby:"ruby",javascript:"javascript",css:"text/css",sass:"text/x-sass",scss:"text/x-scss",less:"text/x-less",styl:"text/x-styl",coffee:"coffeescript",asciidoc:"text/x-asciidoc",markdown:"text/x-markdown",textile:"text/x-textile",creole:"text/x-creole",wiki:"text/x-wiki",mediawiki:"text/x-mediawiki",rdoc:"text/x-rdoc",builder:"text/x-builder",nokogiri:"text/x-nokogiri",erb:"application/x-erb"};var o=function(t){var e=[];for(var n in t)e.push(n);return new RegExp("^("+e.join("|")+"):")}(a);var i={commentLine:"comment",slimSwitch:"operator special",slimTag:"tag",slimId:"attribute def",slimClass:"attribute qualifier",slimAttribute:"attribute",slimSubmode:"keyword special",closeAttributeTag:null,slimDoctype:null,lineContinuation:null};var l={"{":"}","[":"]","(":")"};var t="_a-zA-ZÀ-ÖØ-öø-˿Ͱ-ͽͿ-῿‌-‍⁰-↏Ⰰ-⿯、-퟿豈-﷏ﷰ-�";var c=t+"\\-0-9·̀-ͯ‿-⁀";var s=new RegExp("^[:"+t+"](?::["+c+"]|["+c+"]*)");var f=new RegExp("^[:"+t+"][:\\."+c+"]*(?=\\s*=)");var k=new RegExp("^[:"+t+"][:\\."+c+"]*");var d=/^\.-?[_a-zA-Z]+[\w\-]*/;var m=/^#[_a-zA-Z]+[\w\-]*/;function b(n,i,r){var u=function(t,e){e.tokenize=i;if(t.pos<n){t.pos=n;return r}return e.tokenize(t,e)};return function(t,e){e.tokenize=u;return i(t,e)}}function z(t,e,n,i,r){var u=t.current();var a=u.search(n);if(a>-1){e.tokenize=b(t.pos,e.tokenize,r);t.backUp(u.length-a-i)}return r}function p(t,e){t.stack={parent:t.stack,style:"continuation",indented:e,tokenize:t.line};t.line=t.tokenize}function h(t){if(t.line==t.tokenize){t.line=t.stack.tokenize;t.stack=t.stack.parent}}function x(i,r){return function(t,e){h(e);if(t.match(/^\\$/)){p(e,i);return"lineContinuation"}var n=r(t,e);if(t.eol()&&t.current().match(/(?:^|[^\\])(?:\\\\)*\\$/)){t.backUp(1)}return n}}function q(i,r){return function(t,e){h(e);var n=r(t,e);if(t.eol()&&t.current().match(/,$/)){p(e,i)}return n}}function v(i,r){return function(t,e){var n=t.peek();if(n==i&&e.rubyState.tokenize.length==1){t.next();e.tokenize=r;return"closeAttributeTag"}else{return S(t,e)}}}function y(n){var i;var r=function(t,e){if(e.rubyState.tokenize.length==1&&!e.rubyState.context.prev){t.backUp(1);if(t.eatSpace()){e.rubyState=i;e.tokenize=n;return n(t,e)}t.next()}return S(t,e)};return function(t,e){i=e.rubyState;e.rubyState=u.startState();e.tokenize=r;return S(t,e)}}function S(t,e){return u.token(t,e.rubyState)}function I(t,e){if(t.match(/^\\$/)){return"lineContinuation"}return w(t,e)}function w(t,e){if(t.match(/^#\{/)){e.tokenize=v("}",e.tokenize);return null}return z(t,e,/[^\\]#\{/,1,n.token(t,e.htmlState))}function P(i){return function(t,e){var n=I(t,e);if(t.eol())e.tokenize=i;return n}}function g(t,e,n){e.stack={parent:e.stack,style:"html",indented:t.column()+n,tokenize:e.line};e.line=e.tokenize=w;return null}function M(t,e){t.skipToEnd();return e.stack.style}function Z(t,e){e.stack={parent:e.stack,style:"comment",indented:e.indented+1,tokenize:e.line};e.line=M;return M(t,e)}function C(t,e){if(t.eat(e.stack.endQuote)){e.line=e.stack.line;e.tokenize=e.stack.tokenize;e.stack=e.stack.parent;return null}if(t.match(k)){e.tokenize=_;return"slimAttribute"}t.next();return null}function _(t,e){if(t.match(/^==?/)){e.tokenize=D;return null}return C(t,e)}function D(t,e){var n=t.peek();if(n=='"'||n=="'"){e.tokenize=j(n,"string",true,false,C);t.next();return e.tokenize(t,e)}if(n=="["){return y(C)(t,e)}if(t.match(/^(true|false|nil)\b/)){e.tokenize=C;return"keyword"}return y(C)(t,e)}function Q(t,e,n){t.stack={parent:t.stack,style:"wrapper",indented:t.indented+1,tokenize:n,line:t.line,endQuote:e};t.line=t.tokenize=C;return null}function V(t,e){if(t.match(/^#\{/)){e.tokenize=v("}",e.tokenize);return null}var n=new X.StringStream(t.string.slice(e.stack.indented),t.tabSize);n.pos=t.pos-e.stack.indented;n.start=t.start-e.stack.indented;n.lastColumnPos=t.lastColumnPos-e.stack.indented;n.lastColumnValue=t.lastColumnValue-e.stack.indented;var i=e.subMode.token(n,e.subState);t.pos=n.pos+e.stack.indented;return i}function B(t,e){e.stack.indented=t.column();e.line=e.tokenize=V;return e.tokenize(t,e)}function F(t){var e=a[t];var n=X.mimeModes[e];if(n){return X.getMode(r,n)}var i=X.modes[e];if(i){return i(r,{name:e})}return X.getMode(r,"null")}function G(t){if(!e.hasOwnProperty(t)){return e[t]=F(t)}return e[t]}function H(t,e){var n=G(t);var i=n.startState&&n.startState();e.subMode=n;e.subState=i;e.stack={parent:e.stack,style:"sub",indented:e.indented+1,tokenize:e.line};e.line=e.tokenize=B;return"slimSubmode"}function J(t,e){t.skipToEnd();return"slimDoctype"}function K(t,e){var n=t.peek();if(n=="<"){return(e.tokenize=P(e.tokenize))(t,e)}if(t.match(/^[|']/)){return g(t,e,1)}if(t.match(/^\/(!|\[\w+])?/)){return Z(t,e)}if(t.match(/^(-|==?[<>]?)/)){e.tokenize=x(t.column(),q(t.column(),S));return"slimSwitch"}if(t.match(/^doctype\b/)){e.tokenize=J;return"keyword"}var i=t.match(o);if(i){return H(i[1],e)}return A(t,e)}function E(t,e){if(e.startOfLine){return K(t,e)}return A(t,e)}function A(t,e){if(t.eat("*")){e.tokenize=y(L);return null}if(t.match(s)){e.tokenize=L;return"slimTag"}return $(t,e)}function L(t,e){if(t.match(/^(<>?|><?)/)){e.tokenize=$;return null}return $(t,e)}function $(t,e){if(t.match(m)){e.tokenize=$;return"slimId"}if(t.match(d)){e.tokenize=$;return"slimClass"}return T(t,e)}function T(t,e){if(t.match(/^([\[\{\(])/)){return Q(e,l[RegExp.$1],T)}if(t.match(f)){e.tokenize=N;return"slimAttribute"}if(t.peek()=="*"){t.next();e.tokenize=y(O);return null}return O(t,e)}function N(t,e){if(t.match(/^==?/)){e.tokenize=W;return null}return T(t,e)}function W(t,e){var n=t.peek();if(n=='"'||n=="'"){e.tokenize=j(n,"string",true,false,T);t.next();return e.tokenize(t,e)}if(n=="["){return y(T)(t,e)}if(n==":"){return y(U)(t,e)}if(t.match(/^(true|false|nil)\b/)){e.tokenize=T;return"keyword"}return y(T)(t,e)}function U(t,e){t.backUp(1);if(t.match(/^[^\s],(?=:)/)){e.tokenize=y(U);return null}t.next();return T(t,e)}function j(u,a,o,l,c){return function(t,e){h(e);var n=t.current().length==0;if(t.match(/^\\$/,n)){if(!n)return a;p(e,e.indented);return"lineContinuation"}if(t.match(/^#\{/,n)){if(!n)return a;e.tokenize=v("}",e.tokenize);return null}var i=false,r;while((r=t.next())!=null){if(r==u&&(l||!i)){e.tokenize=c;break}if(o&&r=="#"&&!i){if(t.eat("{")){t.backUp(2);break}}i=!i&&r=="\\"}if(t.eol()&&i){t.backUp(1)}return a}}function O(t,e){if(t.match(/^==?/)){e.tokenize=S;return"slimSwitch"}if(t.match(/^\/$/)){e.tokenize=E;return null}if(t.match(/^:/)){e.tokenize=A;return"slimSwitch"}g(t,e,0);return e.tokenize(t,e)}var R={startState:function(){var t=n.startState();var e=u.startState();return{htmlState:t,rubyState:e,stack:null,last:null,tokenize:E,line:E,indented:0}},copyState:function(t){return{htmlState:X.copyState(n,t.htmlState),rubyState:X.copyState(u,t.rubyState),subMode:t.subMode,subState:t.subMode&&X.copyState(t.subMode,t.subState),stack:t.stack,last:t.last,tokenize:t.tokenize,line:t.line}},token:function(t,e){if(t.sol()){e.indented=t.indentation();e.startOfLine=true;e.tokenize=e.line;while(e.stack&&e.stack.indented>e.indented&&e.last!="slimSubmode"){e.line=e.tokenize=e.stack.tokenize;e.stack=e.stack.parent;e.subMode=null;e.subState=null}}if(t.eatSpace())return null;var n=e.tokenize(t,e);e.startOfLine=false;if(n)e.last=n;return i.hasOwnProperty(n)?i[n]:n},blankLine:function(t){if(t.subMode&&t.subMode.blankLine){return t.subMode.blankLine(t.subState)}},innerMode:function(t){if(t.subMode)return{state:t.subState,mode:t.subMode};return{state:t,mode:R}}};return R},"htmlmixed","ruby");X.defineMIME("text/x-slim","slim");X.defineMIME("application/x-slim","slim")});