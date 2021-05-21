// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CoinCoin {
    mapping(address => uint256) private _balances;
    string private _name;
    string private _symbol;
    uint256 private _totalSupply;

    event Transfer(
        address indexed sender,
        address indexed receipient,
        uint256 amount
    );

    constructor(address owner_, uint256 totalSupply_) {
        _name = "CoinCoin";
        _symbol = "COIN";
        _balances[owner_] = totalSupply_;
        emit Transfer(address(0), owner_, totalSupply_);
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
}
