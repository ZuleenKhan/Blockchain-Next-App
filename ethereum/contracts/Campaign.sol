
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
contract CampaignFactory {
    address payable[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(payable(newCampaign));
    }

    function getDeployedCampaigns()
        public
        view
        returns (address payable[] memory)
    {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount; // keep track of yes votes for request
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    uint256[] private amount;
    address public manager;
    uint256 public minimumContribution;
    address[] private apps;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    mapping(address => bool) public approvers;
    uint256 public approverCount;

    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        amount.push(msg.value);
        approverCount++;
        apps.push(msg.sender);
    }

    function createRequest(
        string memory desc,
        uint256 val,
        address payable recep
    ) public payable restricted {
        // require(approvers[msg.sender]) ;
        Request storage newRequest = requests.push();

        newRequest.description = desc;
        newRequest.value = val;
        newRequest.recipient = recep;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }
    function approveRequest(uint256 index) public {
        require(approvers[msg.sender]);
        require(!requests[index].approvals[msg.sender]); // check whether person has voted already or not , if not then allow him to vote
        requests[index].approvalCount++;
        requests[index].approvals[msg.sender] = true;
    }
    function finalizeRequest(uint256 _index) public restricted {
        require(requests[_index].approvalCount > (approverCount / 2));
        require(!requests[_index].complete);
        requests[_index].complete = true;
        payable(requests[_index].recipient).transfer(requests[_index].value);
    }
    function cancelRequest() public payable restricted {
        //require(!approvers[msg.sender]) ;
        for (uint i = 0; i < amount.length; i++) {
            payable(apps[i]).transfer(amount[i]);
        }
    }
    function getSummary()
        public
        view
        returns (uint256, uint256, uint256, uint256, address)
    {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approverCount,
            manager
        );
    }
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}
