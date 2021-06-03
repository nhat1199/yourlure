import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "assets/scss/scss-components/header.scss";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="bg-white">
      <div className="container">
        <Navbar light expand="md" className="p-1">
          <NavbarBrand href="/">LOGO</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/product">
                  Sản phẩm
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/user/login">
                  login
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <div className="d-flex ms-auto search-form px-3 ">
              <input type="text" className="search" placeholder="Tìm kiếm..." />
              <i className="fa fa-search"></i>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
};

export default Example;
