!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.freeMarker=t():e.freeMarker=t()}(this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){const n=r(2);e.exports=function(e){var t=a(e);return t=t.replace(i,u),!0===arguments[1]?new Function("context",(s.test(t)?o||(o=l(r(5))):"")+t):!1===arguments[1]?t:"function(context) {"+(s.test(t)?"var ftl = require('freemarker2js-base');":"")+t+"}"};var o,i=/((?:.(?!function))+)return ""}\)\(context, global\)\+\(function\(context, global\){/g,s=/ftl\./;function u(e,t){return-1!==t.indexOf("return ")?e:t}var a=function(e){for(var t=/(<[#!]--)|(-->)/g,r=-1,o=[],i=0;;){var s=t.exec(e);if(!s)break;s[1]?(i++,-1===r&&(r=s.index)):s[2]&&0==--i&&(o.push(r,s.index+s[0].length),r=-1)}var u=[],a=e.length;i>0&&o.push(r,a);for(var l=o.length-1;l>=0;l--)u.unshift(e.substring(o[l],a)),a=o[--l];return u.unshift(e.substring(0,a)),"var global=(context=context||{}); return "+n.resolve(u.join(""))};function l(e){var t=["var ftl = {"];for(var r in e)e.hasOwnProperty(r)&&t.push(r,":",e[r].toString(),",");return t.pop(),t.push("};"),t.join("")}},function(e,t,r){const n=r(3),o=r(4);e.exports={exp:function(e){for(var t,r=/(['"]).*?\1/g,o=[],i=0;t=r.exec(e);){var s=t.index;o.push(f(e.substring(i,s)),t[0]),i=s+t[0].length}o.push(f(e.substr(i))),e=o.join("");for(var u=0,a=n.length;u<a;u+=2)e=e.replace(n[u],n[u+1]);return"("+e+")"},resolve:function(e){var t,r=[],n=e.match(i);n&&(n[1]?t=o[n[1]](e,n.index,this):n[2]&&(t={start:n.index,end:n.index+n[0].length,output:this.exp(n[2])})),t?r.push(u(e.substr(0,t.start)),t.output,this.resolve(e.substr(t.end))):r.push(u(e));for(var s=r.length-1;s>=0;s--)r[s]||r.splice(s,1);return r.join("+")}};var i=/(?:<#([\w]+)[\s])|(?:\$\{([^}]+)\})/,s=/(?:\s+)?[\r\n]+(?:\s+)?/g;function u(e){return(e=e.replace(s,""))?JSON.stringify(e):void 0}var a=["true","false","gte","lte","gt","lt","eq"];function l(e,t){return t||-1!==a.indexOf(e)?e:"context."+e}function f(e){return e.replace(/([\?\.]\s*)*[a-zA-Z_][\.\w]*/g,l)}},function(e,t){e.exports=[/[\s]gte[\s]/g," >= ",/[\s]lte[\s]/g," <= ",/[\s]gt[\s]/g," > ",/[\s]lt[\s]/g," < ",/[\s]eq[\s]/g," === ",/([^\s!]+)\!((['"]).*\3)/,"($1!=undefined&&$1!=null?$1:$2)",/([^\s!]+)\?default\(((['"]).*\3)\)/,"($1!=undefined&&$1!=null?$1:$2)",/([^?]+)\? *string\(((?:(?:(['"])(?:(?!\3).)*\3)|(?:[^)]+)|(?: *, *))+)\)/g,function(e,t,s){var u=t.length-1,a=0;for(;u>=0;){var l=t.charAt(u);if(")"===l)a++;else if("("===l){if(1===a){u--;break}a--}else if(0===a&&r.test(l))break;u--}var f=t.substr(u+1);if(s=s.trim(),o.test(s=s.trim()))s="ftl.number("+f+","+s+")";else if(i.test(s))s="ftl.date("+f+","+s+")";else{var c=s.split(","),g=c.length;if(2!==g)for(var p,d=0;d<g;d++){for(var x=c[d],v=0,h=x.length;v<h;v++){var b=x.charAt(v);n.test(b)?p?p===b&&(p=null):p=b:"\\"===b&&v++}if(!p){c[0]=c.slice(0,d+1).join(","),c[1]=c.slice(d+1).join(",");break}}s=f+"?"+c[0]+":"+c[1]}return t.substr(0,u+1)+s},/\?size/g,".length",/\?index_of\(([^)]+)\)/g,".indexOf($1)",/\?replace\( *((['"]).*?\2|[^,]+), *((['"]).*?\4|[^,]+), *(['"])r\5\)/g,'.replace(new RegExp($1, "g"), $3)',/\?(replace\([^)]+\))/g,".$1",/\?substring\(([^()]+)\)/g,".substring($1)",/\?upper_case/g,".toUpperCase()",/\?lower_case/g,".toLowerCase()",/\?number/g,"*1",/([^\s!\(\)]+)\?if_exists/,'($1!=undefined&&$1!=null?$1:"")',/([^\s!\(\)\?]+)\?(?:\?|exists)/g,"($1!=undefined&&$1!=null)",/\?join\(([^()]+)\)/g,".join($1)"];var r=/[^\._$a-zA-Z0-9]/,n=/['"]/,o=/^(['"])[0#\.%]*\1$/,i=/^(['"])((?!\1).)+\1$/},function(e,t){e.exports={assign:function(e,t,r){for(var o=["(function(context, global){"],i=e.match(n),s=i[1],u=/([^=]+)=(((?! [^ ]+[^!=><]=[^!=><]).)+)/g;;){var a=u.exec(s);if(!a)break;o.push("global.",a[1],"=",r.exp(a[2]),";")}return o.push('return ""})(context, global)'),{start:t,end:t+i[0].length,output:o.join("")}},list:function(e,t,n){var o=/(?:<#list +([\w\.\[\]]+) +as +(\w+) *>)|(<\/#list>)/g,i=["(function(context, global){ var strs = []; "],s=o.exec(e);if(!s||s[3])throw new Error("list tag error");var u=1,a=s.index,l=s[0],f=s[1],c=s[2];do{if(!(s=o.exec(e)))throw new Error("list tag error");s[3]?u--:u++}while(u>0);var g=s.index,p=e.substring(a+l.length,g),d=f.split("..");return 2===d.length?i.push("var arr = []; for (var i = ",(r.test(d[0])?"":"context.")+d[0],", len = ",(r.test(d[1])?"":"context.")+d[1],"; i <= len; i++) { arr.push(i); }"):i.push("var arr = context.",f,";"),i.push("for(var i = 0, len = arr ? arr.length : 0; i < len; i++) { ","context.",c,"_index = i;context.",c," = arr[i];strs.push(",n.resolve(p),")",'} return strs.join("") })(ftl.sub(context), global)'),{start:a,end:g+s[0].length,output:i.join("")}},if:function(e,t,r){var n=/(?:<#if ([^>]+)>)|(?:<#elseif ([^>]+)>)|(<#else>)|(<\/#if>)/g,o=["(function(context, global){ if("],i=n.exec(e);if(!i||!i[1])throw new Error("if tag error");var s=1,u=i.index,a=u+i[0].length;o.push(r.exp(i[1]),"){");do{if(!(i=n.exec(e)))throw new Error("if tag error");i[1]?s++:i[2]?1===s&&(o.push("return ",r.resolve(e.substring(a,i.index)),"} else if (",r.exp(i[2]),") {"),a=i.index+i[0].length):i[3]?1===s&&(o.push("return ",r.resolve(e.substring(a,i.index)),"} else {"),a=i.index+i[0].length):i[4]&&s--}while(s>0);var l=o.length-1;return o.push("return ",r.resolve(e.substring(a,i.index)),"} else {"===o[l]?"}":'} return ""'," })(context, global)"),{start:u,end:i.index+i[0].length,output:o.join("")}}};var r=/^\d+$/,n=/<#assign[\s]+(.+?)\/?>/},function(e,t){e.exports={sub:function(e){var t=function(){};return t.prototype=e,new t},args:function(e,t){for(var n,o=t._args={};n=r.exec(e);)o[n[1]]=n[2]},date:function(e,t){return e=new Date(/^\d+$/.test(e)?parseInt(e):e),t.replace("yyyy",e.getFullYear()).replace("yy",e.getFullYear()%100).replace("MMM",["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][e.getMonth()]).replace("MM",(e.getMonth()+1).toString().padEnd(2,"0")).replace("dd",e.getDate().toString().padEnd(2,"0")).replace("HH",e.getHours().toString().padEnd(2,"0")).replace("mm",e.getMinutes().toString().padEnd(2,"0")).replace("ss",e.getSeconds().toString().padEnd(2,"0"))},number:function(e,t){if(!t)return e.toString();var r=0;"%"===t.charAt(t.length-1)&&(e*=100,r=1);var n=t.indexOf(".");if(-1!==n){var o=t.substr(n+1),i=o.length-r;e=parseFloat(e).toFixed(i);var s=o.indexOf("#");-1!==s&&(e=e.replace(new RegExp("\\.?0{1,"+(i-s)+"}$"),""))}else e=parseInt(e);if(","===t.charAt(0)){var u=(-1===n?e.length:n)-1;e=(""+e).replace(new RegExp("\\d{1,"+u+"}(?=\\d{"+u+"}(?:\\.|$))"),"$&,")}return e+(1===r?"%":"")}};var r=/\s+data-([^=]+)="([^"]+)"/g}])}));