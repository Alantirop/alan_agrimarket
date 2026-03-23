import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const SignIn = () => {
    let [email, updateEmail] = useState("");
    let [password, updatePassword] = useState("");
    let [loading, setLoading] = useState("");
    let [success, setSuccess] = useState("");
    let [error, setError] = useState("");

    // create variable for use navigate
    let navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading("please wait...");


        // try send data to the server
        try {
            // create the form data
            const user_data = new FormData()
            user_data.append("email", email);
            user_data.append("password", password);

            const response = await axios.post("https://alantirop.alwaysdata.net/api/signin", user_data);
            console.log(response);
            if (response.status === 200) {
                if (response.data.user) {
                    localStorage.setItem("user", JSON.stringify(response.data.user))
                    setSuccess(response.data.message);
                    navigate("/")

                }

            }

        } catch (error) {
            // console.log(error)
            setLoading("");
            setError(error.message);


        }

    }
    return (
        <div>
            <div className="row justify-content-center mt-4 container-fluid">
                <Navbar />
                <div className="col-md-6 card shadow p-4">
                    <h2>sign in</h2>
                    <h5 className="text-warning">{loading}</h5>
                    <h5 className="text-danger">{error}</h5>
                    <h5 className="text-success">{success}</h5>
                    <form onSubmit={handleSubmit}>
                        <input type="text"
                            className="form-control"
                            placeholder="enter email"
                            required
                            onChange={(e) => { updateEmail(e.target.value) }}
                            value={email}
                        />
                        <br />

                        <input type="password"
                            className="form-control"
                            placeholder="password"
                            required
                            onChange={(e) => { updatePassword(e.target.value) }}
                            value={password}
                        />
                        <br />

                        <button className="btn btn-dark" >sign In</button>
                        <br />

                        <Link to="/signup">Don't have an account? sign up</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;