
import { useState } from 'react';
import {ethers} from 'ethers'
import ABI from'./assets/Certi.json';
import address from './assets/deployed_addresses.json'

function App() {

  const[formData,setformData]=useState({
    id:0,
    cname:'',
    course:'',
    grade:'',
    date:''
  });

  const [output,setOutput]=useState();

  async function connectToMetamask(){
    const provider= new ethers.BrowserProvider(window.ethereum);//instance of our provider from frontend
    const signer= await provider.getSigner();//to identify which account from the provider, the current opened account in the particular network
    // console.log(signer.address);
    alert(`${signer.address} is successfully logged in`)
    
  }

  function handleChange(event){
    event.preventDefault();
    const{name,value} = event.target;
    // console.log(name);
    setformData((preState)=>({...preState,[name]:value}))
    // console.log(formData);
  }


  async function handleSubmit(event){

    event.preventDefault();
    const provider= new ethers.BrowserProvider(window.ethereum);//instance of our provider
    const signer= await provider.getSigner();
    const cabi = ABI.abi;
    const cadress = address['CertiModule#Certi']
    // console.log(cadress);
    const certiInstance = new ethers.Contract(cadress,cabi,signer);//instance of the smart contract
    // console.log(certiInstance);
    const tsnRecipt= await certiInstance.issueCertificate(formData.id,
      formData.cname,
      formData.course,
      formData.grade,
      formData.date)
    // console.log(tsnRecipt);
    
  
  }

  async function getCertificate(){

    const id=document.getElementById('ID').value;
    // console.log(id);
    
    const provider= new ethers.BrowserProvider(window.ethereum);//instance of our provider
    const signer= await provider.getSigner();
    const cabi = ABI.abi;
    const cadress = address['CertiModule#Certi']

    const certiInstance = new ethers.Contract(cadress,cabi,signer);

   const tsnValue = await certiInstance.Certificates(id)
  //  console.log(tsnValue[0]);
   
   setOutput(`Name: ${tsnValue[0]}, Course: ${tsnValue[1]}, Grade: ${tsnValue[2]}, Date: ${tsnValue[3]}`)
  }


  

  return (
    <>
    <div className=''>
     <div className=''>
      <button className='' onClick={connectToMetamask}>Connect to MetaMask</button>
     </div>
     <div className=''>
      <form action="" onSubmit={handleSubmit} className='' >
        <div>
          <label htmlFor="">ID:</label>
          <input type="text" id='id' name='id' value={formData.id} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="">Name:</label>
          <input type="text" id='cname' name='cname' value={formData.cname} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="">Course:</label>
          <input type="text" id='course' name='course' value={formData.course} onChange={handleChange} />
        </div>
       
        <div>
          <label htmlFor="">Grade:</label>
          <input type="text" id='grade' name='grade' value={formData.grade} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="">Date:</label>
          <input type="date" id='date' name='date' value={formData.date} onChange={handleChange}/>
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
      <div>
          <input type="text" id='ID' placeholder='Enter Certificate' />
          <button onClick={getCertificate} >Get Certificate</button>
        </div>
        <p>{output}</p>
     </div>
     </div>
    </>
  )
}

export default App
