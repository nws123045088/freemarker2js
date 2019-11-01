(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["freeMarker"] = factory();
	else
		root["freeMarker"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib */ \"./lib/index.js\");\n\n//# sourceURL=webpack://freeMarker/./index.js?");

/***/ }),

/***/ "./lib/engine.js":
/*!***********************!*\
  !*** ./lib/engine.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const rpls = __webpack_require__(/*! ./replace */ \"./lib/replace.js\");\r\nconst express = __webpack_require__(/*! ./express */ \"./lib/express.js\");\r\n\r\nmodule.exports = {\r\n    exp: function(exp) {\r\n        var reg = /(['\"]).*?\\1/g,\r\n            match, expString = [],\r\n            from = 0;\r\n        while ((match = reg.exec(exp))) {\r\n            var to = match.index;\r\n            expString.push(prefixExpress(exp.substring(from, to)), match[0]);\r\n            from = to + match[0].length;\r\n        }\r\n        expString.push(prefixExpress(exp.substr(from)));\r\n        exp = expString.join('');\r\n        for (var i = 0, len = rpls.length; i < len; i += 2) {\r\n            exp = exp.replace(rpls[i], rpls[i + 1]);\r\n        }\r\n        return '(' + exp + ')';\r\n    },\r\n    resolve: function(template) {\r\n        var jsString = [];\r\n        var block;\r\n        var m = template.match(reg_block);\r\n        if (m) {\r\n            if (m[1]) {\r\n                block = express[m[1]](template, m.index, this);\r\n            } else if (m[2]) {\r\n                block = {\r\n                    start: m.index,\r\n                    end: m.index + m[0].length,\r\n                    output: this.exp(m[2])\r\n                };\r\n            }\r\n        }\r\n        if (block) {\r\n            jsString.push(\r\n                formatString(template.substr(0, block.start)),\r\n                block.output,\r\n                this.resolve(template.substr(block.end))\r\n            );\r\n        } else {\r\n            jsString.push(formatString(template));\r\n        }\r\n        for (var i = jsString.length - 1; i >= 0; i--) {\r\n            if (!jsString[i]) {\r\n                jsString.splice(i, 1);\r\n            }\r\n        }\r\n        return jsString.join('+');\r\n    }\r\n}\r\n\r\nvar reg_block = /(?:<#([\\w]+)[\\s])|(?:\\$\\{([^}]+)\\})/,\r\n    reg_blank = /(?:\\s+)?[\\r\\n]+(?:\\s+)?/g;\r\n\r\nfunction formatString(str) {\r\n    str = str.replace(reg_blank, '');\r\n    return str ? JSON.stringify(str) : undefined;\r\n}\r\n\r\nvar KEYS = ['true', 'false', 'gte', 'lte', 'gt', 'lt', 'eq'];\r\n\r\nfunction prefixExpressReplace(exp, pre) {\r\n    return !pre && KEYS.indexOf(exp) === -1 ? 'context.' + exp : exp;\r\n}\r\n\r\nfunction prefixExpress(exp) {\r\n    return exp.replace(/([\\?\\.]\\s*)*[a-zA-Z_][\\.\\w]*/g, prefixExpressReplace);\r\n}\n\n//# sourceURL=webpack://freeMarker/./lib/engine.js?");

/***/ }),

