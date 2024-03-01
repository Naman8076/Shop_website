import React,{useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { forgotpasswordvalid, resetpasswordfunc } from '../../redux/slice/userAuthSlice/userAuthSlice';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [passShow, setPassShow] = useState(false);
    const [confirmpassShow, setConfirmPassShow] = useState(false);

    const [password,setPassword] = useState("");
    const [confirmpassword,setconfirmPassword] = useState("");
  
    const {id,token}=useParams();
    const dispatch=useDispatch();
    const navigate=useNavigate();
     
    const userValid=()=>{
      const data={
        id,
        token
      }
      dispatch(forgotpasswordvalid(data)).then((res)=>{
          if(res.payload){
          console.log("user valid")
          }else{
            navigate("*");
          }
      }).catch((err)=>{
        navigate("*");
      })
    }
    useEffect(()=>{
        userValid();
    },[])


    const handleSubmit = (e)=>{
      e.preventDefault();

      if(password == ""){
          toast.error("password is Required!")
      }else if(confirmpassword == ""){
          toast.error("confirmpassword is Required!")
      }else if(password !== confirmpassword){
          toast.error("password and confirmpassword is not match!")
      }else{
          const passworddata = {password};

          const data = {
              id,
              token,
              passworddata
          }

          dispatch(resetpasswordfunc(data)).then((res)=>{
              if(res?.payload){
                  navigate("/login")
              }else{
                  navigate("*")
              }
          }).catch((error)=>{
              navigate("*")
          })
      }
  }

  return (
    <>
             <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Enter New Password</h1>
        </div>
        <form>
        <div className="form_input">
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id=""
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Enter your Password"
                />
                <div
                  onClick={() => setPassShow(!passShow)}
                  className="showpass"
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <div className="form_input">
              <div className="two">
                <input
                  type={!confirmpassShow ? "password" : "text"}
                  name="confirmpassword"
                  id=""
                  value={confirmpassword}
                  onChange={(e)=>setconfirmPassword(e.target.value)}
                  placeholder="Enter your confirm Password"
                />
                <div
                  onClick={() => setConfirmPassShow(!confirmpassShow)}
                  className="showpass"
                >
                  {!confirmpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

          <button className="btn" onClick={handleSubmit}>update your password</button>

        </form>
      </div>
    </section>
    </>
  )
}

export default ResetPassword