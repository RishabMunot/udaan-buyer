import Axios from "axios";
import React, { useState } from "react";
import "./CartItem.scss";

const OrderItem = ({image_url,product_title,product_description,quantity,price}) => {

  return (
    <div className="row align-items-center mb-3">
      <div className="col-12 col-sm-12 col-md-2 text-center">
        <img
          className="img-responsive"
          src={image_url}
          style={{ height: "60%", width: "60%" }}
          alt={product_description.substring(0, 100)}
        />
      </div>
      <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
        <h4 className="product-name">
          <strong>{"product_title"}</strong>
        </h4>
        <h4>
          <small className="product-description">
            {product_description.substring(0, 100)}
          </small>
        </h4>
        <h4 className="product-name">
          <strong>{price.low}</strong>
        </h4>
      </div>
      <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row product-quantity-container align-items-center">
        <div
          className="col-6 col-sm-6 col-md-6 text-md-right"
          style={{ paddingTop: "5px" }}
        >
          <h6>
            <strong>
              <span className="text-muted">x</span> {quantity.low}
            </strong>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
