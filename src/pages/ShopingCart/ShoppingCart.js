import Axios from "axios";
import { Button } from "reactstrap";
import React, { useEffect, useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import classnames from "classnames";

import CartItem from "../../components/CartItem/CartItem";
import auth from "../../data/auth";
import { apiBaseURL } from "../../data/env_variables";
import { useHistory } from "react-router-dom";

const ShoppingCart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const history = useHistory()
  const [totalPrice, setTotalPrice] = useState(0);

  const [userId, setUserId] = useState(0);

  const fetchMarker = async () => {
    const res = await Axios.get("http://localhost:5000/get-cart-buyer", {
      params: { buyerEmail: auth.getUserData().email },
    });

    let ids = res.data.map((o) => o.product_id);
    let filtered = res.data.filter(
      ({ product_id }, index) => !ids.includes(product_id, index + 1)
    );
    var x=0;
    filtered.forEach((element) => {
      x += element.price.low;

    });
    setTotalPrice(x);

    setCartItems(filtered);
  };

  useEffect(() => {
    fetchMarker();
  }, [userId]);

  const [activeTab, setActiveTab] = useState("1");
  const [checkout, setCheckout] = useState(true);
  const [data, setData] = useState({
    dataCurr: {
      address1: "",
      address2: "",
      addressCity: "",
      addressState: "",
      addressZip: "",
      orderId: 0,
      totalQuantity: 0,
      totalPrice: 0,
      latitude: 0.0,
      longitude: 0.0,
      paymentMethod: "",
    },
    errors: {},
  });
  const [cardData, setCardData] = useState({
    data: {
      cardNumber: "",
      cardExpiry: "",
      cardCVV: "",
    },
    errors: {},
  });

  const toggle = (tab) => {
    setActiveTab(tab);
  };

  const handleClick = () => {
    setCheckout(false);
  };

  const handleChange = (e) => {
    if (activeTab === "1") {
      setData({
        dataCurr: {
          ...data.dataCurr,
          [e.target.name]: e.target.value,
          paymentMethod: "COD",
        },
        errors: {
          ...data.errors,
          [e.target.name]: "",
        },
      });
    } else {
      
      if (e.target.id === "cardDetails") {
        setCardData({
          data: {
            ...cardData.data,
            [e.target.name]: e.target.value,
          },
          errors: {
            ...cardData.errors,
            [e.target.name]: "",
          },
        });
      } else {
        setData({
          dataCurr: {
            ...data.dataCurr,
            [e.target.name]: e.target.value,
            paymentMethod: "Debit/Credit Card",
          },
          errors: {
            ...data.errors,
            [e.target.name]: "",
          },
        });
      }
    }
  };

  const handlePlaceOrderClick = () => {

    navigator.geolocation.getCurrentPosition(
      function (position) {
        data.dataCurr.longitude = position.coords.longitude;
        data.dataCurr.latitude = position.coords.latitude;
        data.buyerEmail = auth.getUserData().email
        data.cart = cartItems
        console.log(data);
        Axios.post(apiBaseURL + "/place-order", { params: data }).then(
          function (respnse) {
              console.log(respnse);
              history.push("/orders")
            }
        );
        }
    );

  };

  const handleBackClick = () => {
    toggle("0");
    setCheckout(false);
    window.location.reload(false);
  };


  return (
    <>
    {checkout?(
      <div className="container" style={{ paddingTop: "6rem" }}>
        <div className="card shopping-cart">
          <div className="card-header bg-dark text-light">
            <i className="fa fa-shopping-cart pr-2" aria-hidden="true"></i>
            Shipping cart
            <div className="clearfix"></div>
          </div>
          <div className="card-body">
            {cartItems.length ? (
              cartItems.map((cart,idx) => (
                <CartItem {...cart} idx = {idx} setCartItems = {setCartItems} cartItems = {cartItems} setTotalPrice={setTotalPrice} />
              ))
            ) : (
              <h1 className="display-4 mt-5 text-center">
                There is no product in your cart
              </h1>
            )}
          </div>
          <div className="card-footer">
              <div className="pull-right" style={{ margin: "10px" }}>
                <div className="pull-right" style={{ margin: "5px" }}>
                  Total price: ₹<b>{totalPrice}</b>
                  <Button
                    style={{
                      marginLeft: "25px",
                      paddingLeft: "15px",
                      paddingRight: "15px",
                    }}
                    color="success"
                    onClick={handleClick}
                  >
                    Checkout
                  </Button>{" "}
                </div>
              </div>
            </div>
          
        </div>
      </div>
      ):(
        <div className="container" style={{ paddingTop: "6rem", width: "70%" }}>
          <Nav tabs>
            <NavItem style={{ width: "10%", textAlign: "center" }}>
              <NavLink
                className={classnames({ active: activeTab === "0" })}
                onClick={handleBackClick}
              >
                <i class="fa fa-arrow-left" aria-hidden="true"></i>
              </NavLink>
            </NavItem>
            <NavItem style={{ width: "45%", textAlign: "center" }}>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
                Cash On Delivery
              </NavLink>
            </NavItem>
            <NavItem style={{ width: "45%", textAlign: "center" }}>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                Debit/Credit Card
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <div className="container">
                <div className="card shopping-cart">
                  <Form style={{ marginTop: "20px", padding: "20px" }}>
                    <FormGroup>
                      <Label for="address1">Delivery Address</Label>
                      <Input
                        type="text"
                        name="address1"
                        id="address1"
                        placeholder="1234 Main St"
                        value={data.dataCurr.address1}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="address2">Delivery Address 2</Label>
                      <Input
                        type="text"
                        name="address2"
                        id="address2"
                        placeholder="Apartment, studio, or floor"
                        value={data.dataCurr.address2}
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="addressCity">City</Label>
                          <Input
                            type="text"
                            name="addressCity"
                            id="addressCity"
                            value={data.dataCurr.addressCity}
                            onChange={handleChange}
                            placeholder="Mumbai"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="addressState">State</Label>
                          <Input
                            type="text"
                            name="addressState"
                            id="addressState"
                            value={data.dataCurr.addressState}
                            onChange={handleChange}
                            placeholder="Maharashtra"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>
                          <Label for="addressZip">Zip</Label>
                          <Input
                            type="text"
                            name="addressZip"
                            id="addressZip"
                            value={data.dataCurr.addressZip}
                            onChange={handleChange}
                            placeholder="100001"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                  <div className="card-footer">
                    <div className="pull-right" style={{ margin: "10px" }}>
                      <div className="pull-right" style={{ margin: "5px" }}>
                        Total price: <b>{totalPrice}</b>
                        <Button
                          style={{
                            marginLeft: "25px",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                          }}
                          color="success"
                          onClick={handlePlaceOrderClick}
                        >
                          Place Order
                        </Button>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="container">
                <div className="card shopping-cart">
                  <Form style={{ marginTop: "0px", padding: "20px" }}>
                    <FormGroup>
                      <Label for="address1">Delivery Address</Label>
                      <Input
                        type="text"
                        name="address1"
                        id="address1"
                        placeholder="1234 Main St"
                        value={data.dataCurr.address1}
                        //   invalid={errors.address1 ? true : false}
                        onChange={handleChange}
                      />
                      {/* <FormFeedback>{errors.address1}</FormFeedback> */}
                    </FormGroup>
                    <FormGroup>
                      <Label for="address2">Delivery Address 2</Label>
                      <Input
                        type="text"
                        name="address2"
                        id="address2"
                        placeholder="Apartment, studio, or floor"
                        value={data.dataCurr.address2}
                        //   invalid={errors.address2 ? true : false}
                        onChange={handleChange}
                      />
                      {/* <FormFeedback>{errors.address2}</FormFeedback> */}
                    </FormGroup>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="addressCity">City</Label>
                          <Input
                            type="text"
                            name="addressCity"
                            id="addressCity"
                            value={data.dataCurr.addressCity}
                            //   invalid={errors.addressCity ? true : false}
                            onChange={handleChange}
                            placeholder="Mumbai"
                          />
                          {/* <FormFeedback>{errors.addressCity}</FormFeedback> */}
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="addressState">State</Label>
                          <Input
                            type="text"
                            name="addressState"
                            id="addressState"
                            value={data.dataCurr.addressState}
                            //   invalid={errors.addressState ? true : false}
                            onChange={handleChange}
                            placeholder="Maharashtra"
                          />
                          {/* <FormFeedback>{errors.addressState}</FormFeedback> */}
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>
                          <Label for="addressZip">Zip</Label>
                          <Input
                            type="text"
                            name="addressZip"
                            id="addressZip"
                            value={data.dataCurr.addressZip}
                            //   invalid={errors.addressZip ? true : false}
                            onChange={handleChange}
                            placeholder="100001"
                          />

                          {/* <FormFeedback>{errors.addressZip}</FormFeedback> */}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="cardNumber">Card Number</Label>
                          <Input
                            type="text"
                            name="cardNumber"
                            id="cardDetails"
                            value={cardData.data.cardNumber}
                            //   invalid={errors.addressCity ? true : false}
                            onChange={handleChange}
                            placeholder="1234567812345678"
                          />
                          {/* <FormFeedback>{errors.addressCity}</FormFeedback> */}
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label for="cardExpiry">Expiry Date</Label>
                          <Input
                            type="text"
                            name="cardExpiry"
                            id="cardDetails"
                            value={cardData.data.cardExpiry}
                            //   invalid={errors.addressState ? true : false}
                            onChange={handleChange}
                            placeholder="01/21"
                          />
                          {/* <FormFeedback>{errors.addressState}</FormFeedback> */}
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>
                          <Label for="cardCVV">CVV</Label>
                          <Input
                            type="password"
                            name="cardCVV"
                            id="cardDetails"
                            value={cardData.data.cardCVV}
                            //   invalid={errors.addressZip ? true : false}
                            onChange={handleChange}
                            placeholder="111"
                          />

                          {/* <FormFeedback>{errors.addressZip}</FormFeedback> */}
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>

                  <div className="card-footer">
                    <div className="pull-right" style={{ margin: "10px" }}>
                      <div className="pull-right" style={{ margin: "5px" }}>
                        Total price: <b>{totalPrice}</b>
                        <Button
                          style={{
                            marginLeft: "25px",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                          }}
                          color="success"
                          onClick={handlePlaceOrderClick}
                        >
                          Place Order
                        </Button>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
          </TabContent>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
