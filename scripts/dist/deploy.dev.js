"use strict";

var hre = require("hardhat");

function main() {
  var ToDoList, toDoList;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(hre.ethers.getContractFactory("ToDoList"));

        case 2:
          ToDoList = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(ToDoList.deploy());

        case 5:
          toDoList = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(toDoList.waitForDeployment());

        case 8:
          console.log("ToDoList deployed to:", toDoList.target); // console.log(toDoList);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

main()["catch"](function (error) {
  console.error(error);
  process.exitCode = 1;
});