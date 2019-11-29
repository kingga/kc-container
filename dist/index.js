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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Container_1 = __webpack_require__(/*! ./src/Container */ \"./src/Container.ts\");\r\nexports.default = Container_1.default;\r\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "./src/Container.ts":
/*!**************************!*\
  !*** ./src/Container.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst pascalcase_1 = __webpack_require__(/*! ./helpers/pascalcase */ \"./src/helpers/pascalcase.ts\");\r\nclass Container {\r\n    constructor() {\r\n        this.services = new Map;\r\n        this.singletons = new Map;\r\n        this.extensions = new Map;\r\n        this.hooks = {\r\n            resolving: [],\r\n            resolved: [],\r\n        };\r\n    }\r\n    /**\r\n     * Bind a class to the container and return a new one everytime 'make' is called.\r\n     * @param name The name of the class or the class itself.\r\n     * @param definition The function which returns a new instance of the class.\r\n     */\r\n    bind(name, definition) {\r\n        const n = typeof name === 'string' ? name : name.name;\r\n        this.services.set(n, {\r\n            name: n,\r\n            definition,\r\n            type: 'service',\r\n        });\r\n    }\r\n    /**\r\n     * Bind a class to the container and cache it for multiple requests for it.\r\n     * This will create a singleton so the same object will always be returned.\r\n     * @param name The name of the class or the class itself.\r\n     * @param definition The function which returns an instance of the class.\r\n     */\r\n    singleton(name, definition) {\r\n        const n = typeof name === 'string' ? name : name.name;\r\n        this.services.set(n, {\r\n            name: n,\r\n            definition,\r\n            type: 'singleton',\r\n        });\r\n    }\r\n    /**\r\n     * Construct an object with dependency injection using binded objects in this\r\n     * container.\r\n     * @param name The name of the class which you want to create.\r\n     */\r\n    make(name) {\r\n        const n = typeof name === 'string' ? name : name.name;\r\n        const service = this.services.get(n) || false;\r\n        let instance;\r\n        this.runHooks('resolving', n, n);\r\n        if (service && service.type === 'singleton') {\r\n            if (this.singletons.has(n)) {\r\n                instance = this.singletons.get(n);\r\n            }\r\n            else {\r\n                instance = this.createInstance(service);\r\n                this.singletons.set(n, instance);\r\n            }\r\n        }\r\n        else if (service && service.type === 'service') {\r\n            instance = this.createInstance(service);\r\n        }\r\n        else if (name instanceof Function) {\r\n            // Try to create the object.\r\n            instance = new name(...this.resolveDependencies(name));\r\n        }\r\n        if (instance) {\r\n            // Add on the extensions.\r\n            if (typeof this.extensions[n] !== 'undefined') {\r\n                this.extensions[n].forEach((extension) => {\r\n                    instance = extension(instance, this);\r\n                });\r\n            }\r\n            this.runHooks('resolved', n, instance);\r\n            return instance;\r\n        }\r\n    }\r\n    resolving(resolver, name) {\r\n        this.addHook('resolving', {\r\n            bindings: name,\r\n            hook: resolver,\r\n        });\r\n    }\r\n    resolved(resolver, name) {\r\n        this.addHook('resolved', {\r\n            bindings: name,\r\n            hook: resolver,\r\n        });\r\n    }\r\n    extend(name, definition) {\r\n        const n = typeof name === 'string' ? name : name.name;\r\n        if (typeof this.extensions[n] === 'undefined') {\r\n            this.extensions[n] = [];\r\n        }\r\n        this.extensions[n].push(definition);\r\n    }\r\n    addHook(name, hook) {\r\n        this.hooks[name].push(hook);\r\n    }\r\n    runHooks(type, name, service) {\r\n        this.hooks[type].forEach((hook) => {\r\n            const correctBinding = hook.bindings\r\n                ? (hook.bindings || []).some((binding) => binding === name)\r\n                : true;\r\n            if (correctBinding) {\r\n                hook.hook(service, this);\r\n            }\r\n        });\r\n    }\r\n    /**\r\n     * Call a function and try to bind it's arguments.\r\n     * @param callable The function/method which you would like to call and bind parameters to.\r\n     */\r\n    call(callable) {\r\n        const args = this.resolveDependencies(callable);\r\n        return callable(...args);\r\n    }\r\n    /**\r\n     * Scan through an ES6 class for it's constructor.\r\n     * @param cls The classes object after toString() is ran on it.\r\n     */\r\n    scanForConstructor(cls) {\r\n        const pos = cls.indexOf('constructor');\r\n        cls = cls.substr(pos);\r\n        const end = cls.indexOf('{');\r\n        cls = cls.substr(0, end);\r\n        return cls;\r\n    }\r\n    /**\r\n     * Get a list of arguments which need to be based into this objects constructor.\r\n     * @param obj The object to get the arguments from. This may be a bit hacky but its\r\n     *            currently working with arrow functions and normal functions so I'm\r\n     *            not going to complain.\r\n     */\r\n    getArgumentNames(obj) {\r\n        let str = obj.toString();\r\n        let params = [];\r\n        // Check if it's an ES6 class.\r\n        if (str.substr(0, 5) === 'class') {\r\n            str = this.scanForConstructor(str);\r\n        }\r\n        // Remove comments of the form /* ... */\r\n        // Removing comments of the form //\r\n        // Remove body of the function { ... }\r\n        // removing '=>' if func is arrow function\r\n        str = str.replace(/\\/\\*[\\s\\S]*?\\*\\//g, '')\r\n            .replace(/\\/\\/(.)*/g, '')\r\n            .replace(/{[\\s\\S]*}/, '')\r\n            .replace(/=>/g, '')\r\n            .trim();\r\n        // Start parameter names after first '('\r\n        const start = str.indexOf('(') + 1;\r\n        // End parameter names is just before last ')'\r\n        const end = str.length - 1;\r\n        const results = str.substring(start, end).split(', ');\r\n        results.forEach((result) => {\r\n            // Removing any default value\r\n            result = result.replace(/=[\\s\\S]*/g, '').trim();\r\n            if (result.length > 0) {\r\n                params.push(result);\r\n            }\r\n        });\r\n        return params;\r\n    }\r\n    /**\r\n     * Get a list of things which needs to be passed in and look inside\r\n     * of the container for these items.\r\n     * @param obj The object to resolve the dependencies for.\r\n     */\r\n    resolveDependencies(obj) {\r\n        const params = this.getArgumentNames(obj);\r\n        let bindings = [];\r\n        params.forEach((param) => {\r\n            bindings.push(this.make(pascalcase_1.pascalcase(param)));\r\n        });\r\n        return bindings;\r\n    }\r\n    /**\r\n     * Create a new instance using the services definition function and pass\r\n     * and instance of this container into it just incase they don't want\r\n     * to use arrow functions for some weird reason.\r\n     * @param service The service to construct.\r\n     */\r\n    createInstance(service) {\r\n        return service.definition(this);\r\n    }\r\n}\r\nexports.default = Container;\r\n\n\n//# sourceURL=webpack:///./src/Container.ts?");

/***/ }),

/***/ "./src/helpers/pascalcase.ts":
/*!***********************************!*\
  !*** ./src/helpers/pascalcase.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nfunction pascalcase(str) {\r\n    str = str.trim();\r\n    // If the string is empty return an empty string.\r\n    if (str === '') {\r\n        return '';\r\n    }\r\n    // If this string is only one character just uppercase the character.\r\n    if (str.length === 1) {\r\n        return str.toLocaleUpperCase();\r\n    }\r\n    // Split the string into alphanumeric groups so if there is any space we can\r\n    // ucfirst() the first character.\r\n    const match = str.match(/[A-Za-z0-9]+/g);\r\n    if (match) {\r\n        // Make the first character uppercase and then append the rest of the string.\r\n        return match.map((m) => (m[0].toLocaleUpperCase() + m.slice(1)).trim())\r\n            .join('');\r\n    }\r\n    return str;\r\n}\r\nexports.pascalcase = pascalcase;\r\n\n\n//# sourceURL=webpack:///./src/helpers/pascalcase.ts?");

/***/ })

/******/ });