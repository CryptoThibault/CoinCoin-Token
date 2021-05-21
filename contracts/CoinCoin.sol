// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CoinCoin {
    mapping(address => uint256) private _balances;
    string private _name;
    string private _symbol;
    uint256 private _totalSupply;
    mapping(address => mapping(address => uint256)) private _allowances;

    event Transfer(
        address indexed sender,
        address indexed recipient,
        uint256 amount
    );
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor(address owner_, uint256 totalSupply_) {
        emit Transfer(address(0), owner_, totalSupply_);
        _name = "CoinCoin";
        _symbol = "COIN";
        _balances[owner_] = totalSupply_;
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(value <= _balances[msg.sender], "CoinCoin: can not transfer");
        emit Transfer(msg.sender, to, value);
        _balances[msg.sender] -= value;
        _balances[to] += value;
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public returns (bool) {
        require(value <= _balances[from], "CoinCoin: can not transfer");
        emit Transfer(from, to, value);
        _balances[from] -= value;
        _balances[to] += value;
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool) {
        require(value <= _balances[msg.sender], "CoinCoin: can not approve");
        emit Approval(msg.sender, spender, value);
        _balances[msg.sender] -= value;
        _allowances[msg.sender][spender] += value;
        return true;
    }

    function approveFrom(
        address owner,
        address spender,
        uint256 value
    ) public returns (bool) {
        require(value <= _balances[owner], "CoinCoin: can not approve");
        emit Approval(owner, spender, value);
        _balances[owner] -= value;
        _allowances[owner][spender] += value;
        return true;
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

    function balance() public view returns (uint256) {
        return _balances[msg.sender];
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function allowance(address owner) public view returns (uint256) {
        return _allowances[owner][msg.sender];
    }

    function allowanceAt(address spender) public view returns (uint256) {
        return _allowances[msg.sender][spender];
    }

    function allowanceOf(address owner, address spender)
        public
        view
        returns (uint256)
    {
        return _allowances[owner][spender];
    }
}
