// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

enum Role {
    Manager,
    Approver,
    Vendor
}

struct User {
    address walletAddress;
    Role role;
    string name; // Optional: Add user's name for better identification
}

contract CampaignFactory {
    // Mapping of deployed campaigns
    address payable[] public deployedCampaigns;
    // Mapping of users and their details
    mapping(address => User) public users;
     //     ["0xbc389"] => users.map()
    // -> [1] => {"ds", 1, "0xgfgfrtg"} 
    // -> [2] => {"ps", 1, "0xghgggggfrtg"}

    //   constructor() public {} // Simple constructor

    // Function to add a user
    function addUser(
        string memory _name,
        address _walletAddress,
        Role _role
    ) public {
        require(
            users[_walletAddress].walletAddress == address(0),
            "User already exists"
        );
        require(
            _role == Role.Manager ||
                _role == Role.Approver ||
                _role == Role.Vendor,
            "Invalid role"
        );

        users[_walletAddress] = User(_walletAddress, _role, _name);
    }
//   mapping ( address - > bool )  useExists ; 
//             login - > [ grgf] 
    // Function to create a campaign (restricted to Manager)
    function createCampaign(uint minimum) public onlyRole(Role.Manager) {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(payable(newCampaign));
    }

    // Function to get deployed campaigns
    function getDeployedCampaigns()
        public
        view
        returns (address payable[] memory)
    {
        return deployedCampaigns;
    }

    // Verification modifier (any registered user can call functions with this)
    modifier onlyRegistered() {
        require(
            users[msg.sender].walletAddress != address(0),
            "User not registered"
        );
        _;
    }

    // Verification modifier (specific role required)
    modifier onlyRole(Role _role) {
        require(users[msg.sender].role == _role, "Unauthorized action");
        _;
    }

    // ... Other functions for CampaignFactory requiring specific roles ...
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory description,
        uint value,
        address recipient
    ) public restricted {
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (uint, uint, uint, uint, address)
    {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}