/***/ "./lib/express.js":
/*!************************!*\
  !*** ./lib/express.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\r\n    /**\r\n     * assign赋值\r\n     * \r\n     * @param {string} template ftl模板 \r\n     * @param {int} start 相对的起始索引位置\r\n     * @param {object} context 数据上下文\r\n     * @param {object} globalCtx 全局数据上下文\r\n     * @returns {\r\n        start: 相对的起始索引位置,\r\n        end: 相对的结束索引位置\r\n        output: 解析后的HTML\r\n    }\r\n    */\r\n    'assign': function(template, start, engine) {\r\n        var jsString = ['(function(context, global){'];\r\n        var res = template.match(reg_assign);\r\n        var content = res[1],\r\n            reg_assign_exp = /([^=]+)=(((?! [^ ]+[^!=><]=[^!=><]).)+)/g;\r\n        // 这里要处理\"value=obj.value\", \"value=obj.value=='key'?string('key1', 'key2')\"及多个这样的表达式组成的一个\r\n        while (true) {\r\n            var execRes = reg_assign_exp.exec(content);\r\n            if (execRes) {\r\n                jsString.push('global.', execRes[1], '=', engine.exp(execRes[2]), ';');\r\n            } else {\r\n                break;\r\n            }\r\n        }\r\n        jsString.push('return \"\"})(context, global)');\r\n        return {\r\n            start: start,\r\n            end: start + res[0].length,\r\n            output: jsString.join('')\r\n        };\r\n    },\r\n    'list': function(template, _, engine) {\r\n        var reg_list = /(?:<#list +([\\w\\.\\[\\]]+) +as +(\\w+) *>)|(<\\/#list>)/g;\r\n        var jsString = ['(function(context, global){ var strs = []; '];\r\n        var match = reg_list.exec(template);\r\n        if (!match || match[3]) throw new Error('错误的list标签');\r\n        var count = 1,\r\n            start = match.index,\r\n            startLabel = match[0],\r\n            dataLabel = match[1],\r\n            contextLabel = match[2];\r\n        do {\r\n            match = reg_list.exec(template);\r\n            if (!match) throw new Error('错误的list标签');\r\n            if (match[3]) {\r\n                count--;\r\n            } else {\r\n                count++;\r\n            }\r\n        } while (count > 0);\r\n        var end = match.index,\r\n            subTemplate = template.substring(start + startLabel.length, end);\r\n        var matchRepeat = dataLabel.split('..');\r\n        if (matchRepeat.length === 2) { //解析 <#list 1..item.count as idx>\r\n            jsString.push('var arr = []; for (var i = ', (reg_num.test(matchRepeat[0]) ? '' : 'context.') + matchRepeat[0], ', len = ', (reg_num.test(matchRepeat[1]) ? '' : 'context.') + matchRepeat[1], '; i <= len; i++) { arr.push(i); }');\r\n        } else {\r\n            jsString.push('var arr = context.', dataLabel, ';');\r\n        }\r\n        jsString.push('for(var i = 0, len = arr ? arr.length : 0; i < len; i++) { ', 'context.', contextLabel, '_index = i;context.', contextLabel, ' = arr[i];strs.push(', engine.resolve(subTemplate), ')', '} return strs.join(\"\") })(ftl.sub(context), global)');\r\n        return {\r\n            start: start,\r\n            end: end + match[0].length,\r\n            output: jsString.join('')\r\n        };\r\n    },\r\n    'if': function(template, _, engine) {\r\n        var reg_if = /(?:<#if ([^>]+)>)|(?:<#elseif ([^>]+)>)|(<#else>)|(<\\/#if>)/g;\r\n        var jsString = ['(function(context, global){ if('];\r\n        var match = reg_if.exec(template);\r\n        if (!match || !match[1]) throw new Error('错误if标签');\r\n        var count = 1,\r\n            start = match.index,\r\n            from = start + match[0].length;\r\n        jsString.push(engine.exp(match[1]), '){');\r\n        do {\r\n            match = reg_if.exec(template);\r\n            if (!match) throw new Error('错误的if标签');\r\n            if (match[1]) {\r\n                count++;\r\n            } else if (match[2]) {\r\n                if (count === 1) {\r\n                    jsString.push('return ', engine.resolve(template.substring(from, match.index)), '} else if (', engine.exp(match[2]), ') {');\r\n                    from = match.index + match[0].length;\r\n                }\r\n            } else if (match[3]) {\r\n                if (count === 1) {\r\n                    jsString.push('return ', engine.resolve(template.substring(from, match.index)), '} else {');\r\n                    from = match.index + match[0].length;\r\n                }\r\n            } else if (match[4]) {\r\n                count--;\r\n            }\r\n        } while (count > 0);\r\n        var idx = jsString.length - 1;\r\n        jsString.push('return ', engine.resolve(template.substring(from, match.index)), jsString[idx] === '} else {' ? '}' : '} return \"\"', ' })(context, global)');\r\n        return {\r\n            start: start,\r\n            end: match.index + match[0].length,\r\n            output: jsString.join('')\r\n        };\r\n    }\r\n}\r\nvar reg_num = /^\\d+$/,\r\n    reg_assign = /<#assign[\\s]+(.+?)\\/?>/;\n\n//# sourceURL=webpack://freeMarker/./lib/express.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const engine = __webpack_require__(/*! ./engine */ \"./lib/engine.js\");\r\n\r\nmodule.exports = function(template) {\r\n    var jsString = formatTemplate(template);\r\n    jsString = jsString.replace(reg_empty_func, replaceEmptyFunc);\r\n    if (arguments[1] === true) {\r\n        return new Function('context', (reg_ftl.test(jsString) ? (ftlString || (ftlString = toString(__webpack_require__(/*! freemarker2js-base */ \"./node_modules/freemarker2js-base/index.js\")))) : '') + jsString);\r\n    } else if (arguments[1] === false) {\r\n        return jsString;\r\n    }\r\n    return 'function(context) {' + (reg_ftl.test(jsString) ? 'var ftl = require(\\'freemarker2js-base\\');' : '') + jsString + '}';\r\n};\r\n\r\nvar reg_empty_func = /((?:.(?!function))+)return \"\"}\\)\\(context, global\\)\\+\\(function\\(context, global\\){/g,\r\n    reg_ftl = /ftl\\./,\r\n    ftlString;\r\n\r\nfunction replaceEmptyFunc($0, $1) {\r\n    return ($1.indexOf('return ') !== -1) ? $0 : $1;\r\n}\r\n\r\nvar formatTemplate = function(template) {\r\n    var reg = /(<[#!]--)|(-->)/g,\r\n        from = -1,\r\n        idx = [],\r\n        count = 0;\r\n    do {\r\n        var match = reg.exec(template);\r\n        if (!match) break;\r\n        if (match[1]) {\r\n            count++;\r\n            if (from === -1) from = match.index;\r\n        } else if (match[2]) {\r\n            if ((--count) === 0) {\r\n                idx.push(from, match.index + match[0].length);\r\n                from = -1;\r\n            }\r\n        }\r\n    } while (true);\r\n    var str = [],\r\n        to = template.length;\r\n    if (count > 0) idx.push(from, to);\r\n    for (var i = idx.length - 1; i >= 0; i--) {\r\n        str.unshift(template.substring(idx[i], to));\r\n        to = idx[--i];\r\n    }\r\n    str.unshift(template.substring(0, to));\r\n    return 'var global=(context=context||{}); return ' + engine.resolve(str.join(''));\r\n};\r\n\r\nfunction toString(ftl) {\r\n    var json = ['var ftl = {'];\r\n    for (var name in ftl) {\r\n        if (ftl.hasOwnProperty(name)) {\r\n            json.push(name, ':', ftl[name].toString(), ',');\r\n        }\r\n    }\r\n    json.pop();\r\n    json.push('};');\r\n    return json.join('');\r\n}\n\n//# sourceURL=webpack://freeMarker/./lib/index.js?");

/***/ }),

