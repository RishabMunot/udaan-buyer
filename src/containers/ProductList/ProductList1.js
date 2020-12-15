import React, { Component } from "react";
import Product from "../../components/Product/Product";
import axios from "axios";

import { Button } from "reactstrap";
import Map from "../Map/map";
import auth from "../../data/auth";

class ProductList extends Component {
  state = {
    colValue: "col-lg-4",
    postsPerPage: 12,
    currentPage: 1,
    pagesToShow: 3,
    gridValue: 3,
    map: false,
    products: [],
    loading: false,
    view: " Map",
    dropdownOpen: false,
    sortBy: "None",
  };

  constructor(props) {
    super(props);
    this.setState({ ...this.setState, loading: true });
    if(this.props.sellerId){
      axios.get("http://localhost:5000/get-seller-profile",{params:{firstName:this.props.sellerId.split("_")[0],lastName:this.props.sellerId.split("_")[1]}}).then((res) => {
        console.log(res);
        this.setState({ products: res.data });
        this.setState({ loading: false });
      });  
    }
    else{
    axios.get("http://localhost:5000/get").then((res) => {
      console.log(res);
      this.setState({ products: res.data });
      this.setState({ loading: false });
    });}
  }





  componentDidUpdate(prevProps) {
    
    if (prevProps.filterData !== this.props.filterData) {
      this.setState({ ...this.setState, loading: true });
      

      var params = {...this.props.filterData,...auth.getUserData()}

      axios.get("http://localhost:5000/get-filtered-products",{params}).then((res) => {
        console.log(res);
        this.setState({ products: res.data });
        this.setState({ loading: false });
      });
    } 
}

  
  toggleMenu = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });

  toggleMap = () => {
    if (this.state.map) {
      this.setState({
        view: " Map",
        map: !this.state.map,
      });
    } else {
      this.setState({
        view: " Products",
        map: !this.state.map,
      });
    }
  };

  render() {
    return (
      <div className="col-lg-9">
        <div className="row mb-3">
          <div className="col-12 d-none d-lg-block d-xl-block">
            <div className="card ">
              <div className="card-header d-flex justify-content-end ">
                <Button color="secondary" onClick={this.toggleMap}>
                  Toggle {this.state.view}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {this.state.map ? (
          <Map />
        ) : (
          <div>
            {this.state.loading ? (
              <h2>Loading</h2>
            ) : (
              <div className="row">
                {this.state.products.map((product) => {
                  let classes = `${this.state.colValue} col-md-6 mb-4`;
                  return (
                    <div className={classes}>
                      <Product key={product.product_id} product={product} />
                    </div>
                  );
                })}
              </div>
            )}
            <div className="d-flex justify-content-end">
              {/* <Pagination
                postsPerPage={this.state.postsPerPage}
                totalPosts={this.state.posts.length}
                paginate={this.paginate}
              /> */}
            </div>
          </div>
        )}
      </div>
    );
  }
}

// const mapStateToProps = async (state) => {
//   const a =  await axios.get("http://localhost:5000/get",{headers:{"Content-Type":"application/json"}})
//   console.log(a);

//   return { products: a.data};
// };

export default ProductList;
