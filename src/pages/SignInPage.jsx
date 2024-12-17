import React, { useContext, useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState(null);

  let changeUsername = (e, { value }) => {
    setUsername(value);
  };

  let changePassword = (e, { value }) => {
    setPassword(value);
  };

  const checkUser = async (username, password) => {
    let userService = new UserService();
    let result = await userService
      .login({
        userName: username,
        password: password,
      })
      .then((result) => {
        return result.data;
      });
    return result;
  };

  const getLoggedUser = async (userId) => {
    let userService = new UserService();
    await userService.getById(userId).then((result) => {
      setAuthenticatedUser(result.data.data);
    });
  };

  async function signIn() {
    const loginResult = await checkUser(username, password);

    if (loginResult.success) {
      setIsAuthenticated(true);
      getLoggedUser(loginResult.data);
      navigate("/homepage");

      return;
    }

    setErrorMessage(loginResult.message);
  }

  function redirectToRegister() {
    navigate("/register");
  }

  return (
    <Container className="register-container">
      <div
        style={{
          borderRadius: "15px",
          backgroundColor: "#e0f7fa",
          padding: "20px",
        }}
      >
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
                <label style={{ textAlign: "start", marginLeft: 5 }}>
                  Şifre
                </label>
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
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}
            </div>
          )}
        </Form>
      </div>
    </Container>
  );
}
