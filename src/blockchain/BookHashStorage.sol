// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract BookHashStorage {
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