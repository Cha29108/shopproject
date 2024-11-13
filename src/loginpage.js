import React,{useState,useContext} from "react";
import axios from 'axios';
import Mainpage from './mainpage.js';
function Loginpage(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verified,setverified]=useState(false);
  async function checklogin()
  { 
    try{
        const response = await axios.post('http://127.0.0.1:3000/verify', {
            username,
            password,
          });
    
    
    const k=JSON.parse(response.data);
   ;

    if(k.success)
    {
    setverified(true);
    localStorage.setItem('authtoken1',k.token);
    localStorage.setItem('userid',k.userid);
    console.log(k.token);
    }
    else{
      alert('opoops');
    }
  }catch(error)
  {
      alert('error  is :'+error);
  }
  

  }
  
  
  function handlesubmit(event)
  {
    event.preventDefault();
    checklogin();
  }
  if(!verified)
  {
  return(
    <div className="login-form-container">
     <div className="logo1">
                        <img src="https://cdn.dribbble.com/userupload/6812555/file/original-ed6d53503f7b84b5e70571cee8272a0b.jpg?resize=400x300&vertical=center" alt="Logo" width="100" /> {/* Replace with your logo */}
                    </div>
    <form onSubmit={handlesubmit} className="login-form">
        <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => { setUsername(e.target.value); }} 
            className="login-input" 
        />
        <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => { setPassword(e.target.value); }} 
            className="login-input" 
        />
        <button type="submit" className="login-button">Submit</button>
    </form>
</div>

  );
}
else{
  return <Mainpage/>
}
}
export default Loginpage;
