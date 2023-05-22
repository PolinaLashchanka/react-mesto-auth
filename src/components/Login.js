import React from "react";
import Authorisation from "./Authorisation";
import { useNavigate } from "react-router-dom";
import * as auth from "../mestoAuth";


function Login({ handleLogin }) {
  const navigate = useNavigate();

  function handleLoginAuth({ email, password }) {
    auth.authorize(password, email)
    .then(data => {
      if(data.token) {
        localStorage.setItem('jwt', data.token);
        handleLogin(email);
        navigate('/');
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <Authorisation
      title="Вход"
      buttonName="Войти"
      onUpdateAuth={handleLoginAuth}
    />
  );
}

export default Login;