import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import CartScreen from "./components/screens/CartScreen";
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
// import EditProfileScreen from './components/screens/EditProfileScreen';
import UserScreen from './components/screens/UserScreen';
import UserScreen2 from './components/screens/UserScreen2';
import ShippingScreen from './components/screens/ShippingScreen';
import PaymentScreen from "./components/screens/PaymentScreen";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen";


function App() {
  return (
<Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/cart/:id?" component={CartScreen} exact />
          {/* <Route path="/editprofile" component={EditProfileScreen} exact /> */}
          <Route path="/profile" component={UserScreen} exact />
          {/* <Route path="/profile" component={UserScreen2} exact /> */}
          <Route path="/shipping" component={ShippingScreen} exact />
          <Route path="/payment" component={PaymentScreen} exact />
          <Route path="/placeorder" component={PlaceOrderScreen} exact />
        </Container>   
      </main>

      <Footer />
      </Router>
  );
}

export default App;
