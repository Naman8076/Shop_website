import React, { useState } from "react";
import "./commonstyle.scss";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userlogin } from "../../redux/slice/userAuthSlice/userAuthSlice";
const Login = () => {
    const [passShow,setPassShow]=useState(false);
    const dispath=useDispatch();
    const navigate=useNavigate();
    const [inputvalue, setInputValue] = useState({
      email: "",
      password: "",   
    });
   const handleChange = (e) => {
      const { name, value } = e.target;
      setInputValue({ ...inputvalue, [name]: value });
    };

    const handleSubmit=(e)=>{
      e.preventDefault();
const {email,password}=inputvalue;
      if (email == "") {
        toast.error("Email is Required!");
      } else if (!email.includes("@")) {
        toast.error("Enter Your Valid Email !");
      } else if (password == "") {
        toast.error("password is Required!");
      }else {
          dispath(userlogin(inputvalue)).then((res)=>{
                 if(res?.payload){
                  navigate("/")
                  setInputValue({...inputvalue,email:"",password:""})
                 }
          }).catch((err)=>{
          console.log("error",err)
          })
      }
    }
  return (
 <>
       <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Sign In</h1>
        </div>
        <form>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              id=""
              value={inputvalue.email}
              placeholder="Enter your Email"
            />
          </div>
          <div className="form_input">
            <label htmlFor="password">Password</label>
            <div className="two">
              <input
                type={!passShow ?"password":"text"}
                name="password"
                value={inputvalue.password}
                onChange={handleChange}
                id=""
                placeholder="Enter your Password"
              />
              <div onClick={()=>setPassShow(!passShow)} className="showpass">
              {!passShow ?"Show":"Hide"}
              </div>
            </div>
          </div>
          <button className="btn" onClick={handleSubmit}>Login</button>
          <p>Dont have an account, <NavLink to='/register'>Sign Up</NavLink></p>
          <p style={{color:"black",fontWeight:"bold"}}>Forgot password <NavLink to='/forgotpassword'>Click here </NavLink></p>
        </form>
      </div>
    </section>
 </>
  );
};

export default Login;
