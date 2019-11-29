/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Container_1 = __webpack_require__(/*! ./src/Container */ \"./src/Container.ts\");\r\nexports.default = Container_1.default;\r\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "./node_modules/camelcase/index.js":
/*!*****************************************!*\
  !*** ./node_modules/camelcase/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst preserveCamelCase = string => {\n\tlet isLastCharLower = false;\n\tlet isLastCharUpper = false;\n\tlet isLastLastCharUpper = false;\n\n\tfor (let i = 0; i < string.length; i++) {\n\t\tconst character = string[i];\n\n\t\tif (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {\n\t\t\tstring = string.slice(0, i) + '-' + string.slice(i);\n\t\t\tisLastCharLower = false;\n\t\t\tisLastLastCharUpper = isLastCharUpper;\n\t\t\tisLastCharUpper = true;\n\t\t\ti++;\n\t\t} else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {\n\t\t\tstring = string.slice(0, i - 1) + '-' + string.slice(i - 1);\n\t\t\tisLastLastCharUpper = isLastCharUpper;\n\t\t\tisLastCharUpper = false;\n\t\t\tisLastCharLower = true;\n\t\t} else {\n\t\t\tisLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;\n\t\t\tisLastLastCharUpper = isLastCharUpper;\n\t\t\tisLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;\n\t\t}\n\t}\n\n\treturn string;\n};\n\nconst camelCase = (input, options) => {\n\tif (!(typeof input === 'string' || Array.isArray(input))) {\n\t\tthrow new TypeError('Expected the input to be `string | string[]`');\n\t}\n\n\toptions = Object.assign({\n\t\tpascalCase: false\n\t}, options);\n\n\tconst postProcess = x => options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;\n\n\tif (Array.isArray(input)) {\n\t\tinput = input.map(x => x.trim())\n\t\t\t.filter(x => x.length)\n\t\t\t.join('-');\n\t} else {\n\t\tinput = input.trim();\n\t}\n\n\tif (input.length === 0) {\n\t\treturn '';\n\t}\n\n\tif (input.length === 1) {\n\t\treturn options.pascalCase ? input.toUpperCase() : input.toLowerCase();\n\t}\n\n\tconst hasUpperCase = input !== input.toLowerCase();\n\n\tif (hasUpperCase) {\n\t\tinput = preserveCamelCase(input);\n\t}\n\n\tinput = input\n\t\t.replace(/^[_.\\- ]+/, '')\n\t\t.toLowerCase()\n\t\t.replace(/[_.\\- ]+(\\w|$)/g, (_, p1) => p1.toUpperCase())\n\t\t.replace(/\\d+(\\w|$)/g, m => m.toUpperCase());\n\n\treturn postProcess(input);\n};\n\nmodule.exports = camelCase;\n// TODO: Remove this for the next major release\nmodule.exports.default = camelCase;\n\n\n//# sourceURL=webpack:///./node_modules/camelcase/index.js?");

/***/ }),

