(function(e){if(typeof exports=="object"&&typeof module=="object"){e(require("../../lib/codemirror"))}else if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],e)}else{e(CodeMirror)}})(function(e){"use strict";var r={addition:"positive",attributes:"attribute",bold:"strong",cite:"keyword",code:"atom",definitionList:"number",deletion:"negative",div:"punctuation",em:"em",footnote:"variable",footCite:"qualifier",header:"header",html:"comment",image:"string",italic:"em",link:"link",linkDefinition:"link",list1:"variable-2",list2:"variable-3",list3:"keyword",notextile:"string-2",pre:"operator",p:"property",quote:"bracket",span:"quote",specialChar:"tag",strong:"strong",sub:"builtin",sup:"builtin",table:"variable-3",tableHeading:"operator"};function i(e,t){t.mode=d.newLayout;t.tableHeading=false;if(t.layoutType==="definitionList"&&t.spanningLayout&&e.match(c("definitionListEnd"),false))t.spanningLayout=false}function n(e,t,i){if(i==="_"){if(e.eat("_"))return l(e,t,"italic",/__/,2);else return l(e,t,"em",/_/,1)}if(i==="*"){if(e.eat("*")){return l(e,t,"bold",/\*\*/,2)}return l(e,t,"strong",/\*/,1)}if(i==="["){if(e.match(/\d+\]/))t.footCite=true;return u(t)}if(i==="("){var n=e.match(/^(r|tm|c)\)/);if(n)return o(t,r.specialChar)}if(i==="<"&&e.match(/(\w+)[^>]+>[^<]+<\/\1>/))return o(t,r.html);if(i==="?"&&e.eat("?"))return l(e,t,"cite",/\?\?/,2);if(i==="="&&e.eat("="))return l(e,t,"notextile",/==/,2);if(i==="-"&&!e.eat("-"))return l(e,t,"deletion",/-/,1);if(i==="+")return l(e,t,"addition",/\+/,1);if(i==="~")return l(e,t,"sub",/~/,1);if(i==="^")return l(e,t,"sup",/\^/,1);if(i==="%")return l(e,t,"span",/%/,1);if(i==="@")return l(e,t,"code",/@/,1);if(i==="!"){var a=l(e,t,"image",/(?:\([^\)]+\))?!/,1);e.match(/^:\S+/);return a}return u(t)}function l(e,t,i,n,a){var r=e.pos>a?e.string.charAt(e.pos-a-1):null;var l=e.peek();if(t[i]){if((!l||/\W/.test(l))&&r&&/\S/.test(r)){var o=u(t);t[i]=false;return o}}else if((!r||/\W/.test(r))&&l&&/\S/.test(l)&&e.match(new RegExp("^.*\\S"+n.source+"(?:\\W|$)"),false)){t[i]=true;t.mode=d.attributes}return u(t)}function u(e){var t=a(e);if(t)return t;var i=[];if(e.layoutType)i.push(r[e.layoutType]);i=i.concat(s(e,"addition","bold","cite","code","deletion","em","footCite","image","italic","link","span","strong","sub","sup","table","tableHeading"));if(e.layoutType==="header")i.push(r.header+"-"+e.header);return i.length?i.join(" "):null}function a(e){var t=e.layoutType;switch(t){case"notextile":case"code":case"pre":return r[t];default:if(e.notextile)return r.notextile+(t?" "+r[t]:"");return null}}function o(e,t){var i=a(e);if(i)return i;var n=u(e);if(t)return n?n+" "+t:t;else return n}function s(e){var t=[];for(var i=1;i<arguments.length;++i){if(e[arguments[i]])t.push(r[arguments[i]])}return t}function t(e){var t=e.spanningLayout,i=e.layoutType;for(var n in e)if(e.hasOwnProperty(n))delete e[n];e.mode=d.newLayout;if(t){e.layoutType=i;e.spanningLayout=true}}var f={cache:{},single:{bc:"bc",bq:"bq",definitionList:/- [^(?::=)]+:=+/,definitionListEnd:/.*=:\s*$/,div:"div",drawTable:/\|.*\|/,foot:/fn\d+/,header:/h[1-6]/,html:/\s*<(?:\/)?(\w+)(?:[^>]+)?>(?:[^<]+<\/\1>)?/,link:/[^"]+":\S/,linkDefinition:/\[[^\s\]]+\]\S+/,list:/(?:#+|\*+)/,notextile:"notextile",para:"p",pre:"pre",table:"table",tableCellAttributes:/[\/\\]\d+/,tableHeading:/\|_\./,tableText:/[^"_\*\[\(\?\+~\^%@|-]+/,text:/[^!"_=\*\[\(<\?\+~\^%@-]+/},attributes:{align:/(?:<>|<|>|=)/,selector:/\([^\(][^\)]+\)/,lang:/\[[^\[\]]+\]/,pad:/(?:\(+|\)+){1,2}/,css:/\{[^\}]+\}/},createRe:function(e){switch(e){case"drawTable":return f.makeRe("^",f.single.drawTable,"$");case"html":return f.makeRe("^",f.single.html,"(?:",f.single.html,")*","$");case"linkDefinition":return f.makeRe("^",f.single.linkDefinition,"$");case"listLayout":return f.makeRe("^",f.single.list,c("allAttributes"),"*\\s+");case"tableCellAttributes":return f.makeRe("^",f.choiceRe(f.single.tableCellAttributes,c("allAttributes")),"+\\.");case"type":return f.makeRe("^",c("allTypes"));case"typeLayout":return f.makeRe("^",c("allTypes"),c("allAttributes"),"*\\.\\.?","(\\s+|$)");case"attributes":return f.makeRe("^",c("allAttributes"),"+");case"allTypes":return f.choiceRe(f.single.div,f.single.foot,f.single.header,f.single.bc,f.single.bq,f.single.notextile,f.single.pre,f.single.table,f.single.para);case"allAttributes":return f.choiceRe(f.attributes.selector,f.attributes.css,f.attributes.lang,f.attributes.align,f.attributes.pad);default:return f.makeRe("^",f.single[e])}},makeRe:function(){var e="";for(var t=0;t<arguments.length;++t){var i=arguments[t];e+=typeof i==="string"?i:i.source}return new RegExp(e)},choiceRe:function(){var e=[arguments[0]];for(var t=1;t<arguments.length;++t){e[t*2-1]="|";e[t*2]=arguments[t]}e.unshift("(?:");e.push(")");return f.makeRe.apply(null,e)}};function c(e){return f.cache[e]||(f.cache[e]=f.createRe(e))}var d={newLayout:function(e,t){if(e.match(c("typeLayout"),false)){t.spanningLayout=false;return(t.mode=d.blockType)(e,t)}var i;if(!a(t)){if(e.match(c("listLayout"),false))i=d.list;else if(e.match(c("drawTable"),false))i=d.table;else if(e.match(c("linkDefinition"),false))i=d.linkDefinition;else if(e.match(c("definitionList")))i=d.definitionList;else if(e.match(c("html"),false))i=d.html}return(t.mode=i||d.text)(e,t)},blockType:function(e,t){var i,n;t.layoutType=null;if(i=e.match(c("type")))n=i[0];else return(t.mode=d.text)(e,t);if(i=n.match(c("header"))){t.layoutType="header";t.header=parseInt(i[0][1])}else if(n.match(c("bq"))){t.layoutType="quote"}else if(n.match(c("bc"))){t.layoutType="code"}else if(n.match(c("foot"))){t.layoutType="footnote"}else if(n.match(c("notextile"))){t.layoutType="notextile"}else if(n.match(c("pre"))){t.layoutType="pre"}else if(n.match(c("div"))){t.layoutType="div"}else if(n.match(c("table"))){t.layoutType="table"}t.mode=d.attributes;return u(t)},text:function(e,t){if(e.match(c("text")))return u(t);var i=e.next();if(i==='"')return(t.mode=d.link)(e,t);return n(e,t,i)},attributes:function(e,t){t.mode=d.layoutLength;if(e.match(c("attributes")))return o(t,r.attributes);else return u(t)},layoutLength:function(e,t){if(e.eat(".")&&e.eat("."))t.spanningLayout=true;t.mode=d.text;return u(t)},list:function(e,t){var i=e.match(c("list"));t.listDepth=i[0].length;var n=(t.listDepth-1)%3;if(!n)t.layoutType="list1";else if(n===1)t.layoutType="list2";else t.layoutType="list3";t.mode=d.attributes;return u(t)},link:function(e,t){t.mode=d.text;if(e.match(c("link"))){e.match(/\S+/);return o(t,r.link)}return u(t)},linkDefinition:function(e,t){e.skipToEnd();return o(t,r.linkDefinition)},definitionList:function(e,t){e.match(c("definitionList"));t.layoutType="definitionList";if(e.match(/\s*$/))t.spanningLayout=true;else t.mode=d.attributes;return u(t)},html:function(e,t){e.skipToEnd();return o(t,r.html)},table:function(e,t){t.layoutType="table";return(t.mode=d.tableCell)(e,t)},tableCell:function(e,t){if(e.match(c("tableHeading")))t.tableHeading=true;else e.eat("|");t.mode=d.tableCellAttributes;return u(t)},tableCellAttributes:function(e,t){t.mode=d.tableText;if(e.match(c("tableCellAttributes")))return o(t,r.attributes);else return u(t)},tableText:function(e,t){if(e.match(c("tableText")))return u(t);if(e.peek()==="|"){t.mode=d.tableCell;return u(t)}return n(e,t,e.next())}};e.defineMode("textile",function(){return{startState:function(){return{mode:d.newLayout}},token:function(e,t){if(e.sol())i(e,t);return t.mode(e,t)},blankLine:t}});e.defineMIME("text/x-textile","textile")});