/***/ "./lib/replace.js":
/*!************************!*\
  !*** ./lib/replace.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = [\r\n    /[\\s]gte[\\s]/g, ' >= ',\r\n    /[\\s]lte[\\s]/g, ' <= ',\r\n    /[\\s]gt[\\s]/g, ' > ',\r\n    /[\\s]lt[\\s]/g, ' < ',\r\n    /[\\s]eq[\\s]/g, ' === ',\r\n    /([^\\s!]+)\\!((['\"]).*\\3)/, '($1!=undefined&&$1!=null?$1:$2)',\r\n    /([^\\s!]+)\\?default\\(((['\"]).*\\3)\\)/, '($1!=undefined&&$1!=null?$1:$2)',\r\n    /([^?]+)\\? *string\\(((?:(?:(['\"])(?:(?!\\3).)*\\3)|(?:[^)]+)|(?: *, *))+)\\)/g, ftl_toString,\r\n    /\\?size/g, '.length',\r\n    /\\?index_of\\(([^)]+)\\)/g, '.indexOf($1)',\r\n    /\\?replace\\( *((['\"]).*?\\2|[^,]+), *((['\"]).*?\\4|[^,]+), *(['\"])r\\5\\)/g, '.replace(new RegExp($1, \"g\"), $3)',\r\n    /\\?(replace\\([^)]+\\))/g, '.$1',\r\n    /\\?substring\\(([^()]+)\\)/g, '.substring($1)',\r\n    /\\?upper_case/g, '.toUpperCase()',\r\n    /\\?lower_case/g, '.toLowerCase()',\r\n    /\\?number/g, '*1',\r\n    /([^\\s!\\(\\)]+)\\?if_exists/, '($1!=undefined&&$1!=null?$1:\"\")',\r\n    /([^\\s!\\(\\)\\?]+)\\?(?:\\?|exists)/g, '($1!=undefined&&$1!=null)'\r\n];\r\n\r\nvar reg_name_unchar = /[^\\._$a-zA-Z0-9]/,\r\n    reg_quot = /['\"]/,\r\n    reg_num = /^(['\"])[0#\\.%]*\\1$/,\r\n    reg_fmt = /^(['\"])((?!\\1).)+\\1$/;\r\n\r\nfunction ftl_toString(_, prefix, fmt) {\r\n    var idx = prefix.length - 1,\r\n        bracket = 0;\r\n    while (idx >= 0) {\r\n        var pchar = prefix.charAt(idx);\r\n        if (pchar === ')') {\r\n            bracket++;\r\n        } else if (pchar === '(') {\r\n            if (bracket === 1) {\r\n                idx--;\r\n                break;\r\n            }\r\n            bracket--;\r\n        } else if (bracket === 0 && reg_name_unchar.test(pchar)) {\r\n            break;\r\n        }\r\n        idx--;\r\n    }\r\n    var value = prefix.substr(idx + 1);\r\n    fmt = fmt.trim();\r\n    if (reg_num.test(fmt = fmt.trim())) { //格式化数字\r\n        fmt = 'ftl.number(' + value + ',' + fmt + ')';\r\n    } else if (reg_fmt.test(fmt)) { //格式化时间\r\n        fmt = 'ftl.date(' + value + ',' + fmt + ')';\r\n    } else {\r\n        var spt = fmt.split(','),\r\n            len = spt.length;\r\n        if (len !== 2) {\r\n            var quotChar;\r\n            for (var i = 0; i < len; i++) {\r\n                var str = spt[i];\r\n                for (var k = 0, klen = str.length; k < klen; k++) {\r\n                    var char = str.charAt(k);\r\n                    if (reg_quot.test(char)) {\r\n                        if (!quotChar) {\r\n                            quotChar = char;\r\n                        } else if (quotChar === char) {\r\n                            quotChar = null;\r\n                        }\r\n                    } else if (char === '\\\\') {\r\n                        k++;\r\n                    }\r\n                }\r\n                if (!quotChar) {\r\n                    spt[0] = spt.slice(0, i + 1).join(',');\r\n                    spt[1] = spt.slice(i + 1).join(',');\r\n                    break;\r\n                }\r\n            }\r\n        }\r\n        fmt = value + '?' + spt[0] + ':' + spt[1];\r\n    }\r\n    return prefix.substr(0, idx + 1) + fmt;\r\n}\n\n//# sourceURL=webpack://freeMarker/./lib/replace.js?");

/***/ }),

