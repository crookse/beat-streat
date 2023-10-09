import { useState } from "react";
import { env } from "../../utils/env";
import Avatar from "../core/Avatar";
import LoginDoor from "../icons/LoginDoor";
import InterstitialLoginOthent from "../screens/InterstitialLoginOthent";

const config = {
  enable_login: env("REACT_APP_FLAG_ENABLE_LOGIN_OTHENT", true),
};

export default function AvatarWithLoginProxy({
  isLoggedIn = false,
  onClickAvatar = () => console.log("Not implemented"),
  onLogin = () => console.log("Not implemented"),
}: {
  isLoggedIn?: boolean;
  onClickAvatar: () => void;
  onLogin: (_retrievedWallet: any) => void;
}) {
  const [show, setShow] = useState<boolean>(false);

  if (!config.enable_login) {
    return null;
  }

  return (
    <div className="flex">
      <InterstitialLoginOthent
        show={show}
        onLogin={(retrievedWallet) => {
          onLogin(retrievedWallet);
          setShow(false);
        }}
        onClose={() => {
          setShow(false);
        }}
      />
      {!isLoggedIn && (
        <button
          className="outline-none"
          onClick={() => {
            console.log("Showing");
            setShow(true);
          }}
        >
          <LoginDoor />
        </button>
      )}
      {isLoggedIn && (
        <Avatar
          onClick={onClickAvatar}
        />
      )}
    </div>
  );
}
