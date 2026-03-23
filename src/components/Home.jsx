import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <div className="text-center mt-5 container-fluid">
            <Navbar/>
            <div className="row ">
                <div className="col-md-6">
                    <h1 className="text-success display-3 ">Welcome to Agrimarket</h1>
                    <div className=" mt-4">
                        <Link to="/products" className="btn btn-success">See Products</Link>
                        <Link to="/services" className="btn btn-outline-dark ">Our Services</Link>
                    </div>
                </div>
                <div className="col-md-6 mt-5 ">
                    <img
                        src="/images/mkulima.jpg"
                        alt="Farming"
                        className="img-fluid rounded  h-100"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;