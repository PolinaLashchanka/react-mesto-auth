import React, { useState } from "react";
import Authorisation from "./Authorisation";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/mestoAuth";
import InfoTooltip from "./InfoTooltip";
import errorImage from "../images/errorImage.svg";
import acceptImage from "../images/acceptImage.svg";

function Register() {
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
      .register(password, email)
      .then(() => {
        setMessage("Вы успешно зарегистрировались!");
        setInfoPic(acceptImage);
      })
      .catch((err) => {
        setMessage(err);
        setInfoPic(errorImage);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      })
  };

  function closeInfoTools() {
    setIsInfoTooltipOpen(false);
    if (message === "Вы успешно зарегистрировались!") {
      navigate("/sign-in");
    } else {
      setFormValue({ email: "", password: "" });
    }
  }

  return (
    <>
      <Authorisation
        title="Регистрация"
        buttonName="Зарегистироваться"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        email={email}
        password={password}
      >
        <Link to="/sign-in" className="authorisation__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </Authorisation>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isClose={closeInfoTools}
        message={message}
        infoPic={infoPic}
      />
    </>
  );
}

export default Register;
