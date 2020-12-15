import Axios from "axios";
import React, { useEffect, useState } from "react";
import auth from "../../data/auth";
import { apiBaseURL } from "../../data/env_variables";

const ProductDetail = (props) => {
  const [product, setproduct] = useState({
    product_description: "",
    product_title: "",
    price: "",
    stock: "",
    color: "",
    image_url: "",
    category: "",
  });
  const [success, setSuccess] = useState(false);

  const onCart = () => {
    console.log(auth.getUserData());
    Axios.get(apiBaseURL + "/add-product-to-cart", {
      params: {
        product_id: product.product_id,
        buyerEmail: auth.getUserData().email,
      },
    })
      .then((res) => setSuccess(true))
      .catch((err) => console.log(err));
  };

  const onRemoveCart = () => {
    console.log(auth.getUserData());
    Axios.get(apiBaseURL + "/remove-product-from-cart", {
      params: {
        product_id: product.product_id,
        buyerEmail: auth.getUserData().email,
      },
    })
      .then((res) => setSuccess(false))
      .catch((err) => console.log(err));
  };

  const [userId, setUserId] = useState(0);

  const fetchMarker = async () => {
    const res = await Axios.get("http://localhost:5000/get-product-id", {
      params: { product_id: props.p.match.params.id },
    });
    setproduct(res.data);
  };

  useEffect(() => {
    fetchMarker();
  }, [userId]);

  return (
    <div className="row">
      <div className="col-md-5">
        <img style={{width:"100%",objectFit:"cover"}} alt={product.product_descriptions} src={product.image_url} />
      </div>
      <div className="col-md-7">
        <article className="card-body p-5">
          <h3 className="title mb-3">{product.product_title}</h3>

          <p className="price-detail-wrap">
            <span className="price h3 text-warning">
              <span className="currency">₹ </span>
              {product.price.low}
              <span className="num"></span>
            </span>
          </p>
          <dl className="item-property">
            <dt>Description</dt>
            <dd>
              <p className="text-capitalize">{product.product_description}</p>
            </dd>
          </dl>
          <dl className="param param-feature">
            <dt>Category</dt>
            <dd className="text-capitalize">{product.category}</dd>
          </dl>

          <dl className="param param-feature">
            <dt>Color</dt>
            <dd>{product.color}</dd>
          </dl>
          <dl className="param param-feature">
            <dt></dt>
            <dd></dd>
          </dl>

          <hr />
          <hr />
          <button
            onClick={success?onRemoveCart:onCart}
            className={
              success
                ? "btn btn-lg btn-outline-danger text-uppercase"
                : "btn btn-lg btn-primary text-uppercase"
            }
          >
            <i className="fa fa-shopping-cart" />{" "}
            {success ? "Added to cart Successfully" : "Add to cart"}
          </button>
        </article>
      </div>
    </div>
  );
};

export default ProductDetail;
