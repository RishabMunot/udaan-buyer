import React from "react";
import {  useHistory } from "react-router-dom";
import auth from "../../data/auth";
import { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Header = ({ cartLength }) => {


  const loggedIn = auth.isAuthenticated()==="true"

  var history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
         <div style={{backgroundColor:"black"}}>

        {/* To Check if user is logged in or not */}
        



      <Navbar color="black" dark expand="md" className="container">
        <NavbarBrand href="/">JustTanned.in</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          {loggedIn ? <>
            <NavItem>
              <NavLink href={"/products"}><i class="fa fa-briefcase" aria-hidden="true"></i> Products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/orders"><i class="fa fa-clone" aria-hidden="true"></i> My Orders</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/cart"><i className="fa fa-shopping-cart mr-2" aria-hidden="true" /> Cart</NavLink>
            </NavItem>
            
            <NavItem onClick={()=>{auth.logout(history)}}>
              <NavLink href="/signin-buyer"><i className="fa fa-shopping-cart mr-2" aria-hidden="true" /> Logout</NavLink>
            </NavItem></>: 
            <NavItem onClick={()=>{auth.logout(history)}}>
              <NavLink href="http://localhost:3000/"><i class="fa fa-sign-in" aria-hidden="true"></i> Seller Login</NavLink>
            </NavItem>
          }
          </Nav>
        </Collapse>
      </Navbar>
    </div>

  );

};

export default Header;
