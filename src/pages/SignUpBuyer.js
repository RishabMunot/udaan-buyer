import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

import {
  Container,
  Form,
  Input,
  Label,
  FormGroup,
  FormFeedback,
  Button,
  Col,
  Row,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
} from "reactstrap";
import { isEmail } from "validator";
import "./registeration.css";
import Axios from "axios";
import { apiBaseURL } from "../data/env_variables";
import auth from "../data/auth";

class SignUpBuyer extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.history);

    this.state = this.getInitialState();
  }

  calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log(age_now);
    return age_now;
  };

  getInitialState = () => ({
    data: {
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      dateOfBirth: "",
      address1: "",
      address2: "",
      addressCity: "",
      addressState: "",
      addressZip: "",
      password: "",
      confirmPassword: "",
      location: { latitude: 0, longitude: 0 },
    },
    errors: {},
    isOpen: false,
  });

  getLoc = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      return {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      };
    });
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  showPosition = (position) => {
    this.setState({
      data: {
        ...this.state.data,
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      },
      errors: {
        ...this.state.errors,
      },
    });
  };

  handleChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
      errors: {
        ...this.state.errors,
        [e.target.name]: "",
      },
    });
  };

  validate = () => {
    // const;
    let errors = {};
    const data = this.state.data;
    // data.location.latitude = this.post.coords.latitude;
    // data.location.latitude = this.post.coords.longitude;

    // this.getLocation();
    if (data.firstName === "")
      errors.firstName = "First Name can not be blank.";
    if (data.lastName === "") errors.lastName = "Last Name can not be blank.";
    if (!isEmail(data.email)) errors.email = "Email must be valid.";
    if (data.email === "") errors.email = "Email can not be blank.";
    if (data.address1 === "") errors.address1 = "Address can not be blank.";
    if (data.contactNumber === "")
      errors.contactNumber = "Contact Number can not be blank.";
    if (data.contactNumber && data.contactNumber.length !== 10)
      errors.contactNumber = "Invalid Contact Number.";
    if (data.address2 === "") errors.address2 = "Address can not be blank.";
    if (data.addressCity === "") errors.addressCity = "City can not be blank.";
    if (data.addressState === "")
      errors.addressState = "State can not be blank.";
    if (data.addressZip === "") errors.addressZip = "Zip can not be blank.";
    if (data.password === "") errors.password = "Password must be valid.";
    if (data.confirmPassword !== data.password)
      errors.confirmPassword = "Passwords must match.";
    if (data.dateOfBirth === "")
      errors.dateOfBirth = "Date of Birth cannot be blank";
    if (this.calculate_age(data.dateOfBirth) < 18)
      errors.dateOfBirth = "Minimub age is 18";
    // this.setState({ errors });
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.getLoc();

    const errors = this.validate();
    const { data } = this.state;

    if (Object.keys(errors).length === 0) {
      // Call API here to save data in neo4j SELLER DATA

      var history = this.props.history;

      navigator.geolocation.getCurrentPosition(
        function (position) {
          data.longitude = position.coords.longitude;
          data.latitude = position.coords.latitude;
          console.log(data);
          Axios.post(apiBaseURL + "/new-buyer", { params: data }).then(
            function (respnse) {
              console.log(this);

              if (respnse.data.status === "User Already Exist") {
                errors.email = "User Already Exist";
                this.setState({ errors });
              } else {
                auth.login({ email: data.email }, history);

                //Resetting the form
                this.setState(this.getInitialState());
              }
            }.bind(this)
          );
        }.bind(this)
      );
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <section>
        <Navbar className="Navbar" light expand="md">
          <NavbarBrand className="text-white" href="/">
            JustTanned
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.isOpen} navbar>
            <Nav className="mr-auto text-white" navbar></Nav>

            <NavLink className="text-white" href="/signin-buyer">
              Buyer Login
            </NavLink>
            <NavLink className="text-white" href="/signin-seller">
              Seller Login
            </NavLink>
          </Collapse>
        </Navbar>
        <Container>
          <h1 className="heading "> Buyer Sign Up </h1>
          <Form onSubmit={this.handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input
                    placeholder="John"
                    id="firstName"
                    value={data.firstName}
                    invalid={errors.firstName ? true : false}
                    name="firstName"
                    onChange={this.handleChange}
                  />
                  <FormFeedback>{errors.firstName}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={data.lastName}
                    invalid={errors.lastName ? true : false}
                    name="lastName"
                    onChange={this.handleChange}
                    placeholder="Murphy"
                  />
                  <FormFeedback>{errors.lastName}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            {/* <Row form> */}
            {/* <Col md={6}> */}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                value={data.email}
                invalid={errors.email ? true : false}
                name="email"
                onChange={this.handleChange}
                placeholder="johnsnow@gmail.com"
              />
              <FormFeedback>{errors.email}</FormFeedback>
            </FormGroup>
            {/* </Col> */}
            {/* <Col md={6}> */}
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="contactNumber">Contact Number</Label>
                  <Input
                    type="int"
                    name="contactNumber"
                    id="contactNumber"
                    placeholder="9876543210"
                    value={data.contactNumber}
                    invalid={errors.contactNumber ? true : false}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>{errors.contactNumber}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="dateOfBirth">Date of Birth</Label>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    placeholder="01/01/2000"
                    value={data.dateOfBirth}
                    invalid={errors.dateOfBirth ? true : false}
                    onChange={this.handleChange}
                  />
                  <FormFeedback>{errors.dateOfBirth}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="address1">Address</Label>
              <Input
                type="text"
                name="address1"
                id="address1"
                placeholder="1234 Main St"
                value={data.address1}
                invalid={errors.address1 ? true : false}
                onChange={this.handleChange}
              />
              <FormFeedback>{errors.address1}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="address2">Address 2</Label>
              <Input
                type="text"
                name="address2"
                id="address2"
                placeholder="Apartment, studio, or floor"
                value={data.address2}
                invalid={errors.address2 ? true : false}
                onChange={this.handleChange}
              />
              <FormFeedback>{errors.address2}</FormFeedback>
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="addressCity">City</Label>
                  <Input
                    type="text"
                    name="addressCity"
                    id="addressCity"
                    value={data.addressCity}
                    invalid={errors.addressCity ? true : false}
                    onChange={this.handleChange}
                    placeholder="Mumbai"
                  />
                  <FormFeedback>{errors.addressCity}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="addressState">State</Label>
                  <Input
                    type="text"
                    name="addressState"
                    id="addressState"
                    value={data.addressState}
                    invalid={errors.addressState ? true : false}
                    onChange={this.handleChange}
                    placeholder="Maharashtra"
                  />
                  <FormFeedback>{errors.addressState}</FormFeedback>
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="addressZip">Zip</Label>
                  <Input
                    type="text"
                    name="addressZip"
                    id="addressZip"
                    value={data.addressZip}
                    invalid={errors.addressZip ? true : false}
                    onChange={this.handleChange}
                    placeholder="100001"
                  />

                  <FormFeedback>{errors.addressZip}</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={data.password}
                invalid={errors.password ? true : false}
                onChange={this.handleChange}
                placeholder="Atleast 6 characters long"
              />
              <FormFeedback>{errors.password}</FormFeedback>
            </FormGroup>
            {/* </Col> */}
            {/* <Col md={6}> */}
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={data.confirmPassword}
                invalid={errors.confirmPassword ? true : false}
                onChange={this.handleChange}
              />
              <FormFeedback>{errors.confirmPassword}</FormFeedback>
            </FormGroup>
            <Button
              block
              color="secondary"
              style={{ marginTop: 20, backgroundColor: "#323232" }}
            >
              Sign Up
            </Button>
          </Form>
        </Container>
      </section>
    );
  }
}

export default SignUpBuyer;
