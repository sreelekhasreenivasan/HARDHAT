const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');

const {expect} = require('chai');
const {ethers}=require('hardhat');

describe ('Certi',function(){
    async function deployContract(){
        const [admin,other]= await ethers.getSigners();
        const Cert= await ethers.getContractFactory('Certi');
        const cert=await Cert.deploy();
        return{cert,admin,other}

    }
    it("Check who deployed",async function(){
        
       const{cert,admin}=await loadFixture(deployContract);
    //    console.log(cert);
       expect(cert.deploymentTransaction().from).to.equals(admin.address);
       
    })
    it("Able to issue and read certificate",async function(){
        const{cert,admin}=await loadFixture(deployContract);
        await cert.issueCertificate(1,"Sree","CED","A","23/4/2023");
        const Certi=await cert.Certificates(1);
        // console.log(Certi);
        expect(Certi[0]).to.equals("Sree");
        expect(Certi[1]).to.equals("CED");
        expect(Certi[2]).to.equals("A");
        expect(Certi[3]).to.equals("23/4/2023");
        
    })
    it("Only Admin issue the certificate", async function(){
        
        const{cert,other}=await loadFixture(deployContract);
        await expect(cert.connect(other).issueCertificate(2,"Pou","CED","O","22/04/2023")).to.be.revertedWith("Unauthorized access");


    })
})