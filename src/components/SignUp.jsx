import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const SignUp = () => {
    const navigate = useNavigate();
    let [username, updateUsername] = useState("");
    let [email, updateEmail] = useState("");
    let [phone, updatePhone] = useState("");
    let [password, updatePassword] = useState("");
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        // prevent default behaviour
        e.preventDefault();


        // notify user to wait
        setError("");
        setSuccess("");
        setLoading("Submitting data! please wait...")

        // confirm user input
        console.log(username, email, phone, password);

        // try send data to server
        try {
            // create form data to server
            const user_data = new FormData()
            user_data.append("username", username)
            user_data.append("email", email)
            user_data.append("phone", phone)
            user_data.append("password", password)

            // use axios to send data to the server
            const response = await axios.post("https://alantirop.alwaysdata.net/api/signup", user_data);
            console.log(response);
            if (response.status === 200) {
                setSuccess(response.data.message);
                setLoading("");

                // redirect to sign in
                setTimeout(() => {
                    navigate("/signin")
                }, 2000)
            }

        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading("");
            updateUsername("");
            updateEmail("");
            updatePhone("");
            updatePassword("");


        }
    };

    return (
        <div className="row justify-content-center mt-4 container-fluid">
            <Navbar />
            <div className="col-md-6 card shadow p-4">
                <h2>Sign up</h2>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="username"
                        className="form-control"
                        required
                        onChange={
                            (e) => {
                                updateUsername(e.target.value);
                            }}
                        value={username}
                    /> <br />


                    <input type="email"
                        placeholder="email"
                        className="form-control"
                        required
                        onChange={
                            (e) => {
                                updateEmail(e.target.value);
                            }}
                        value={email}
                    /><br />

                    <input type="tel"
                        placeholder="telephone"
                        className="form-control"
                        required
                        onChange={
                            (e) => {
                                updatePhone(e.target.value);
                            }}
                        value={phone}
                    /><br />


                    <input type="password"
                        placeholder="password"
                        className="form-control"
                        required
                        onChange={(e) => {
                            updatePassword(e.target.value);
                        }}
                        value={password}
                    /><br />

                    <button className="btn btn-dark ">
                        sign up
                    </button><br />
                    <Link to="/signin">Already have an account? Sign in</Link>
                </form>
            </div>
        </div>
    );
}

export default SignUp;