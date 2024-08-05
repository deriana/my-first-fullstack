import { Link, useNavigate } from "react-router-dom"
import Validation from "./signUpValidation";
import { useState } from "react";
import axios from "axios";

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();  
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
            .then(res =>{
                navigate('/')
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2>Sign Up</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name"><b>Name</b></label>
              <input onChange={handleInput} type="text" placeholder="Enter Your Name" className="form-control rounded-0" name="name" />
              {errors.name && <span className="text-danger">{errors.name}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="email"><b>Email</b></label>
              <input onChange={handleInput} type="email" placeholder="Enter Your Email" className="form-control rounded-0" name="email" />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="password"><b>Password</b></label>
              <input onChange={handleInput} type="password" placeholder="Enter Your Password" className="form-control rounded-0" name="password"/>
              {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>
            <button type="submit" className="btn btn-success border w-100 rounded-0">
              <b>Sign Up</b>
            </button>
            <p>You are agreeing to our terms and policies</p>
            <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
              <b>Login Page</b>
            </Link>
          </form>
        </div>
      </div>    )
}

export default Signup