(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("rust",function(){var f=4,A=2;var e={if:"if-style",while:"if-style",loop:"else-style",else:"else-style",do:"else-style",ret:"else-style",fail:"else-style",break:"atom",cont:"atom",const:"let",resource:"fn",let:"let",fn:"fn",for:"for",alt:"alt",iface:"iface",impl:"impl",type:"type",enum:"enum",mod:"mod",as:"op",true:"atom",false:"atom",assert:"op",check:"op",claim:"op",native:"ignore",unsafe:"ignore",import:"else-style",export:"else-style",copy:"op",log:"op",log_err:"op",use:"op",bind:"op",self:"atom",struct:"enum"};var U=function(){var e={fn:"fn",block:"fn",obj:"obj"};var r="bool uint int i8 i16 i32 i64 u8 u16 u32 u64 float f32 f64 str char".split(" ");for(var t=0,n=r.length;t<n;++t)e[r[t]]="atom";return e}();var i=/[+\-*&%=<>!?|\.@]/;var u,a;function o(e,r){u=e;return r}function l(e,r){var t=e.next();if(t=='"'){r.tokenize=_;return r.tokenize(e,r)}if(t=="'"){u="atom";if(e.eat("\\")){if(e.skipTo("'")){e.next();return"string"}else{return"error"}}else{e.next();return e.eat("'")?"string":"error"}}if(t=="/"){if(e.eat("/")){e.skipToEnd();return"comment"}if(e.eat("*")){r.tokenize=c(1);return r.tokenize(e,r)}}if(t=="#"){if(e.eat("[")){u="open-attr";return null}e.eatWhile(/\w/);return o("macro","meta")}if(t==":"&&e.match(":<")){return o("op",null)}if(t.match(/\d/)||t=="."&&e.eat(/\d/)){var n=false;if(!e.match(/^x[\da-f]+/i)&&!e.match(/^b[01]+/)){e.eatWhile(/\d/);if(e.eat(".")){n=true;e.eatWhile(/\d/)}if(e.match(/^e[+\-]?\d+/i)){n=true}}if(n)e.match(/^f(?:32|64)/);else e.match(/^[ui](?:8|16|32|64)/);return o("atom","number")}if(t.match(/[()\[\]{}:;,]/))return o(t,null);if(t=="-"&&e.eat(">"))return o("->",null);if(t.match(i)){e.eatWhile(i);return o("op",null)}e.eatWhile(/\w/);a=e.current();if(e.match(/^::\w/)){e.backUp(1);return o("prefix","variable-2")}if(r.keywords.propertyIsEnumerable(a))return o(r.keywords[a],a.match(/true|false/)?"atom":"keyword");return o("name","variable")}function _(e,r){var t,n=false;while(t=e.next()){if(t=='"'&&!n){r.tokenize=l;return o("atom","string")}n=!n&&t=="\\"}return o("op","string")}function c(i){return function(e,r){var t=null,n;while(n=e.next()){if(n=="/"&&t=="*"){if(i==1){r.tokenize=l;break}else{r.tokenize=c(i-1);return r.tokenize(e,r)}}if(n=="*"&&t=="/"){r.tokenize=c(i+1);return r.tokenize(e,r)}t=n}return"comment"}}var m={state:null,stream:null,marked:null,cc:null};function d(){for(var e=arguments.length-1;e>=0;e--)m.cc.push(arguments[e])}function s(){d.apply(null,arguments);return true}function t(r,t){var e=function(){var e=m.state;e.lexical={indented:e.indented,column:m.stream.column(),type:r,prev:e.lexical,info:t}};e.lex=true;return e}function n(){var e=m.state;if(e.lexical.prev){if(e.lexical.type==")")e.indented=e.lexical.indented;e.lexical=e.lexical.prev}}function r(){m.state.keywords=U}function k(){m.state.keywords=e}n.lex=r.lex=k.lex=true;function p(r,t){function n(e){if(e==",")return s(r,n);if(e==t)return s();return s(n)}return function(e){if(e==t)return s();return d(r,n)}}function h(e,r){return s(t("stat",r),e,n,y)}function y(e){if(e=="}")return s();if(e=="let")return h(z,"let");if(e=="fn")return h(C);if(e=="type")return s(t("stat"),W,v,n,y);if(e=="enum")return h(E);if(e=="mod")return h(H);if(e=="iface")return h($);if(e=="impl")return h(S);if(e=="open-attr")return s(t("]"),p(x,"]"),n);if(e=="ignore"||e.match(/[\]\);,]/))return s(y);return d(t("stat"),x,n,v,y)}function v(e){if(e==";")return s();return d()}function x(e){if(e=="atom"||e=="name")return s(b);if(e=="{")return s(t("}"),D,n);if(e.match(/[\[\(]/))return q(e,x);if(e.match(/[\]\)\};,]/))return d();if(e=="if-style")return s(x,x);if(e=="else-style"||e=="op")return s(x);if(e=="for")return s(P,F,G,x,x);if(e=="alt")return s(x,Q);if(e=="fn")return s(C);if(e=="macro")return s(V);return s()}function b(e){if(a==".")return s(B);if(a=="::<"){return s(I,b)}if(e=="op"||a==":")return s(x);if(e=="("||e=="[")return q(e,x);return d()}function B(){if(a.match(/^\w+$/)){m.marked="variable";return s(b)}return d(x)}function D(e){if(e=="op"){if(a=="|")return s(g,n,t("}","block"),y);if(a=="||")return s(n,t("}","block"),y)}if(a=="mutable"||a.match(/^\w+$/)&&m.stream.peek()==":"&&!m.stream.match("::",false))return d(w(x));return d(y)}function w(r){function t(e){if(a=="mutable"||a=="with"){m.marked="keyword";return s(t)}if(a.match(/^\w*$/)){m.marked="variable";return s(t)}if(e==":")return s(r,t);if(e=="}")return s();return s(t)}return t}function g(e){if(e=="name"){m.marked="def";return s(g)}if(e=="op"&&a=="|")return s();return s(g)}function z(e){if(e.match(/[\]\)\};]/))return s();if(a=="=")return s(x,j);if(e==",")return s(z);return d(P,F,z)}function j(e){if(e.match(/[\]\)\};,]/))return d(z);else return d(x,j)}function F(e){if(e==":")return s(r,O,k);return d()}function G(e){if(e=="name"&&a=="in"){m.marked="keyword";return s()}return d()}function C(e){if(a=="@"||a=="~"){m.marked="keyword";return s(C)}if(e=="name"){m.marked="def";return s(C)}if(a=="<")return s(I,C);if(e=="{")return d(x);if(e=="(")return s(t(")"),p(J,")"),n,C);if(e=="->")return s(r,O,k,C);if(e==";")return s();return s(C)}function W(e){if(e=="name"){m.marked="def";return s(W)}if(a=="<")return s(I,W);if(a=="=")return s(r,O,k);return s(W)}function E(e){if(e=="name"){m.marked="def";return s(E)}if(a=="<")return s(I,E);if(a=="=")return s(r,O,k,v);if(e=="{")return s(t("}"),r,M,k,n);return s(E)}function M(e){if(e=="}")return s();if(e=="(")return s(t(")"),p(O,")"),n,M);if(a.match(/^\w+$/))m.marked="def";return s(M)}function H(e){if(e=="name"){m.marked="def";return s(H)}if(e=="{")return s(t("}"),y,n);return d()}function $(e){if(e=="name"){m.marked="def";return s($)}if(a=="<")return s(I,$);if(e=="{")return s(t("}"),y,n);return d()}function S(e){if(a=="<")return s(I,S);if(a=="of"||a=="for"){m.marked="keyword";return s(O,S)}if(e=="name"){m.marked="def";return s(S)}if(e=="{")return s(t("}"),y,n);return d()}function I(){if(a==">")return s();if(a==",")return s(I);if(a==":")return s(O,I);return d(O,I)}function J(e){if(e=="name"){m.marked="def";return s(J)}if(e==":")return s(r,O,k);return d()}function O(e){if(e=="name"){m.marked="variable-3";return s(K)}if(a=="mutable"){m.marked="keyword";return s(O)}if(e=="atom")return s(K);if(e=="op"||e=="obj")return s(O);if(e=="fn")return s(L);if(e=="{")return s(t("{"),w(O),n);return q(e,O)}function K(){if(a=="<")return s(I);return d()}function L(e){if(e=="(")return s(t("("),p(O,")"),n,L);if(e=="->")return s(O);return d()}function P(e){if(e=="name"){m.marked="def";return s(N)}if(e=="atom")return s(N);if(e=="op")return s(P);if(e.match(/[\]\)\};,]/))return d();return q(e,P)}function N(e){if(e=="op"&&a==".")return s();if(a=="to"){m.marked="keyword";return s(P)}else return d()}function Q(e){if(e=="{")return s(t("}","alt"),T,n);return d()}function T(e){if(e=="}")return s();if(e=="|")return s(T);if(a=="when"){m.marked="keyword";return s(x,R)}if(e.match(/[\]\);,]/))return s(T);return d(P,R)}function R(e){if(e=="{")return s(t("}","alt"),y,n,T);else return d(T)}function V(e){if(e.match(/[\[\(\{]/))return q(e,x);return d()}function q(e,r){if(e=="[")return s(t("]"),p(r,"]"),n);if(e=="(")return s(t(")"),p(r,")"),n);if(e=="{")return s(t("}"),p(r,"}"),n);return s()}function X(e,r,t){var n=e.cc;m.state=e;m.stream=r;m.marked=null,m.cc=n;while(true){var i=n.length?n.pop():y;if(i(u)){while(n.length&&n[n.length-1].lex)n.pop()();return m.marked||t}}}return{startState:function(){return{tokenize:l,cc:[],lexical:{indented:-f,column:0,type:"top",align:false},keywords:e,indented:0}},token:function(e,r){if(e.sol()){if(!r.lexical.hasOwnProperty("align"))r.lexical.align=false;r.indented=e.indentation()}if(e.eatSpace())return null;u=a=null;var t=r.tokenize(e,r);if(t=="comment")return t;if(!r.lexical.hasOwnProperty("align"))r.lexical.align=true;if(u=="prefix")return t;if(!a)a=e.current();return X(r,e,t)},indent:function(e,r){if(e.tokenize!=l)return 0;var t=r&&r.charAt(0),n=e.lexical,i=n.type,u=t==i;if(i=="stat")return n.indented+f;if(n.align)return n.column+(u?0:1);return n.indented+(u?0:n.info=="alt"?A:f)},electricChars:"{}",blockCommentStart:"/*",blockCommentEnd:"*/",lineComment:"//",fold:"brace"}});e.defineMIME("text/x-rustsrc","rust")});