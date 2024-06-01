// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
contract ToDoList {
    uint256 public _iduser;
    address public ownerOfContract;
    address[] public creators;
    string[] public message;
    uint256[] public messageId;
    struct ToDolistApp {
        address accounts;
        uint256 userId;
        string message;
        bool completed;
    }
    event ToDoEvent(
        address indexed accounts,
        uint256 indexed userId,
        string message,
        bool completed
    );
    mapping(address => ToDolistApp) public toDolistApps;
    constructor() {
        ownerOfContract = msg.sender;
    }
    function inc() internal {
        _iduser++;
    }
    function createList(string calldata _message) external {
        inc();
        uint256 idNumber = _iduser;
        ToDolistApp storage toDo = toDolistApps[msg.sender];

        toDo.accounts = msg.sender;
        toDo.message = _message;
        toDo.userId = idNumber;
        toDo.completed = false;

        creators.push(msg.sender);
        message.push(_message);
        messageId.push(idNumber);
        emit ToDoEvent(msg.sender, toDo.userId, _message, toDo.completed);
    }
    function getCreatorData(
        address _address
    ) public view returns (address, uint256, string memory, bool) {
        ToDolistApp memory singleCreatorData = toDolistApps[_address];
        return (
            singleCreatorData.accounts,
            singleCreatorData.userId,
            singleCreatorData.message,
            singleCreatorData.completed
        );
    }
    function getAddress() external view returns (address[] memory) {
        return creators;
    }
    function getMessage() external view returns (string[] memory) {
        return message;
    }
    function toggle(address _creator) public {
        ToDolistApp storage singleUserData = toDolistApps[_creator];
        singleUserData.completed = !singleUserData.completed;
    }

    // function getMessageId()external view returns(uint256[] memory){
    //     return messageId;
    // }
}
