import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../mestoAuth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] =
    useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] =
    useState(false);
  const [isDeleteCardPopupLoading, setIsDeleteCardPopupLoading] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setDeletedCard(null);
    setSelectedCard(null);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleDeleteClick = (card) => {
    setDeletedCard(card);
  };

  function handleLogin(email) {
    setLoggedIn(true);
    setUserEmail(email);
  };

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.getContent(jwt)
      .then((res) => {
        handleLogin(res.data.email);
        navigate('/');
      })
      .catch((err) => console.log(err));
    }
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setUserEmail('');
  }

  useEffect(() => {
    tokenCheck();
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCards(cards);
        setCurrentUser(user);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    setIsEditProfilePopupLoading(true);
    api
      .editProfile({ name, about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setIsEditProfilePopupLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    setIsEditAvatarPopupLoading(true);
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        setIsEditAvatarPopupLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function handleAddCard({ name, link }) {
    setIsAddPlacePopupLoading(true);
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsAddPlacePopupLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteSubmit(e) {
    e.preventDefault();
    setIsDeleteCardPopupLoading(true);
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deletedCard._id));
        closeAllPopups();
        setIsDeleteCardPopupLoading(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={userEmail} onSignOut={onSignOut}/>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                onCardClick={(card) => handleCardClick(card)}
                onCardLike={(card) => handleCardLike(card)}
                cards={cards}
                onDeleteClick={(card) => handleDeleteClick(card)}
              />
            }
          />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isEditProfilePopupLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoading={isAddPlacePopupLoading}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
        />
        <DeleteCardPopup
          isOpen={deletedCard !== null}
          onClose={closeAllPopups}
          isLoading={isDeleteCardPopupLoading}
          onSubmit={handleDeleteSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isEditAvatarPopupLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
