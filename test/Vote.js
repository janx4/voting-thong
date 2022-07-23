const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("vote", function(){
  let Voting, voting, owner, addr1, addr2

  beforeEach(async ()=>{
      Voting = await ethers.getContractFactory('voting')
      voting = await Voting.deploy();
      await voting.deployed();

      [owner, addr1, addr2, _] = await ethers.getSigners()
  })
  
  it("all vote length should be at zero", async function(){
    const length = await voting.getLength();
    expect(length).to.equal(0)
  })

  it("should create a vote", async function(){
    title = "red velvet";
    inside_vote = ["Irene", "Seulgi", "Wendy", "Joy", "Yeri"]

    const createVoteTx = await voting.createVote(title, inside_vote)
    const length = await voting.getLength();
    const vote = await voting.getVote(length-1);
    
    expect(length).to.equal(1)
    expect(vote.title).to.equal("red velvet")
  })

  it("should vote", async function(){
    title = "red velvet";
    inside_vote = ["Irene", "Seulgi", "Wendy", "Joy", "Yeri"]

    const createVoteTx = await voting.createVote(title, inside_vote)
    if(createVoteTx){
      const voteTx = await voting.vote(0,1) // vote for seulgi
      const length = await voting.getLength();
      const vote = await voting.getVote(length-1);
  
      expect(vote.numberOfVotes[1]).to.equal(1)
  
      expect(
          voting.vote(0,0)
      ).to.be.revertedWith("this account has already voted to this vote")
    }
  })
})