import React from "react";
import Authorisation from "./Authorisation";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../mestoAuth";

function Register() {
  const navigate = useNavigate();

  function handleRegisterAuth({ email, password }) {
    auth
      .register(password, email)
      .then(() => {
        navigate("/sign-in");
      })
      .catch((res) => console.log(res));
  }

  return (
    <Authorisation
      title="Регистрация"
      buttonName="Зарегистироваться"
      onUpdateAuth={handleRegisterAuth}
    >
      <Link to="/sign-in" className="authorisation__login-link">
        Уже зарегистрированы? Войти
      </Link>
    </Authorisation>
  );
}

export default Register;
