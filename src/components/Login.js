import React, { useState } from "react";
import Authorisation from "./Authorisation";
import { useNavigate } from "react-router-dom";
import * as auth from "../mestoAuth";
import InfoTooltip from "./InfoTooltip";
import errorImage from "../images/errorImage.svg";

function Login({ handleLogin }) {
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [infoPic, setInfoPic] = useState("");
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const { email, password } = formValue;

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          handleLogin(email);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setMessage(err);
        setInfoPic(errorImage);
      });
  };

  function closeInfoTools() {
    setIsInfoTooltipOpen(false);
  }

  return (
    <>
      <Authorisation
        title="Вход"
        buttonName="Войти"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        email={email}
        password={password}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isClose={closeInfoTools}
        message={message}
        infoPic={infoPic}
      />
    </>
  );
}

export default Login;
