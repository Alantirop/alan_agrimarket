import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AddServices = () => {
    const navigate = useNavigate();
    let [service_provider, setServiceProvider] = useState("");
    let [service_description, setServiceDescription] = useState("");
    let [service_cost, setServiceCost] = useState("");
    let [service_category, setServiceCategory] = useState("");
    let [service_image, setServiceImage] = useState("");

    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // notify the user to wait
        setError("");
        setSuccess("");
        setLoading("please wait...");

        try {
            // box/envelope to put service data in for transmission
            const service_data = new FormData();

            // add service information needed
            service_data.append("service_provider", service_provider);
            service_data.append("service_description", service_description);
            service_data.append("service_cost", service_cost);
            service_data.append("service_category", service_category);
            service_data.append("service_image", service_image);

            // use axios(messenger) to send the data to the server
            const response = await axios.post("https://alantirop.alwaysdata.net/api/add_service", service_data);

            if (response.status === 200) {
                setLoading("");
                setSuccess(response.data.message || "Service added successfully!");

                // clear the form 
                setServiceProvider("");
                setServiceDescription("");
                setServiceCost("");
                setServiceCategory("");
                setServiceImage("");

                // redirect to services page
                setTimeout(() => {
                    navigate("/services")
                }, 2000)
            }
        } catch (error) {
            setError(error.message);
            setLoading("");
        }
    };

    return (
        <div className="row justify-content-center mt-4 container-fluid">
            <Navbar />
            <div className="col-md-6 card shadow p-4">
                <h2>Add Service</h2>

                <h5 className="text-danger">{error}</h5>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-success">{success}</h5>

                <form onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="service provider"
                        className="form-control"
                        required
                        onChange={(e) => { setServiceProvider(e.target.value) }}
                        value={service_provider}
                    /> <br />

                    <textarea
                        placeholder="description"
                        className="form-control"
                        rows="7"
                        required
                        onChange={(e) => { setServiceDescription(e.target.value) }}
                        value={service_description}
                    ></textarea> <br />

                    <input type="number"
                        placeholder="service cost"
                        className="form-control"
                        required
                        onChange={(e) => { setServiceCost(e.target.value) }}
                        value={service_cost}
                    /> <br />

                    <label htmlFor="" className="form-label">service category</label>
                    <select
                        className="form-select"
                        required
                        onChange={(e) => { setServiceCategory(e.target.value) }}
                        value={service_category}
                    >
                        <option value="">select category</option>
                        <option value="Gardening">Gardening</option>
                        <option value="Irrigation">Irrigation</option>
                        <option value="Soil Testing">Soil Testing</option>
                        <option value="Pest Control">Pest Control</option>
                        <option value="Farm Consultation">Farm Consultation</option>
                        <option value="Farm Tilling">Farm Tilling</option>
                        <option value="Greenhouse services">Greenhouse services</option>
                        <option value="Other">Other</option>
                    </select> <br />

                    <label htmlFor="" className="form-label">service image</label>
                    <input type="file"
                        className="form-control"
                        accept="image/*"
                        required
                        onChange={(e) => { setServiceImage(e.target.files[0]) }}
                    /> <br />

                    <button className="btn btn-dark">Add service</button>
                </form>
            </div>
        </div>
    );
}

export default AddServices;
