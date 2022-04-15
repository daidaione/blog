(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed"),require("../smarty/smarty"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror","../htmlmixed/htmlmixed","../smarty/smarty"],e);else e(CodeMirror)})(function(f){"use strict";f.defineMode("smartymixed",function(e){var i=f.getMode(e,"htmlmixed");var a=f.getMode(e,"smarty");var r={rightDelimiter:"}",leftDelimiter:"{"};if(e.hasOwnProperty("leftDelimiter")){r.leftDelimiter=e.leftDelimiter}if(e.hasOwnProperty("rightDelimiter")){r.rightDelimiter=e.rightDelimiter}function t(e){return e.replace(/[^\s\w]/g,"\\$&")}var l=t(r.leftDelimiter),n=t(r.rightDelimiter);var o={smartyComment:new RegExp("^"+n+"\\*"),literalOpen:new RegExp(l+"literal"+n),literalClose:new RegExp(l+"/literal"+n),hasLeftDelimeter:new RegExp(".*"+l),htmlHasLeftDelimeter:new RegExp("[^<>]*"+l)};var m={chain:function(e,t,l){t.tokenize=l;return l(e,t)},cleanChain:function(e,t,l){t.tokenize=null;t.localState=null;t.localMode=null;return typeof l=="string"?l?l:null:l(e,t)},maybeBackup:function(e,t,l){var i=e.current();var a=i.search(t),r;if(a>-1)e.backUp(i.length-a);else if(r=i.match(/<\/?$/)){e.backUp(i.length);if(!e.match(t,false))e.match(i[0])}return l}};var c={html:function(e,t){var l=t.htmlMixedState.htmlState.context&&t.htmlMixedState.htmlState.context.tagName?t.htmlMixedState.htmlState.context.tagName:null;if(!t.inLiteral&&e.match(o.htmlHasLeftDelimeter,false)&&l===null){t.tokenize=c.smarty;t.localMode=a;t.localState=a.startState(i.indent(t.htmlMixedState,""));return m.maybeBackup(e,r.leftDelimiter,a.token(e,t.localState))}else if(!t.inLiteral&&e.match(r.leftDelimiter,false)){t.tokenize=c.smarty;t.localMode=a;t.localState=a.startState(i.indent(t.htmlMixedState,""));return m.maybeBackup(e,r.leftDelimiter,a.token(e,t.localState))}return i.token(e,t.htmlMixedState)},smarty:function(e,t){if(e.match(r.leftDelimiter,false)){if(e.match(o.smartyComment,false)){return m.chain(e,t,c.inBlock("comment","*"+r.rightDelimiter))}}else if(e.match(r.rightDelimiter,false)){e.eat(r.rightDelimiter);t.tokenize=c.html;t.localMode=i;t.localState=t.htmlMixedState;return"tag"}return m.maybeBackup(e,r.rightDelimiter,a.token(e,t.localState))},inBlock:function(l,i){return function(e,t){while(!e.eol()){if(e.match(i)){m.cleanChain(e,t,"");break}e.next()}return l}}};return{startState:function(){var e=i.startState();return{token:c.html,localMode:null,localState:null,htmlMixedState:e,tokenize:null,inLiteral:false}},copyState:function(e){var t=null,l=e.tokenize||e.token;if(e.localState){t=f.copyState(l!=c.html?a:i,e.localState)}return{token:e.token,tokenize:e.tokenize,localMode:e.localMode,localState:t,htmlMixedState:f.copyState(i,e.htmlMixedState),inLiteral:e.inLiteral}},token:function(e,t){if(e.match(r.leftDelimiter,false)){if(!t.inLiteral&&e.match(o.literalOpen,true)){t.inLiteral=true;return"keyword"}else if(t.inLiteral&&e.match(o.literalClose,true)){t.inLiteral=false;return"keyword"}}if(t.inLiteral&&t.localState!=t.htmlMixedState){t.tokenize=c.html;t.localMode=i;t.localState=t.htmlMixedState}var l=(t.tokenize||t.token)(e,t);return l},indent:function(e,t){if(e.localMode==a||e.inLiteral&&!e.localMode||o.hasLeftDelimeter.test(t)){return f.Pass}return i.indent(e.htmlMixedState,t)},innerMode:function(e){return{state:e.localState||e.htmlMixedState,mode:e.localMode||i}}}},"htmlmixed","smarty");f.defineMIME("text/x-smarty","smartymixed")});