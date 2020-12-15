import React, { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import axios from "axios";

import { Button } from "reactstrap";
import Map from "../Map/map";

const ProductList = (props) => {
  const [state, setState] = useState({
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
  })
  console.log("PL",props.filterData);

  const [userId, setUserId] = useState(0)


  // const fetchPosts = async () => {
  //     setState({ ...state, loading: true });

  //     var res =  await axios.get("http://localhost:5000/get")
  //     setState({ products: res.data });
  //     setState({ loading: false });
  //   };

  //   fetchPosts();

    
  useEffect(()=>{fetchPosts()},[userId])
  


  // indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
  // indexOfFirstPost = this.indexOfLastPost - this.state.postsPerPage;
  // currentPosts = this.state.products?this.state.products.slice(
  //   this.indexOfFirstPost,
  //   this.indexOfLastPost
  // ):[]

  // // Change page
  // paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

  const toggleMenu = () => setState({ dropdownOpen: !state.dropdownOpen });

  const toggleMap = () => {
    if (state.map) {
      setState({
        view: " Map",
        map: !state.map,
      });
    } else {
      setState({
        view: " Products",
        map: !state.map,
      });
    }
  };

  
    return (
      <div className="col-lg-9">
        <div className="row mb-3">
          <div className="col-12 d-none d-lg-block d-xl-block">
            <div className="card ">
              <div className="card-header d-flex justify-content-end ">
                <Button color="secondary" onClick={toggleMap}>
                  Toggle {state.view}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {state.map ? (
          <Map />
        ) : (
          <div>
            {state.loading ? (
              <h2>Loading...</h2>
            ) : (
              <div className="row">
                {state.products.map((product) => {
                  let classes = `${state.colValue} col-md-6 mb-4`;
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


// const mapStateToProps = async (state) => {
//   const a =  await axios.get("http://localhost:5000/get",{headers:{"Content-Type":"application/json"}})
//   console.log(a);

//   return { products: a.data};
// };

export default ProductList;
