(function(e){if(typeof exports=="object"&&typeof module=="object")e(require("../../lib/codemirror"));else if(typeof define=="function"&&define.amd)define(["../../lib/codemirror"],e);else e(CodeMirror)})(function(e){"use strict";e.defineMode("ntriples",function(){var t={PRE_SUBJECT:0,WRITING_SUB_URI:1,WRITING_BNODE_URI:2,PRE_PRED:3,WRITING_PRED_URI:4,PRE_OBJ:5,WRITING_OBJ_URI:6,WRITING_OBJ_BNODE:7,WRITING_OBJ_LITERAL:8,WRITING_LIT_LANG:9,WRITING_LIT_TYPE:10,POST_OBJ:11,ERROR:12};function f(e,i){var r=e.location;var _;if(r==t.PRE_SUBJECT&&i=="<")_=t.WRITING_SUB_URI;else if(r==t.PRE_SUBJECT&&i=="_")_=t.WRITING_BNODE_URI;else if(r==t.PRE_PRED&&i=="<")_=t.WRITING_PRED_URI;else if(r==t.PRE_OBJ&&i=="<")_=t.WRITING_OBJ_URI;else if(r==t.PRE_OBJ&&i=="_")_=t.WRITING_OBJ_BNODE;else if(r==t.PRE_OBJ&&i=='"')_=t.WRITING_OBJ_LITERAL;else if(r==t.WRITING_SUB_URI&&i==">")_=t.PRE_PRED;else if(r==t.WRITING_BNODE_URI&&i==" ")_=t.PRE_PRED;else if(r==t.WRITING_PRED_URI&&i==">")_=t.PRE_OBJ;else if(r==t.WRITING_OBJ_URI&&i==">")_=t.POST_OBJ;else if(r==t.WRITING_OBJ_BNODE&&i==" ")_=t.POST_OBJ;else if(r==t.WRITING_OBJ_LITERAL&&i=='"')_=t.POST_OBJ;else if(r==t.WRITING_LIT_LANG&&i==" ")_=t.POST_OBJ;else if(r==t.WRITING_LIT_TYPE&&i==">")_=t.POST_OBJ;else if(r==t.WRITING_OBJ_LITERAL&&i=="@")_=t.WRITING_LIT_LANG;else if(r==t.WRITING_OBJ_LITERAL&&i=="^")_=t.WRITING_LIT_TYPE;else if(i==" "&&(r==t.PRE_SUBJECT||r==t.PRE_PRED||r==t.PRE_OBJ||r==t.POST_OBJ))_=r;else if(r==t.POST_OBJ&&i==".")_=t.PRE_SUBJECT;else _=t.ERROR;e.location=_}return{startState:function(){return{location:t.PRE_SUBJECT,uris:[],anchors:[],bnodes:[],langs:[],types:[]}},token:function(e,i){var r=e.next();if(r=="<"){f(i,r);var _="";e.eatWhile(function(e){if(e!="#"&&e!=">"){_+=e;return true}return false});i.uris.push(_);if(e.match("#",false))return"variable";e.next();f(i,">");return"variable"}if(r=="#"){var t="";e.eatWhile(function(e){if(e!=">"&&e!=" "){t+=e;return true}return false});i.anchors.push(t);return"variable-2"}if(r==">"){f(i,">");return"variable"}if(r=="_"){f(i,r);var I="";e.eatWhile(function(e){if(e!=" "){I+=e;return true}return false});i.bnodes.push(I);e.next();f(i," ");return"builtin"}if(r=='"'){f(i,r);e.eatWhile(function(e){return e!='"'});e.next();if(e.peek()!="@"&&e.peek()!="^"){f(i,'"')}return"string"}if(r=="@"){f(i,"@");var n="";e.eatWhile(function(e){if(e!=" "){n+=e;return true}return false});i.langs.push(n);e.next();f(i," ");return"string-2"}if(r=="^"){e.next();f(i,"^");var R="";e.eatWhile(function(e){if(e!=">"){R+=e;return true}return false});i.types.push(R);e.next();f(i,">");return"variable"}if(r==" "){f(i,r)}if(r=="."){f(i,r)}}}});e.defineMIME("text/n-triples","ntriples")});