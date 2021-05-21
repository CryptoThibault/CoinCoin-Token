const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('CoinCoin Token', function () {
  let CoinCoin, coincoin, dev, owner, alice, bob, charlie, dan, eve
  const NAME = 'CoinCoin'
  const SYMBOL = 'COIN'
  const INITIAL_SUPPLY = ethers.utils.parseEther('8000000000')
  const TRANSFER_AMOUNT = ethers.utils.parseEther('1000000000')

  beforeEach(async function () {
    ;[dev, owner, alice, bob, charlie, dan, eve] = await ethers.getSigners()
    CoinCoin = await ethers.getContractFactory('CoinCoin')
    coincoin = await CoinCoin.connect(dev).deploy(owner.address, INITIAL_SUPPLY)
    await coincoin.deployed()
    await coincoin
      .connect(owner)
      .transfer(alice.address, TRANSFER_AMOUNT)
    await coincoin
      .connect(owner)
      .transferFrom(owner.address, bob.address, TRANSFER_AMOUNT)
    await coincoin
      .connect(owner)
      .approve(charlie.address, TRANSFER_AMOUNT)
    await coincoin
      .connect(owner)
      .approveFrom(owner.address, dan.address, TRANSFER_AMOUNT)
  })

  describe('Deployement', function () {
    it('Has name CoinCoin', async function () {
      expect(await coincoin.name()).to.equal(NAME)
    })
    it('Has symbol Coin', async function () {
      expect(await coincoin.symbol()).to.equal(SYMBOL)
    })
    it('mints initial Supply to owner', async function () {
      let coincoin = await CoinCoin.connect(dev).deploy(
        owner.address,
        INITIAL_SUPPLY
      )
      expect(await coincoin.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY)
    })

    it('emits event Transfer when mint initial supply to owner at deployement', async function () {
      let tx = await coincoin.deployTransaction
      await expect(tx)
        .to.emit(coincoin, 'Transfer')
        .withArgs(ethers.constants.AddressZero, owner.address, INITIAL_SUPPLY)
    })
  })

  describe('Token transfers', function () {
    it('transfers tokens from sender to receipient', async function () {
      expect(await coincoin.balanceOf(alice.address)).to.equal(TRANSFER_AMOUNT)
    })
    it('transferFrom tokens from sender to receipient', async function () {
      expect(await coincoin.balanceOf(bob.address)).to.equal(TRANSFER_AMOUNT)
    })
    it('emits event Transfer when transfer tokens', async function () {
      await expect(coincoin.connect(owner).transfer(alice.address, TRANSFER_AMOUNT))
        .to.emit(coincoin, 'Transfer')
        .withArgs(owner.address, alice.address, TRANSFER_AMOUNT)
    })
    it('emits event Transfer when transferFrom tokens', async function () {
      await expect(coincoin.connect(owner).transferFrom(owner.address, bob.address, TRANSFER_AMOUNT))
        .to.emit(coincoin, 'Transfer')
        .withArgs(owner.address, bob.address, TRANSFER_AMOUNT)
    })
  })

  describe('Allowance system', function () {
    it('approve tokens from sender to receipient', async function () {
      expect(await coincoin.allowanceOf(owner.address, charlie.address)).to.equal(TRANSFER_AMOUNT)
    })
    it('approveFrom tokens from sender to receipient', async function () {
      expect(await coincoin.allowanceOf(owner.address, dan.address)).to.equal(TRANSFER_AMOUNT)
    })
    it('emits event Approve when approve tokens', async function () {
      await expect(coincoin.connect(owner).approve(charlie.address, TRANSFER_AMOUNT))
        .to.emit(coincoin, 'Approval')
        .withArgs(owner.address, charlie.address, TRANSFER_AMOUNT)
    })
    it('emits event Approve when approveFrom tokens', async function () {
      await expect(coincoin.connect(owner).approveFrom(owner.address, dan.address, TRANSFER_AMOUNT))
        .to.emit(coincoin, 'Approval')
        .withArgs(owner.address, dan.address, TRANSFER_AMOUNT)
    })
  })
})
