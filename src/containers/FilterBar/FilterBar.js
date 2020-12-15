import React from "react";

import { category } from "../../data/category";
import { Col, Row, FormGroup, Label, Input } from "reactstrap";
import { color } from "../../data/color";
import { sortBy } from "../../data/sortBy";

import "./FilterBar.scss";

import { availability } from "../../data/availability";

const FilterBar = (props) => {
  var pseudoFilterData = JSON.parse(JSON.stringify(props.filterData));


  const handleColorSelectBox = (e) => {
    const name = e.target.name;

    if (e.target.checked) {
      pseudoFilterData.color.push(name);
    } else {
      const index = pseudoFilterData.color.indexOf(name);
      if (index > -1) {
        pseudoFilterData.color.splice(index, 1);
      }
    }
    props.setfilterData(pseudoFilterData);
  };

  const handlePriceChangeStart = (e) => {
    pseudoFilterData.priceStart = e.target.value;
    props.setfilterData(pseudoFilterData);
  };

  const handlePriceChangeEnd = (e) => {
    pseudoFilterData.priceEnd =e.target.value;
    props.setfilterData(pseudoFilterData);
  };

  const handleSortBySelectBox = (e) => {
    const name = e.target.value;

    if (e.target.checked) {
      pseudoFilterData.sortBy = name;
    }
    props.setfilterData(pseudoFilterData);
  };

  const handleCategorySelectBox = (e) => {
    const name = e.target.name;

    if (e.target.checked) {
      pseudoFilterData.category.push(name);
    } else {
      const index = pseudoFilterData.category.indexOf(name);
      if (index > -1) {
        pseudoFilterData.category.splice(index, 1);
      }
    }
    props.setfilterData(pseudoFilterData);
  };

  const handleAvailabilitySelectBox = (e) => {
    pseudoFilterData.availability = e.target.checked;
    props.setfilterData(pseudoFilterData);
  };

  return (
    <div className="col-lg-3">
      <div className="row">
        <div className="col-12">
          <div className="card mb-3">
            <div className="card-header">
              <h3>Sort By</h3>
            </div>
            <ul className="list-group flex-row flex-wrap">
              {sortBy.map((brand) => {
                var toCheck = props.filterData.sortBy === brand;

                return (
                  <li className="list-group-item flex-50">
                    <FormGroup check>
                      <Label check>
                        <Input
                          checked={toCheck}
                          type="radio"
                          name="radio1"
                          value={brand}
                          onChange={handleSortBySelectBox}
                        />{" "}
                        {brand}
                      </Label>
                    </FormGroup>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-12">
          <div className="card mb-3">
            <div className="card-header">
              <h3>Category</h3>
            </div>
            <ul className="list-group flex-row flex-wrap">
              {category.map((brand) => {
                var toCheck = false;
                toCheck = props.filterData.category.includes(brand);

                return (
                  <li className="list-group-item flex-50">
                    <label className="custom-checkbox text-capitalize">
                      {" "}
                      {brand}
                      <input
                        checked={toCheck}
                        type="checkbox"
                        name={brand}
                        className="custom-checkbox__input"
                        onChange={handleCategorySelectBox}
                      />
                      <span className="custom-checkbox__span"></span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-12">
          <div className="card mb-3">
            <div className="card-header">
              <h3>Price Range</h3>
            </div>

            <Row form className="priceRow">
              <Col md={4}>
                <FormGroup>
                  <Input
                    type="integer"
                    name="Start"
                    value={props.filterData.startPrice}
                    id="exampleZip"
                    placeholder="Start"
                    onChange={handlePriceChangeStart}
                  />
                </FormGroup>
              </Col>
              To
              <Col md={4}>
                <FormGroup>
                  <Input
                    type="integer"
                    name="End"
                    id="exampleZip"
                    value={props.filterData.startPrice}
                    placeholder="End"
                    onChange={handlePriceChangeEnd}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
        </div>
        <div className="col-12">
          <div className="card mb-3">
            <div className="card-header">
              <h3>Color</h3>
            </div>
            <ul className="list-group flex-row flex-wrap">
              {color.map((brand) => {
                var toCheck = false;
                toCheck = props.filterData.color.includes(brand);
                return (
                  <li className="list-group-item flex-50">
                    <label className="custom-checkbox text-capitalize">
                      {" "}
                      {brand}
                      <input
                        checked={toCheck}
                        type="checkbox"
                        name={brand}
                        className="custom-checkbox__input"
                        onChange={handleColorSelectBox}
                      />
                      <span className="custom-checkbox__span"></span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col-12">
          <div className="card mb-3">
            <div className="card-header">
              <h3>Availability</h3>
            </div>
            <ul className="list-group flex-row flex-wrap">
              {availability.map((brand) => (
                <li className="list-group-item flex-50">
                  <label className="custom-checkbox text-capitalize">
                    {" "}
                    {brand}
                    <input
                      type="checkbox"
                      name={brand}
                      checked={props.filterData.availability}
                      className="custom-checkbox__input"
                      onChange={handleAvailabilitySelectBox}
                    />
                    <span className="custom-checkbox__span"></span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
