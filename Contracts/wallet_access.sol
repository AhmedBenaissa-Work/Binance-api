// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WalletAccess {
    
    // Function to send Ether from the contract to a specified address
    

    // Function to check the balance of a specified address
    function checkBalance(address _address) public view returns (uint) {
        return _address.balance; // Return the balance of the specified address
    }
}
