import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import axios from "axios";

const NavLink = ({ to, text, onClick }) => {
  return (
    <Link to={to} onClick={onClick} className="text-black text-lg md:p-2 font-semibold">
      {text}
    </Link>
  );
};

const NavButton = ({ to, text, onClick }) => {
  return (
    <Link to={to} onClick={onClick} className="text-white text-lg md:p-2 rounded-full font-semibold bg-Grubstake m-1">
      {text}
    </Link>
  );
};

const NavElem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("user");
  const token = localStorage.getItem("token");

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (token) {
      axios.get('/api/v2/user/me')
        .then((res) => {
          // console.log("User role:", res.data.user.role); // Log the role for debugging
          setRole(res.data.user.role);
          // console.log("Role:", role); // Log the role for debugging
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [token]);

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="p-3 w-0 md:w-fit">
      <div className="hidden md:flex justify-between">
        <NavLink to="/" text="Home" />
        {role === "user" && <NavLink to="/GovScol" text="GovScol" />}
        {role === "user" && <NavLink to="/PriScol" text="PriScol" />}
        <NavLink to="/Loans" text="Loans" />
        {role === "Bank" && <NavLink to="/NewLoan" text="New Loans" />}
        
        {token ? (
          <NavButton to="/logout" text="Logout" />
        ) : (
          <>
            <NavButton to="/SignUp" text="SignUp" />
            <NavButton to="/Login" text="Login" />
          </>
        )}
      </div>
      <div className="md:hidden flex justify-center">
        <button onClick={toggleNavbar}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        {isOpen && (
          <div className="flex flex-col">
            <NavLink to="/" text="Home" onClick={handleLinkClick} />
            {role === "user" && <NavLink to="/GovScol" text="GovScol" onClick={handleLinkClick} />}
            {role === "user" && <NavLink to="/PriScol" text="PriScol" onClick={handleLinkClick} />}
            {role === "Bank" && <NavLink to="/Loans" text="Loans" onClick={handleLinkClick} />}
            {role === "Bank" && <NavLink to="/NewLoan" text="New Loans" onClick={handleLinkClick} />}
            {token ? (
              <NavButton to="/logout" text="Logout" onClick={handleLinkClick} />
            ) : (
              <>
                <NavButton to="/SignUp" text="SignUp" onClick={handleLinkClick} />
                <NavButton to="/Login" text="Login" onClick={handleLinkClick} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavElem;
