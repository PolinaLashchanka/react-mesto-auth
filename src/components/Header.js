import React from "react";
import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Место Россия" />
      <div className="header__link-container">
        <h2 className="header__email">{props.userEmail}</h2>
        {location.pathname === "/" && (
          <Link
            to="/sign-in"
            replace
            className="header__link"
            onClick={props.onSignOut}
          >
            Выйти
          </Link>
        )}
        {location.pathname === "/sign-up" && (
          <Link to="/sign-in" replace className="header__link">
            Войти
          </Link>
        )}
        {location.pathname === "/sign-in" && (
          <Link to="/sign-up" replace className="header__link">
            Регистрация
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