/***/ "./node_modules/freemarker2js-base/index.js":
/*!**************************************************!*\
  !*** ./node_modules/freemarker2js-base/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n    sub: function(context) {\n        var f = function() {};\n        f.prototype = context;\n        return new f();\n    },\n    args: function(html, context) {\n        var match, args = context._args = {};\n        while ((match = (reg_data_args.exec(html)))) {\n            args[match[1]] = match[2];\n        }\n    },\n    date: function(date, fmt) {\n        date = new Date(/^\\d+$/.test(date) ? parseInt(date) : date);\n        return fmt.replace('yyyy', date.getFullYear())\n            .replace('yy', date.getFullYear() % 100)\n            .replace('MMM', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()])\n            .replace('MM', (date.getMonth() + 1).toString().padEnd(2, '0'))\n            .replace('dd', date.getDate().toString().padEnd(2, '0'))\n            .replace('HH', date.getHours().toString().padEnd(2, '0'))\n            .replace('mm', date.getMinutes().toString().padEnd(2, '0'))\n            .replace('ss', date.getSeconds().toString().padEnd(2, '0'));\n    },\n    number: function(num, fmt) {\n        if (!fmt) return num.toString();\n        var percentCount = 0;\n        if (fmt.charAt(fmt.length - 1) === '%') {\n            num = 100 * num;\n            percentCount = 1;\n        }\n        var idx = fmt.indexOf('.');\n        if (idx !== -1) {\n            var floatStr = fmt.substr(idx + 1),\n                len = floatStr.length - percentCount;\n            num = parseFloat(num).toFixed(len);\n            var nidx = floatStr.indexOf('#');\n            if (nidx !== -1) num = num.replace(new RegExp('\\\\.?0{1,' + (len - nidx) + '}$'), '');\n        } else {\n            num = parseInt(num);\n        }\n        if (fmt.charAt(0) === ',') {\n            var count = (idx === -1 ? num.length : idx) - 1;\n            num = ('' + num).replace(new RegExp('\\\\d{1,' + count + '}(?=\\\\d{' + count + '}(?:\\\\.|$))'), '$&,');\n        }\n        return num + (percentCount === 1 ? '%' : '');\n    }\n};\n\nvar reg_data_args = /\\s+data-([^=]+)=\"([^\"]+)\"/g;\n\n//# sourceURL=webpack://freeMarker/./node_modules/freemarker2js-base/index.js?");

/***/ })

/******/ });
});