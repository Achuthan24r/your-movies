import { useState } from "react";
import API from "../api/axios";


function Register(){

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:""
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async(e) => {

        e.preventDefault();

        try{

            const res = await API.post(
                "/auth/register",
                formData
            );

            console.log(res.data);

            alert("Registration Successful");

        }
        catch(error){

            console.log(error.response?.data);

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }

    };


    return(

        <div>

            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />


                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />


                <button type="submit">
                    Register
                </button>

            </form>

        </div>

    )

}


export default Register;