/***/ "./src/Container.ts":
/*!**************************!*\
  !*** ./src/Container.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __spreadArrays = (this && this.__spreadArrays) || function () {\r\n    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;\r\n    for (var r = Array(s), k = 0, i = 0; i < il; i++)\r\n        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)\r\n            r[k] = a[j];\r\n    return r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar camelcase_1 = __webpack_require__(/*! camelcase */ \"./node_modules/camelcase/index.js\");\r\nvar Container = /** @class */ (function () {\r\n    function Container() {\r\n        this.services = new Map;\r\n        this.singletons = new Map;\r\n        this.extensions = new Map;\r\n        this.hooks = {\r\n            resolving: [],\r\n            resolved: [],\r\n        };\r\n    }\r\n    /**\r\n     * Bind a class to the container and return a new one everytime 'make' is called.\r\n     * @param name The name of the class or the class itself.\r\n     * @param definition The function which returns a new instance of the class.\r\n     */\r\n    Container.prototype.bind = function (name, definition) {\r\n        var n = typeof name === 'string' ? name : name.name;\r\n        this.services.set(n, {\r\n            name: n,\r\n            definition: definition,\r\n            type: 'service',\r\n        });\r\n    };\r\n    /**\r\n     * Bind a class to the container and cache it for multiple requests for it.\r\n     * This will create a singleton so the same object will always be returned.\r\n     * @param name The name of the class or the class itself.\r\n     * @param definition The function which returns an instance of the class.\r\n     */\r\n    Container.prototype.singleton = function (name, definition) {\r\n        var n = typeof name === 'string' ? name : name.name;\r\n        this.services.set(n, {\r\n            name: n,\r\n            definition: definition,\r\n            type: 'singleton',\r\n        });\r\n    };\r\n    /**\r\n     * Construct an object with dependency injection using binded objects in this\r\n     * container.\r\n     * @param name The name of the class which you want to create.\r\n     */\r\n    Container.prototype.make = function (name) {\r\n        var _this = this;\r\n        var n = typeof name === 'string' ? name : name.name;\r\n        var service = this.services.get(n) || false;\r\n        var instance;\r\n        this.runHooks('resolving', n, n);\r\n        if (service && service.type === 'singleton') {\r\n            if (this.singletons.has(n)) {\r\n                instance = this.singletons.get(n);\r\n            }\r\n            else {\r\n                instance = this.createInstance(service);\r\n                this.singletons.set(n, instance);\r\n            }\r\n        }\r\n        else if (service && service.type === 'service') {\r\n            instance = this.createInstance(service);\r\n        }\r\n        else if (name instanceof Function) {\r\n            // Try to create the object.\r\n            instance = new (name.bind.apply(name, __spreadArrays([void 0], this.resolveDependencies(name))))();\r\n        }\r\n        if (instance) {\r\n            // Add on the extensions.\r\n            if (typeof this.extensions[n] !== 'undefined') {\r\n                this.extensions[n].forEach(function (extension) {\r\n                    instance = extension(instance, _this);\r\n                });\r\n            }\r\n            this.runHooks('resolved', n, instance);\r\n            return instance;\r\n        }\r\n    };\r\n    Container.prototype.resolving = function (resolver, name) {\r\n        this.addHook('resolving', {\r\n            bindings: name,\r\n            hook: resolver,\r\n        });\r\n    };\r\n    Container.prototype.resolved = function (resolver, name) {\r\n        this.addHook('resolved', {\r\n            bindings: name,\r\n            hook: resolver,\r\n        });\r\n    };\r\n    Container.prototype.extend = function (name, definition) {\r\n        var n = typeof name === 'string' ? name : name.name;\r\n        if (typeof this.extensions[n] === 'undefined') {\r\n            this.extensions[n] = [];\r\n        }\r\n        this.extensions[n].push(definition);\r\n    };\r\n    Container.prototype.addHook = function (name, hook) {\r\n        this.hooks[name].push(hook);\r\n    };\r\n    Container.prototype.runHooks = function (type, name, service) {\r\n        var _this = this;\r\n        this.hooks[type].forEach(function (hook) {\r\n            var correctBinding = hook.bindings\r\n                ? (hook.bindings || []).some(function (binding) { return binding === name; })\r\n                : true;\r\n            if (correctBinding) {\r\n                hook.hook(service, _this);\r\n            }\r\n        });\r\n    };\r\n    /**\r\n     * Call a function and try to bind it's arguments.\r\n     * @param callable The function/method which you would like to call and bind parameters to.\r\n     */\r\n    Container.prototype.call = function (callable) {\r\n        var args = this.resolveDependencies(callable);\r\n        return callable.apply(void 0, args);\r\n    };\r\n    /**\r\n     * Get a list of arguments which need to be based into this objects constructor.\r\n     * @param obj The object to get the arguments from. This may be a bit hacky but its\r\n     *            currently working with arrow functions and normal functions so I'm\r\n     *            not going to complain.\r\n     */\r\n    Container.prototype.getArgumentNames = function (obj) {\r\n        var str = obj.toString();\r\n        var params = [];\r\n        // Remove comments of the form /* ... */\r\n        // Removing comments of the form //\r\n        // Remove body of the function { ... }\r\n        // removing '=>' if func is arrow function\r\n        str = str.replace(/\\/\\*[\\s\\S]*?\\*\\//g, '')\r\n            .replace(/\\/\\/(.)*/g, '')\r\n            .replace(/{[\\s\\S]*}/, '')\r\n            .replace(/=>/g, '')\r\n            .trim();\r\n        // Start parameter names after first '('\r\n        var start = str.indexOf('(') + 1;\r\n        // End parameter names is just before last ')'\r\n        var end = str.length - 1;\r\n        var results = str.substring(start, end).split(', ');\r\n        results.forEach(function (result) {\r\n            // Removing any default value\r\n            result = result.replace(/=[\\s\\S]*/g, '').trim();\r\n            if (result.length > 0) {\r\n                params.push(result);\r\n            }\r\n        });\r\n        return params;\r\n    };\r\n    /**\r\n     * Get a list of things which needs to be passed in and look inside\r\n     * of the container for these items.\r\n     * @param obj The object to resolve the dependencies for.\r\n     */\r\n    Container.prototype.resolveDependencies = function (obj) {\r\n        var _this = this;\r\n        var params = this.getArgumentNames(obj);\r\n        var bindings = [];\r\n        params.forEach(function (param) {\r\n            param = camelcase_1.default(param, {\r\n                pascalCase: true,\r\n            });\r\n            bindings.push(_this.make(param));\r\n        });\r\n        return bindings;\r\n    };\r\n    /**\r\n     * Create a new instance using the services definition function and pass\r\n     * and instance of this container into it just incase they don't want\r\n     * to use arrow functions for some weird reason.\r\n     * @param service The service to construct.\r\n     */\r\n    Container.prototype.createInstance = function (service) {\r\n        return service.definition(this);\r\n    };\r\n    return Container;\r\n}());\r\nexports.default = Container;\r\n\n\n//# sourceURL=webpack:///./src/Container.ts?");

/***/ })

/******/ });
