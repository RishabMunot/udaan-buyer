import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import auth from "../../data/auth";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);

  const [userId, setUserId] = useState(0);
  const history = useHistory()

  const fetchOrder = async () => {
    const res = await Axios.get("http://localhost:5000/get-buyer-orders", {
      params: { buyerEmail: auth.getUserData().email },
    });
    console.log(res.data);
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrder();
  }, [userId]);

  return (
    <div className="container" style={{ paddingTop: "6rem" }}>
      {orders.length < 1 ? (
        <h2 style={{ width: "100%", textAlign: "center" }}>
          You don't have any orders yet
        </h2>
      ) : (
        <div className="row">
          {/* {products.map((product) => { */}
          {orders.map((order) => {
            return (
              <Card className="3 col-md-3 mb-4" style={{ marginRight: "20px" }}>
                <CardImg
                  top
                  width="100%"
                  height="200px"
                  style={{objectFit:"contain"}}
                  src={order.image_url}
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle tag="h5">{order.orderId}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Order Date: {order.date}
                  </CardSubtitle>
                  <CardText>Total Amount: {order.totalPrice}</CardText>
                  <CardText>Total Quantity: {order.totalQuantity}</CardText>
                  <Button onClick={()=>history.push(`/order/${order.orderId}`)}>View Order</Button>
                </CardBody>
              </Card>
            );
          })}

          {/* let classes = `3 col-md-6 mb-4`; */}
          {/* return ( */}
          {/* <div className={classes}>
                 <Product key={product.product_id} product={product} />
               </div> */}
          {/* ); */}
          {/* })} */}
        </div>
      )}
    </div>
  );
};

export default Orders;
