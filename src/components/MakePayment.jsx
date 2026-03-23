import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const MakePayment = () => {
    const { product } = useLocation().state || {}
    console.log(product)
    const img_url = "https://alantirop.alwaysdata.net/static/images/";

    let [phone, setPhone] = useState("");
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")
        setSuccess("")
        setLoading("Please wait ...")

        try {
            const data = new FormData();
            data.append("amount", product.product_cost)
            data.append("phone", phone)

            const response = await axios.post("https://alantirop.alwaysdata.net/api/mpesa_payment", data)
            console.log(response)


            if (response.status === 200) {
                setLoading("");
                setSuccess(response.data.message);
                setPhone("");
            }
        } catch (error) {
            setLoading("")
            setError(error.message)
        }
    }


    return (
        <div className="row justify-content-center mt-4 ">
            <Navbar />
            <h2>LIPA NA MPESA</h2>
            <div className="col-md-3">
                <img src={img_url + product.product_image} alt="" className="product_img mt-4" />
            </div>
            <div className="col-md-3 p-1">
                <h2 className="text-dark">{product.product_name}</h2>
                <h4 className="text-primary">{product.product_category}</h4>
                <p className="text-muted">{product.product_description}</p>
                <h4 className="text-warning">{product.product_cost}</h4>
                <hr />


                <h6 className="text-warning">{loading}</h6>
                <h6 className="text-danger">{error}</h6>
                <h6 className="text-success">{success}</h6>


                <form onSubmit={handleSubmit}>
                    <input type="number"
                        className="form-control"
                        required
                        placeholder="enter amount"
                        readOnly
                        value={product.product_cost}

                    /> <br />

                    <input type="tel"
                        className="form-control"
                        required
                        placeholder="enter mpesa no. 2547XXXXXXXX"
                        onChange={(e) => { setPhone(e.target.value) }}
                        value={phone}
                    /> <br />

                    <button className="btn btn-dark">pay now</button>
                </form>
            </div>
        </div>
    );
}

export default MakePayment;