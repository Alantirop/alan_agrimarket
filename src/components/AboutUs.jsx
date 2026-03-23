import Navbar from "./Navbar";

const AboutUs = () => {
    return (
        <div>
            <div className="row justify-content-center mt-4 ">
                <Navbar/>
                <div className="card shadow p-4 col-md-6">
                    <h2 className="text-center"><u>About Agrimarket</u></h2>
                    <p>We are a team of farmers who are passionate about providing fresh, healthy, and affordable produce to our customers.</p>
                    <p>We are committed to sustainable farming in Kenya and all over.</p>
                    <p className="text-center">Thank you for choosing Agrimarket!</p>
                    <p className="text-center">Contact us at: agrimarketkenya@gmail.com</p>
                    <p className="text-center">Phone: +254793766822</p>
                    <p className="text-center">Address: Nairobi, Kenya</p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;