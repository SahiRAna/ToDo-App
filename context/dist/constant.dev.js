"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToDoListAbi = exports.ToDoListAddress = void 0;

var _toDoList = _interopRequireDefault(require("./toDoList.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 0x3Aa5ebB10DC797CAC828524e59A333d0A371443c
var ToDoListAddress = 0x3Aa5ebB10DC797CAC828524e59A333d0A371443c;
exports.ToDoListAddress = ToDoListAddress;
var ToDoListAbi = _toDoList["default"].abi;
exports.ToDoListAbi = ToDoListAbi;