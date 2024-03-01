import React from 'react'
import AdminSidebar from '../../components/AdminCommonlayout/AdminSidebar'

const CommonAdminLayout = ({children}) => {
  return (
   <>
    <AdminSidebar children={children}/>
   </>
  )
}

export default CommonAdminLayout