import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.scss";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ShoppingCart from "./pages/ShopingCart/ShoppingCart";
import SignInBuyer from "./pages/SignInBuyer";
import SignUpBuyer from "./pages/SignUpBuyer";
import Orders from "./pages/ShopingCart/orders";
import OrderDetail from "./pages/ShopingCart/OrderDetail"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact path={"/signin-buyer"} component={SignInBuyer} />
            <Route exact path={"/signup-buyer"} component={SignUpBuyer} />
            <Route exact path={"/products/:id"} component={ProductDetail} />
            <Route exact path={"/product-of-seller/:sellerId"} component={Home} />
            <Route exact path={"/cart"} component={ShoppingCart} />
            <Route exact path={"/orders"} component={Orders} />
            <Route exact path={"/order/:orderId"} component={OrderDetail} />
            <Route path="/" component={Home} />
          </Switch>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
