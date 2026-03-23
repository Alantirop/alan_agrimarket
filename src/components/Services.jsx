import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
// import { useNavigate } from "react-router-dom";

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState("Loading services...");
    const [error, setError] = useState("");
    // const navigate = useNavigate();

    const img_url = "https://alantirop.alwaysdata.net/static/images/";
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("https://alantirop.alwaysdata.net/api/get_services");
                if (response.status === 200) {
                    setServices(response.data);
                    setLoading("");
                }
            } catch (err) {
                setError(err.message);
                setLoading("");
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="container">
            
            <div className="row">
                <Navbar/>
                <h3 className="mt-4 mb-4">Available services</h3>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>

                {/* map.loop over the services array to access one at a time */}

                {services.map((service) => (
                    <div className="col-md-4 mb-4">
                        <div className="card shadow h-100">
                            <img src={img_url + service.service_image} alt="" className="product_img mt-4" />

                            <div className="card-body">
                                <h5 className="card-title">{service.service_category}</h5>
                                <p className="card-text text-muted small">{service.service_description}</p>
                                <p className="text-warning fw-bold">KES: {service.service_cost}</p>
                                <p className="text-muted small"><strong>Provider:</strong> {service.service_provider}</p>
                                <button className="btn btn-dark "
                                    // onClick={() => navigate("/makepayment", { state: { service } })}
                                >Pay Service</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;