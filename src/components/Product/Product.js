import Axios from 'axios';
import React, {useState} from 'react';

import {Link} from 'react-router-dom';
import auth from '../../data/auth';
import { apiBaseURL } from '../../data/env_variables';
import {cumulativeOffSet} from "../../utilities/cumulativeOffset";

import './Product.scss';


const Product = (props) => {
    
    const {
        product_title,
        price,
        image_url,
        product_description,
        product_id,
    } = props.product

    // const imageRef = React.createRef();
    // const [img, setImg] = useState(images[0]);
    // const [aItem, setAItem] = useState(0);

    return (
        <div className="card h-100 product">
            <Link to={`/products/${product_id}`} className="product__link">
                <img
                className="card-img-top product__img" style={{objectFit:"contain"}} src={image_url} alt={product_title} />
            </Link>
            <div className="card-body product__text">
                <h4 className="card-title product__title">
                    <Link to={`/products/${product_id}`}>{product_title}</Link>
                </h4>
                <h5 className="product__price">₹{price}</h5>
                <p className="card-text product__description">{product_description.substring(0,50)}</p>
                <button
                    onClick={() => {
                        console.log(auth.getUserData());
                        Axios.get(apiBaseURL+"/add-product-to-cart",{params:{product_id,buyerEmail:auth.getUserData().email}}).then(res=>console.log(res))
                        .catch(err=> console.log(err))
                    }}
                    className="btn btn-info product__add-to-cart">Add to cart
                </button>
            </div>
        </div>
    );
};

export default Product