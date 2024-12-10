import { useNavigate } from "react-router";
import "semantic-ui-css/semantic.min.css";
import { Button, ButtonOr, Menu } from "semantic-ui-react";

export default function SignedOut({ signIn }) {
  const navigate = useNavigate();

  function toRegister() {
    navigate("/register");
  }

  function toSignIn() {
    navigate("/sign-in");
  }

  return (
    <Menu.Item>
      <Button.Group>
        <Button
          icon="sign-in"
          content="Giriş Yap"
          color="teal"
          onClick={toSignIn}
        />
        ,
        <ButtonOr text={"<>"} />,
        <Button
          icon="id card"
          content="Kayıt Ol"
          color="green"
          onClick={toRegister}
        />
        ,
      </Button.Group>
    </Menu.Item>
  );
}
