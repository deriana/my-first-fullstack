import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Validation from "./loginValidation";
import axios from "axios";

const Signup = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))  
    }

    const handleSubmit = (event) => {
        event.preventDefault();  
        setErrors(Validation(values));
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
            .then(res =>{
                if(res.data === "Success") {
                    navigate('/login')
                } else {
                    alert("Error creating account")
                }
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Signup</h2>
                <form action="" onSubmit={handleSubmit}> 
                    <div className="mb-3">
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="email" placeholder="Enter Your Email" name="email" className="form-control rounded-0" onChange={handleInput} />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" placeholder="Enter Your Password" name="password" className="form-control rounded-0" onChange={handleInput}/>
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-success border w-100 rounded-0">
                        <b>Signup</b>
                    </button>
                    <p>You are agreeing to our terms and policies</p>
                    <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        <b>Login</b>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Signup;