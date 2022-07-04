const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

/********* Hardhat Tests *********/
describe("SimpleStorage", function () {
  let SimpleStorageFactory;
  let simpleStorage;

  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  });

  it("Should favourite number begin with 0", async function () {
    const expectedValue = "0";
    const currentValue = await simpleStorage.retrieve();

    // assert
    assert.equal(currentValue.toString(), expectedValue);

    // expect
    // expect(currentValue.toString()).to.equal(expectedValue);
  });

  it("Should update when we call store", async function () {
    const expectedValue = "7";
    const transectionResponse = await simpleStorage.store(expectedValue);
    await transectionResponse.wait();

    const currentValue = await simpleStorage.retrieve();

    // assert
    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should pure function return 4", async function () {
    const expectedValue = "4";
    const currentValue = await simpleStorage.add();

    // assert
    assert.equal(currentValue.toString(), expectedValue);
    // expect
    // expect(expectedValue).to.equal(currentValue.toString());
  });
});
