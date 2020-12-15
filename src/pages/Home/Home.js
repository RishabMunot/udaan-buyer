import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import FilterBar from "../../containers/FilterBar/FilterBar";
import ProductList from "../../containers/ProductList/ProductList1";
import Auth from "../../data/auth";

const Home = (props) => {
  const [filterData, setfilterData] = useState({
    sortBy: "None",
    category: [],
    priceStart: 0,
    priceEnd: 99999,
    color: [],
    availability: true,
  });

  
console.log(props);

  var history = useHistory();

  if (Auth.isAuthenticated() === "false") history.push("/signin-buyer");

  return (
    <React.Fragment>
      <div className="container" style={{ paddingTop: "6rem" }}>
        {filterData.availability}
        <div className="row">
          {!props.match.params.sellerId?
          <FilterBar filterData={filterData} setfilterData={setfilterData} />
        :<></>}
          <ProductList filterData={filterData} sellerId = {props.match.params.sellerId}/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
