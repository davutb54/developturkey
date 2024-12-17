import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import {
  Form,
  Button,
  Container,
  Header,
  Segment,
  Grid,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import UserService from "../services/UserService";

export default function MyProfilePage() {
  const { authenticatedUser, cities, genders, setAuthenticatedUser } =
    useContext(GlobalContext);
  const [user, setUser] = useState({
    name: authenticatedUser.name,
    surname: authenticatedUser.surname,
    email: authenticatedUser.email,
    cityCode: authenticatedUser.cityCode,
    gender: authenticatedUser.gender,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);

  const getLoggedUser = async (userId) => {
    let userService = new UserService();
    await userService.getById(userId).then((result) => {
      setAuthenticatedUser(result.data.data);
    });
  };

  const handlePasswordEdit = () => {
    setIsPasswordEditing(true);
  };

  const handlePasswordCancel = () => {
    setIsPasswordEditing(false);
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email)) {
      alert("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }
    let userService = new UserService();
    await userService
      .updateUser({
        id: authenticatedUser.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        cityCode: user.cityCode,
        genderCode: user.gender,
      })
      .then((response) => {
        setIsEditing(false);
        getLoggedUser(authenticatedUser.id);
      })
      .catch((error) => console.error(error));
  };

  const changepassword = async () => {
    let userService = new UserService();
    let result = await userService
      .updatePassword({
        id: authenticatedUser.id,
        oldPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      })
      .then((result) => {
        return result.data;
      });
    return result;
  };

  const handlePasswordSubmit = async (e) => {
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("Yeni şifreler eşleşmiyor.");
      return;
    }

    const change = await changepassword();
    if (change.success) {
      alert("Şifre başarıyla değiştirildi.");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setIsPasswordEditing(false);

      return;
    }

    alert(change.message);
  };

  const handleCancel = () => {
    setUser({
      name: authenticatedUser.name,
      surname: authenticatedUser.surname,
      email: authenticatedUser.email,
      cityCode: authenticatedUser.cityCode,
      gender: authenticatedUser.gender,
    });
    setIsEditing(false);
  };

  const getStatusIcons = () => {
    const icons = [];
    if (user.isAdmin) icons.push("⭐");
    if (user.isReported) icons.push("⚠️");
    if (user.isDeleted) icons.push("❌");
    if (user.isBanned) icons.push("🚫");
    return icons.join(" ");
  };

  if (!genders || !cities) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  return (
    <Container>
      <Header as="h1" textAlign="center">
        Bilgilerim
      </Header>
      <Segment>
        {isEditing ? (
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>İsim</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Soyisim</label>
              <input
                type="text"
                name="surname"
                value={user.surname}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Şehir</label>
              <select
                name="cityCode"
                value={user.cityCode}
                onChange={handleChange}
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.text}
                  </option>
                ))}
              </select>
            </Form.Field>
            <Form.Field>
              <label>Cinsiyet</label>
              <select name="gender" value={user.gender} onChange={handleChange}>
                {genders.map((gender) => (
                  <option key={gender.value} value={gender.value}>
                    {gender.text}
                  </option>
                ))}
              </select>
            </Form.Field>
            <Button type="submit" primary>
              Kaydet
            </Button>
            <Button type="button" onClick={handleCancel}>
              İptal et
            </Button>
          </Form>
        ) : (
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={16}>
                <p>
                  <strong>Kullanıcı Adı:</strong> {getStatusIcons()}{" "}
                  {authenticatedUser.userName}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <p>
                  <strong>İsim:</strong> {authenticatedUser.name}
                </p>
              </Grid.Column>
              <Grid.Column width={8}>
                <p>
                  <strong>Soyisim:</strong> {authenticatedUser.surname}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <p>
                  <strong>Email:</strong> {authenticatedUser.email}
                </p>
              </Grid.Column>
              <Grid.Column width={8}>
                <p>
                  <strong>Şehir:</strong> {authenticatedUser.cityName}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <p>
                  <strong>Cinsiyet:</strong> {authenticatedUser.gender}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Button onClick={() => setIsEditing(true)} primary>
              Düzenle
            </Button>
          </Grid>
        )}
      </Segment>
      <Segment>
        <Header as="h2" textAlign="center">
          Şifre Değiştir
        </Header>
        {isPasswordEditing ? (
          <Form onSubmit={handlePasswordSubmit}>
            <Form.Field>
              <label>Geçerli Şifre</label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Yeni Şifre</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Yeni Şifre (Tekrar)</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={passwords.confirmNewPassword}
                onChange={handlePasswordChange}
                required
              />
            </Form.Field>
            <Button type="submit" primary>
              Şifreyi Değiştir
            </Button>
            <Button type="button" onClick={handlePasswordCancel}>
              İptal et
            </Button>
          </Form>
        ) : (
          <Button onClick={handlePasswordEdit} primary>
            Şifre Değiştir
          </Button>
        )}
      </Segment>
    </Container>
  );
}
