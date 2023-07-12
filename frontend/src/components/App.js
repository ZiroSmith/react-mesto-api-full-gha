/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Register from "./Register";
import Login from "./Login";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main.js";
import Footer from "./Footer.js";
import { api } from "../utils/Api";
import InfoTooltip from "./InfoTooltip.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import * as Auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [isSuccessSignUp, setisSuccessSignUp] = React.useState(false);
  const [isImagePopupOpened, setImagePopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const [loggedEmail, setLoggedEmail] = React.useState("");

  const handleLogin = (email, password) => {
    return Auth.authorize(email, password).then((data) => {
      localStorage.setItem("token", data.token);
      setLoggedIn(true);
      navigate("/");
      setLoggedEmail(data.email);
    });
  };

  const handleRegister = (email, password) => {
    return Auth.register(email, password)
      .then(() => {
        setIsInfoTooltipPopupOpen(true);
        setisSuccessSignUp(true);
        navigate("/sign-in");
      })
      .catch(() => {
        setIsInfoTooltipPopupOpen(true);
        setisSuccessSignUp(false);
      });
  };


  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);


  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Auth.checkToken(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          navigate("/");
          setLoggedEmail(res.email);
        }
      })
      .catch((err) => console.log(`${err}`));
    }
  }, [isLoggedIn]);


  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`));
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`));
  }

  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`));
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`${err}`));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`${err}`));
  }

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData);
    setImagePopupOpened(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
    setImagePopupOpened(false);
  };

  function signOut() {
    localStorage.removeItem("token");
    navigate("/sign-in");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header loggedEmail={loggedEmail} signOut={signOut} />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccessSignUp={isSuccessSignUp}
          signUpText={
            isSuccessSignUp
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."
          }
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isImagePopupOpened={isImagePopupOpened}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
