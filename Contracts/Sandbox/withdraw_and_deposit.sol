// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SandboxWallet {
    // Events
    event Deposit(address indexed user, uint256 amount, string userId);
    event Withdrawal(address indexed user, uint256 amount, string userId);

   

    // Function to handle deposits
    function deposit(string memory userId) public payable {
        require(msg.value > 0, "You must send some Ether");
        emit Deposit(msg.sender, msg.value, userId);
    }

    // Fallback function to accept Ether sent without calling a function
    receive() external payable {}

    fallback() external payable {}

    // Function to withdraw Ether
    function withdraw(address payable recipient, uint256 amount, string memory userId) public {
        require(address(this).balance >= amount, "Insufficient contract balance");
        recipient.transfer(amount);
        emit Withdrawal(msg.sender, amount, userId);
    }

    // View contract balance (for debugging)
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
