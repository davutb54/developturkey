import { useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, ButtonOr, Menu } from "semantic-ui-react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router";

export default function SignedIn() {
  const { setIsAuthenticated } = useContext(GlobalContext);
  const navigate = useNavigate();

  function SignOut() {
    setIsAuthenticated(false);
    navigate("/homepage");
  }

  function GoProfile() {
    navigate(`/myprofile`);
  }

  return (
    <Menu.Item
      content={
        <Button.Group
          children={[
            <Button
              icon="sign-out"
              content="Çıkış Yap"
              color="red"
              onClick={SignOut}
            />,
            <ButtonOr text={"<>"} />,
            <Button
              icon="id card"
              content="Profilim"
              color="green"
              onClick={GoProfile}
            />,
          ]}
        />
      }
    />
  );
}
