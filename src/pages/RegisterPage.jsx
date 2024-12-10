import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Page.css";
import { Form, Loader, Dimmer, Container } from "semantic-ui-react";
import UserService from "../services/UserService";
import { GlobalContext } from "../context/GlobalState";

export default function RegisterPage() {
  const { genders, cities } = useContext(GlobalContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState(null);
  const [city, setCity] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordReplay, setPasswordReplay] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);

  const navigate = useNavigate();

  const changeUsername = (e, { value }) => {
    setUsername(value);
  };

  const changeEmail = (e, { value }) => {
    setEmail(value);
  };

  const changeName = (e, { value }) => {
    setName(value);
  };

  const changeSurname = (e, { value }) => {
    setSurname(value);
  };

  const changeGender = (e, { value }) => {
    setGender(value);
  };

  const changeCity = (e, { value }) => {
    setCity(value);
  };

  const changePassword = (e, { value }) => {
    setPassword(value);
  };

  const changePasswordReplay = (e, { value }) => {
    setPasswordReplay(value);
  };

  const changeEmailCheck = (e, { checked }) => {
    setEmailCheck(checked);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const checkUserExists = async (username, email) => {
    let userService = new UserService();
    try {
      const userExists = await userService
        .checkUserExists({ username: username, email: email })
        .then((result) => result.data.data);
      return userExists;
    } catch (error) {
      console.error("Kullanıcı kontrolü yapılamadı:", error);
      return false;
    }
  };

  const register = async () => {
    if (/\s/.test(username)) {
      alert("Kullanıcı adında boşluk olmamalıdır.");
      return;
    }

    if (password.length < 8) {
      alert("Şifre en az 8 karakter olmalıdır.");
      return;
    }

    if (password !== passwordReplay) {
      alert("Şifreler eşleşmiyor.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Geçersiz e-posta adresi.");
      return;
    }

    if (!gender || !city) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    const userExists = await checkUserExists(username, email);
    if (userExists) {
      alert("Bu kullanıcı adı veya e-posta zaten kullanılıyor.");
      return;
    }

    let userService = new UserService();

    let user = {
      userName: username,
      name: name,
      surname: surname,
      email: email,
      password: password,
      cityCode: city,
      gender: gender,
      emailNotificationPermission: emailCheck,
    };

    try {
      await userService.addUser(user);
      navigate("/sign-in");
    } catch (error) {
      console.error("Kullanıcı eklenemedi:", error);
      alert("Kullanıcı eklenemedi. Lütfen tekrar deneyin.");
    }
  };

  return (
    <Container className="register-container">
      {cities == null || genders == null ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : (
        <Form onSubmit={register}>
          <Form.Group>
            <Form.Input
              width={7}
              required={true}
              name="username"
              placeholder="Kullanıcı Adınızı Belirleyiniz"
              onChange={changeUsername}
              label={
                <label style={{ textAlign: "start", marginLeft: 5 }}>
                  Kullanıcı Adı
                </label>
              }
            />
            <Form.Input
              width={9}
              required={true}
              name="email"
              placeholder="Email Adresinizi Giriniz"
              onChange={changeEmail}
              label={
                <label style={{ textAlign: "start", marginLeft: 5 }}>
                  Email
                </label>
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={6}
              required={true}
              name="name"
              placeholder="İsminizi Giriniz"
              onChange={changeName}
              label={
                <label style={{ textAlign: "start", marginLeft: 5 }}>
                  İsim
                </label>
              }
            />
            <Form.Input
              width={5}
              required={true}
              name="surname"
              placeholder="Soyisminizi Giriniz"
              onChange={changeSurname}
              label={
                <label style={{ textAlign: "start", marginLeft: 5 }}>
                  Soyisim
                </label>
              }
            />
            <Form.Select
              width={5}
              required={true}
              placeholder="Cinsiyetinizi Seçiniz"
              options={genders}
              onChange={changeGender}
              label={
                <label style={{ textAlign: "start", marginLeft: 5 }}>
                  Cinsiyet
                </label>
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Select
              width={5}
              required={true}
              options={cities}
              placeholder="Şehrinizi Seçiniz"
              onChange={changeCity}
              label={
                <label style={{ textAlign: "start", marginLeft: 5 }}>
                  Şehir
                </label>
              }
            />
            <Form.Input
              width={6}
              required={true}
              name="password"
              placeholder="Şifrenizi Belirleyiniz"
              onChange={changePassword}
              type="password"
              label={
                <label style={{ textAlign: "start", marginLeft: 5 }}>
                  Şifre
                </label>
              }
            />
            <Form.Input
              width={6}
              required={true}
              name="passwordrepeat"
              placeholder="Şifrenizi Doğrulayınız"
              onChange={changePasswordReplay}
              type="password"
              label={
                <label style={{ textAlign: "start", marginLeft: 5 }}>
                  Şifre Tekrar
                </label>
              }
            />
          </Form.Group>
          <Form.Checkbox
            label="Eposta yoluyla bildirimlerimi almak istiyorum"
            onChange={changeEmailCheck}
          />
          <Form.Button content="Kayıt Ol" />
        </Form>
      )}
    </Container>
  );
}
