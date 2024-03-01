import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AdminAddCategory } from '../../redux/slice/productSlice/ProductSlice';

const AddCategory = () => {
  // admin categor
  const [inputvalue,setInputValue]=useState({
    categoryname:"",
    description:"",
  })

  const dispatch=useDispatch();
  
  const handleChange=(e)=>{
const {name,value}=e.target;
setInputValue({
  ...inputvalue,
  [name]:value
})
  }

  const handleAddCategory=(e)=>{
    e.preventDefault();

    const {categoryname,description}=inputvalue;
    if(categoryname==""){
      toast.error("category name is required")
    } else if(description==""){
      toast.error("description is requirrd")
    }else{
   dispatch(AdminAddCategory(inputvalue)).then((res)=>{
    setInputValue({...inputvalue,categoryname:"",description:""})
   }).catch((error)=>{
    
   })
    }
  }
  return (
    <>
       <div className="container">
        <section>
          <div className="form_data">
            <div className="form_heading">
              <h1>Add Category</h1>
            </div>

            <form> 
              <div className="form_input">
              <label htmlFor="">Category Name</label>
                <input
                  type="text"
                  name="categoryname"
                  onChange={handleChange}
                  value={inputvalue.categoryname}
               
                  id=""
                />
              </div>
              <Form.Group
                className="mb-3 mt-2"
                controlId="exampleForm.ControlTextarea1"
              >
              <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  onChange={handleChange}
                  value={inputvalue.description}
                  
                  rows={3}
                />
              </Form.Group>

              <button className="btn" onClick={handleAddCategory}>Submit</button>
            </form>
          </div>
        </section>
      </div>   
    </>
  )
}

export default AddCategory