import { Link } from '@mui/material'
import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'


const Login = () => {
    const token = "vZvNciqmBWGJi6nB"
    const [ini, setIni] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (values, { resetForm }) => {

        axios.post("https://generateapi.techsnack.online/auth/login", values, {
            headers: {
                Authorization: token
            }
        }).then(() => {
            console.log(values);
            localStorage.setItem("currentUser", JSON.stringify(values.email))
            alert("user login successfully")
            resetForm()
            setIni({
                email: "",
                password: ""
            })
            window.location.href = "/dashboard"
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
                        <label htmlFor="" className="form-label">Email</label>
                        <Field name="email" placeholder="Enter Email" className="form-control"></Field>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="" className="form-label">Password</label>
                        <Field name="password" type="password" placeholder="Enter Password" className="form-control"></Field>
                    </div>
                    <button className="btn btn-primary w-100" type='submit'>Login</button>
                    <Link href="/signup">Create new account !</Link>
                </Form>
            </Formik>
        </div>
    )
}

export default Login
