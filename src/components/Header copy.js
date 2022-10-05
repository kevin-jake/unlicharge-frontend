import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./unlicharge_logo.svg";

const Header = () => {
  const [active, setActive] = useState(1);

  const handleActive = (option) => {
    setActive(option);
  };
  console.log(active);
  return (
    <nav className="bg-stone-800  px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex p-4 mt-4 bg-stone-800 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              {/* TODO:  Make this iterative */}
              <p
                className={`block py-2 pr-4 pl-3  md:hover:text-green-400 md:bg-transparent  md:p-0 dark:text-white ${
                  active === 1 ? "text-green-500 font-bold" : "text-white"
                }`}
              >
                <NavLink
                  to="/"
                  exact
                  onClick={() => {
                    handleActive(1);
                  }}
                >
                  Home
                </NavLink>
              </p>
            </li>
            <li>
              <p
                className={`block py-2 pr-4 pl-3  md:hover:text-green-400 md:bg-transparent  md:p-0 dark:text-white ${
                  active === 2 ? "text-green-500 font-bold" : "text-white"
                }`}
              >
                <NavLink
                  to="/"
                  exact
                  onClick={() => {
                    handleActive(2);
                  }}
                >
                  Estimate
                </NavLink>
              </p>
            </li>
            <li>
              <p
                className={`block py-2 pr-4 pl-3  md:hover:text-green-400 md:bg-transparent  md:p-0 dark:text-white ${
                  active === 3 ? "text-green-500 font-bold" : "text-white"
                }`}
              >
                <NavLink
                  to="/list"
                  exact
                  onClick={() => {
                    handleActive(3);
                  }}
                >
                  Tables
                </NavLink>
              </p>
            </li>
            <li>
              <p
                className={`block py-2 pr-4 pl-3  md:hover:text-green-400 md:bg-transparent  md:p-0 dark:text-white ${
                  active === 4 ? "text-green-500 font-bold" : "text-white"
                }`}
              >
                <NavLink
                  to="/"
                  exact
                  onClick={() => {
                    handleActive(4);
                  }}
                >
                  Contact
                </NavLink>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
