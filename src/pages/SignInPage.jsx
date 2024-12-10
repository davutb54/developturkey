import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Container, Form } from "semantic-ui-react";
import UserService from "../services/UserService";
import { GlobalContext } from "../context/GlobalState";

export default function SignInPage() {
  const { setIsAuthenticated, setAuthenticatedUser } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [user, setuser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let userService = new UserService();
    userService
      .getByUsername(username)
      .then((result) => setuser(result.data.data))
      .catch((error) => console.error(error));
  }, [username]);

  let changeUsername = (e, { value }) => {
    setUsername(value);
  };

  let changePassword = (e, { value }) => {
    setPassword(value);
  };

  function signIn() {
    if (user !== null) {
      if (user.password === password) {
        setIsAuthenticated(true);
        setAuthenticatedUser(user);
        navigate("/homepage");
      } else {
        setErrorMessage("Şifre yanlış.");
      }
    } else {
      setErrorMessage("Kullanıcı bulunamadı.");
    }
  }

  function redirectToRegister() {
    navigate("/register");
  }

  return (
    <Container className="register-container">
      <Form onSubmit={signIn}>
        <Form.Group>
          <Form.Input
            width={8}
            required={true}
            name="username"
            placeholder="Kullanıcı Adınızı Giriniz"
            onChange={changeUsername}
            label={
              <label style={{ textAlign: "start", marginLeft: 5 }}>
                Kullanıcı Adı
              </label>
            }
          />
          <Form.Input
            width={8}
            required={true}
            name="password"
            placeholder="Şifrenizi Giriniz"
            type="password"
            onChange={changePassword}
            label={
              <label style={{ textAlign: "start", marginLeft: 5 }}>Şifre</label>
            }
          />
        </Form.Group>
        <Form.Button content="Giriş Yap" />
        <Form.Button
          type="button"
          content="Kayıt Ol"
          onClick={redirectToRegister}
        />
        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
        )}
      </Form>
    </Container>
  );
}
