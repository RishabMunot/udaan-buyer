import Axios from "axios";
import React, { useEffect, useState } from "react";

import OrderItem from "../../components/CartItem/OrderItem";

const OrderDetail = (props) => {
  const [orderItems, setorderItems] = useState([]);


  const [userId] = useState(0);

  const fetchMarker = async () => {
    const res = await Axios.get("http://localhost:5000/get-order", {
      params: { orderId: props.match.params.orderId },
    });
    console.log(res.data);
    setorderItems(res.data);
  };

  useEffect(() => {
    fetchMarker();
  }, [userId]);

  return (
    <>
      {
        <div className="container" style={{ paddingTop: "6rem" }}>
            <h2 style={{marginTop:"50px"}}>Order ID:{orderItems.length>0?orderItems[0].orderId:0}</h2>
            <h5>Date: {orderItems.length>0?orderItems[0].date:0}</h5>
            <h3 style={{marginTop:"50px"}}>Total Quantity: {orderItems.length>0?orderItems[0].totalQuantity:0}</h3>
          <div className="card shopping-cart">
            <div className="card-header bg-dark text-light">
              <i className="fa fa-shopping-cart pr-2" aria-hidden="true"></i>
              Order Details
              <div className="clearfix"></div>
            </div>
            <div className="card-body">
              {orderItems.map((cart, idx) => (
                <OrderItem {...cart} idx={idx} />
              ))}
            </div>
            <div className="card-footer">
              <div className="pull-right" style={{ margin: "10px" }}>
                <div className="pull-right" style={{ margin: "5px" }}>
                  Total price: ₹<b>{orderItems.length>0?orderItems[0].totalPrice:0}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default OrderDetail;
