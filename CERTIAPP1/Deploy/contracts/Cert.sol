// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract Certi{

    struct Cert{

        string name;
        string course;
        string grade;
        string date;
    }

    address admin;

    constructor(){

        admin=msg.sender;
        
    }

    modifier onlyAdmin (){
        require(msg.sender==admin,"Unauthorized access");
        _;
    }

    event issued(string,uint256,string);

    mapping (uint256=>Cert) public  Certificates;

    function issueCertificate(uint256 _id, string memory _name, string memory _course, string memory _grade, string memory _date) public onlyAdmin {
        Certificates[_id]=Cert(_name,_course,_grade,_date);
        
        emit issued(_course, _id, _grade);
    }


}