import { Link } from '@mui/material'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'

const Signup = ({ users, setUsers }) => {
    const token = "vZvNciqmBWGJi6nB"
    const [ini, setIni] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleSubmit = (values, { resetForm }) => {

        axios.post("https://generateapi.techsnack.online/auth/signUp", values, {
            headers: {
                Authorization: token
            }
        }).then(() => {
            console.log(values);

            alert("user signed up successfully")
            resetForm()
        }).catch((err) => {
            console.log(err);

        })
    }
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <Formik
                initialValues={ini}
                onSubmit={handleSubmit}
            >
                <Form className='w-50 m-auto p-3 shadow-lg rounded'>
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">Username</label>
                        <Field name="name" placeholder="Enter Username" className="form-control"></Field>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">Email</label>
                        <Field name="email" placeholder="Enter Email" className="form-control"></Field>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">Password</label>
                        <Field name="password" type="password" placeholder="Enter Password" className="form-control"></Field>
                    </div>
                    <button className="btn btn-primary w-100" type='submit'>Sign up </button>
                    <Link href="/">already have an account</Link>
                </Form>
            </Formik>
        </div>
    )
}

export default Signup
