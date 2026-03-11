import { Field } from 'formik'
import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import axios from 'axios'
const AddCategory = () => {
    const token = "vZvNciqmBWGJi6nB"
    const [ini, setIni] = useState({
        category: ""
    })
    const handleCategory = (values, { resetForm }) => {
        axios.post("https://generateapi.techsnack.online/api/categories", values, {
            headers: {
                Authorization: token
            }
        })
            .then(() => {
                alert("category added successfully")
                resetForm()
            }).catch((err) => {
                console.log(err);
            })
    }
    return (
        <div>
            <h1 className='p-3'>Add Category</h1>
            <Formik
                initialValues={ini}
                onSubmit={handleCategory}
            >
                <Form className=' m-auto p-3 rounded shadow-lg'>
                    <div className="form-group mb-2">

                        <Field name="category" placeholder="Enter category name" className="form-control"></Field>
                    </div>
                    <button type="submit" className='btn btn-primary w-100'>Add Category</button>
                </Form>
            </Formik>
        </div>
    )
}

export default AddCategory
