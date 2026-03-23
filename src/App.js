import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MakePayment from './components/MakePayment';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AboutUs from './components/AboutUs';
import AddProducts from './components/AddProducts';
import AddServices from './components/AddServices';
import Services from './components/Services';
import Products from './components/Products';
import Navbar from './components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App container-fluid">
      
        <header className="App-header">
          <h1>Agrimarket</h1>

        </header>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/makepayment' element={<MakePayment />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/addproduct' element={<AddProducts />} />
        <Route path='/addservice' element={<AddServices />} />
        <Route path='/services' element={<Services />} />
        <Route path='/products' element={<Products />} />
        

      </Routes>
    </BrowserRouter>

  );
}

export default App;
