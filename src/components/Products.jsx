import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState("Loading products...");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const img_url = "https://alantirop.alwaysdata.net/static/images/";



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://alantirop.alwaysdata.net/api/get_products");
                if (response.status === 200) {
                    setProducts(response.data);
                    setLoading("");
                }
            } catch (err) {
                setError(err.message);
                setLoading("");
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container">
            <div className="row">
                <Navbar/>
                <h3 className="mt-4 mb-4">Available Products</h3>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>

                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product.product_id}>
                        <div className="card shadow h-100">
                            <img src={img_url + product.product_image} alt="" className="product_img mt-4" />

                            <div className="card-body">
                                <h5 className="card-title">{product.product_name}</h5>
                                <p className=" text-muted small">{product.product_description}</p>
                                <p className="text-warning ">KES: {product.product_cost}</p>
                                <p className="text-muted small"><strong>Category:</strong> {product.product_category}</p>
                                <button 
                                    className="btn btn-dark "
                                    onClick={() => navigate("/makepayment", { state: { product } })}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
