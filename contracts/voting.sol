pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract voting{

    struct Vote{
        string title;
        address creator;
        string[] names;
        uint[] numberOfVotes;
        bool done;
    }

    Vote[] all_votes;
    mapping(address => uint[]) voted;

    constructor(string memory _title, string[] memory _elements) {
        Vote memory v;

        v.title = _title;
        v.creator = msg.sender;
        v.done = false;
        v.names = _elements;
        v.numberOfVotes = new uint[](_elements.length);

        all_votes.push(v);
    }

    function createVote(string calldata _title , string[] calldata _elements) public {
        Vote memory v;
        
        v.title = _title;
        v.creator = msg.sender;
        v.done = false;
        v.names = _elements;
        v.numberOfVotes = new uint[](_elements.length);


        console.log('title: %s',v.title);
        console.log('creator: %s',v.creator);
        console.log('done: %s',v.done);
        for(uint i=0; i < v.names.length; i++)
            console.log('names: %s',v.names[i]);

        all_votes.push(v);
    }

    function vote(uint _key, uint _voteKey) public {
        Vote storage v = all_votes[_key];
        require(!v.done, "this vote is already done");

        bool already_voted = false;
        for(uint i; i < voted[msg.sender].length; i++)
            if(_key == voted[msg.sender][i])
                already_voted = true;

        require(!already_voted, "this account has already voted to this vote");

        console.log('voting inside %s ...', v.title); 
        console.log('voting for %s', v.names[_voteKey]);

        v.numberOfVotes[_voteKey]++;
        voted[msg.sender].push(_key);

        console.log('%s has %s votes now !', v.names[_voteKey], v.numberOfVotes[_voteKey]);
    }

    function getAllVotes() public view returns(Vote[] memory){
        return all_votes;
    }

    function getLength() public view returns (uint){
        // console.log('length : %s', all_votes.length);
        return all_votes.length;
    }

    function getVote(uint _idx) public view returns(Vote memory){
        // console.log('title: %s', all_votes[_idx].title);
        return all_votes[_idx];
    }
}