import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AddProducts = () => {
    const navigate = useNavigate();
    let [product_name, setProductName] = useState("");
    let [product_description, setProductDescription] = useState("");
    let [product_cost, setProductCost] = useState("");
    let [product_category, setProductCategory] = useState("");
    let [product_image, setProductImage] = useState("");

    let [loading, setLoading] = useState("")
    let [error, setError] = useState("")
    let [success, setSuccess] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        // notify the user to wait
        setError("");
        setSuccess("");
        setLoading("please wait...")

        try {
            // box/envelope to put product data in for transmission
            const product_data = new FormData()
            // add end product information needed to the box

            product_data.append("product_name", product_name);
            product_data.append("product_description", product_description);
            product_data.append("product_cost", product_cost);
            product_data.append("product_category", product_category);
            product_data.append("product_image", product_image);

            // use axios(messnger) to send the data to the server
            const response = await axios.post("https://alantirop.alwaysdata.net/api/add_product", product_data);
            console.log(response);
            if (response.status === 200) {
                setLoading("");
                setSuccess(response.data.message)

                // clear the form 
                setLoading("");
                setProductName("");
                setProductDescription("");
                setProductCost("");
                setProductCategory("");
                setProductImage("");

                // redirect to products page
                setTimeout(() => {
                    navigate("/products")
                }, 2000)
            }


        } catch (error) {
            setError(error.message);
            setLoading("");

        }

    }

    return (
        <div className="row justify-content-center mt-4 container-fluid">
            <Navbar />
            <div className="col-md-6 card shadow p-4">

                <h2>Add products</h2>

                <h5 className="text-danger">{error}</h5>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-success">{success}</h5>

                <form onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="product name"
                        className="form-control"
                        required
                        onChange={(e) => { setProductName(e.target.value) }}
                        value={product_name}
                    /> <br />

                    <textarea
                        placeholder="description"
                        className="form-control"
                        rows="7"
                        required
                        onChange={(e) => { setProductDescription(e.target.value) }}
                        value={product_description}

                    ></textarea> <br />

                    <input type="number"
                        placeholder="product cost"
                        className="form-control"
                        required
                        onChange={(e) => { setProductCost(e.target.value) }}
                        value={product_cost}
                    /> <br />
                    <label htmlFor="" className="form-label">product category</label>

                    <select
                        className="form-select"
                        required
                        onChange={(e) => { setProductCategory(e.target.value) }}
                        value={product_category}
                    >
                        <option value="">select category</option>
                        <option value="poultry">poultry</option>
                        <option value="cattle">cattle</option>
                        <option value="crops">crops</option>
                        <option value="farm equipment">farm equpiment</option>

                    </select> <br />

                    <label htmlFor="" className="form-label">product image</label>
                    <input type="file"
                        placeholder="image"
                        className="form-control"
                        accept="image/*"
                        required
                        onChange={(e) => { setProductImage(e.target.files[0]) }}
                    /> <br />

                    <button className="btn btn-dark">Add product</button>
                </form>
            </div>
        </div>
    );
}

export default AddProducts;