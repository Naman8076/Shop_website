import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminProtectedRoutes = ({Components}) => {
    const navigate = useNavigate();

    const checkuservalid = ()=>{
        let login = localStorage.getItem("admintoken");

        if(!login){
            navigate("/admin/login");
        }
    }

    useEffect(()=>{
        checkuservalid()
    },[])
  return (
    <div>
    <Components />
    </div>
  )
}

export default AdminProtectedRoutes