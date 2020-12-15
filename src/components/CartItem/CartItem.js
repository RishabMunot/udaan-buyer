import Axios from "axios";
import React, { useState } from "react";
import auth from "../../data/auth";
import { apiBaseURL } from "../../data/env_variables";
import "./CartItem.scss";

const CartItem = ({
  product_title,
  price,
  product_description,
  quantity,
  product_id,
  image_url,
  dispatch,
  idx,
  setCartItems,
  cartItems,
  setTotalPrice,
}) => {
  var cartItem = JSON.parse(JSON.stringify(cartItems));
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const calculateTotal = ()=>{
    var x = 0;
    cartItem.forEach((element) => {
      x += element.price.low*parseInt(element.quantity);
    });
    setTotalPrice(x);
  }

  calculateTotal()

  const updateCart = (value)=>{
    setItemQuantity(value);
    Axios.get(apiBaseURL + "/add-product-to-cart", {
      params: {
        product_id: product_id,
        buyerEmail: auth.getUserData().email,
        updatetedQuantity: value,
      },
    })
      .then((res) => {
          cartItem[idx].quantity = parseInt(value)
          setCartItems(cartItem)
          calculateTotal()
      })
      .catch((err) => console.log(err));
  }
  const onRemoveCart = () => {
    Axios.get(apiBaseURL + "/remove-product-from-cart", {
      params: {
        product_id: product_id,
        buyerEmail: auth.getUserData().email,
      },
    })
      .then((res) => {
        cartItem.splice(idx, 1);
        setCartItems(cartItem);
        calculateTotal()
      })
      .catch((err) => console.log(err));
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value > 0 && value <= 10) {
      updateCart(value)
    }
  };

  const incrementOrDecrement = (e, type) => {
    const value = itemQuantity;

    if (type === "inc" && value < 10) {
      setItemQuantity(itemQuantity + 1);
      updateCart(value)
      
    }

    if (type === "desc" && value > 1) {
      setItemQuantity(itemQuantity - 1);
      updateCart(value)
      
    }
  };

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
          <strong>{product_title}</strong>
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
              <span className="text-muted">x</span>
            </strong>
          </h6>
        </div>
        <div className="col-4 col-sm-4 col-md-4">
          <div className="quantity">
            <input
              onClick={(e) => {
                incrementOrDecrement(e, "inc");
              }}
              type="button"
              value="+"
              className="plus"
            />
            <input
              onChange={handleQuantityChange}
              type="number"
              step="1"
              max="10"
              min="1"
              value={itemQuantity}
              title="Qty"
              className="qty"
              size="4"
            />
            <input
              onClick={(e) => {
                incrementOrDecrement(e, "desc");
              }}
              type="button"
              value="-"
              className="minus"
            />
          </div>
        </div>
        <div className="col-2 col-sm-2 col-md-2 text-right">
          <button
            onClick={onRemoveCart}
            type="button"
            className="btn btn-outline-danger btn-xs"
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
