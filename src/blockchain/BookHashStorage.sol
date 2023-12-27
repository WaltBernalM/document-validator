// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract BookHashStorage {
  // Owner only restriction
  // address private owner; // The address of the allowed user
  // modifier onlyOwner() {
  //   require(msg.sender == owner, "Only the owner can call this function");
  //   _;
  // }
  // constructor() {
  //   owner = msg.sender; // Set the contract deployer as the owner
  // }

  mapping(string => string) private bookHashes;

  function storeBookHash(string memory transactionCode, string memory bookHash) external {
    require(bytes(transactionCode).length > 0, "Transaction code must not be empty");
    require(bytes(bookHash).length > 0, "Book hash must not be empty");
    bookHashes[transactionCode] = bookHash;
  }

  function getBookHash(string memory transactionCode) external view returns (string memory) {
    return bookHashes[transactionCode];
  }
}