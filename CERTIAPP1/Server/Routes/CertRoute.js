import { Router } from "express";
import {ethers} from 'ethers';
import ABI from './Certi.json' with {type:"json"};
import address from './deployed_addresses.json' with {type:"json"};
import dotenv from 'dotenv';

dotenv.config();

const certRoute=Router();

//for Hardhat network
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/")
const signer= await provider.getSigner();
console.log(signer.address);


//for Sepolia network
// const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/KK9YbXJ8Gos45Mo2ki-qtWU1mfhvYytQ")
// const signer = new ethers.Wallet(process.env.PRIVATE_KEY,provider)
// console.log(signer.address);

const certInstance= new ethers.Contract(address['CertiModule#Certi'],ABI.abi,signer)//instance of contract from hardhat network


certRoute.get('/',(req,res)=>{
    console.log('Hi');

//  res.send("Hello World")

})


certRoute.post('/issueCertificate',async (req,res)=>{

    const{id,name,course,grade,date}=req.body;
    console.log(typeof id);
    

    const tnsRecipt= await certInstance.issueCertificate(id,name,course,grade,date);
    console.log(tnsRecipt);
    if(tnsRecipt){
        res.send(tnsRecipt.hash)
    }else{
        res.status(400).json({message:"Your transaction failed"})
    }
    
})


certRoute.get('/getCertificate/:id',async (req,res)=>{

    const {id}=req.params;

    console.log(typeof id);
    
    const Certificate=await certInstance.Certificates(id)

    if(Certificate){

        res.send(Certificate)

    }else{
        res.status(404).json({message:"No Certificate found"})
    }

})

export {certRoute}