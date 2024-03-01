import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { forgotpassword } from '../../redux/slice/userAuthSlice/userAuthSlice';
const ForgotPassword = () => {
  const [email,setEmail]=useState("");
  const dispatch=useDispatch();
  const handleChange=(e)=>{
    setEmail(e.target.value);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if (email == "") {
      toast.error("Email is Required!");
    } else if (!email.includes("@")) {
      toast.error("Enter Your Valid Email !");
    }else{
      const data={
        email:email
      }
      dispatch(forgotpassword(data)).then((res)=>{
          if(res?.payload){
            setEmail("");
          }
      }).catch((error)=>{
            console.log("error",error);
      })
    }
  }
  return (
   <>
       <section style={{marginBottom:"10px"}}>
      <div className="form_data">
        <div className="form_heading">
          <h1>Forgot Password</h1>
        </div>
        <form>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id=""
              value={email}
              onChange={handleChange}
              placeholder="Enter your Email"
            />
          </div>

          <button className="btn" onClick={handleSubmit}>Submit</button>

        </form>
      </div>
    </section>
   </>
  )
}

export default ForgotPassword