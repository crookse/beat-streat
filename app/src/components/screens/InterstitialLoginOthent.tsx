import { LoginButton } from "@othent/react-components";
import Overlay from "./Overlay";
import Close from "../icons/Close";

export default function InterstitialLoginOthent({
  onClose = () => console.log(`Not implemented`),
  onLogin = () => console.log(`Not implemented`),
  show = false,
}: {
  show?: boolean;
  onClose?: () => void;
  onLogin?: (retrievedWallet: any) => void;
}) {
  return (
    <Overlay show={show}>
      <div className="interstitial-login-othent h-full w-full flex flex-col justify-center items-center text-center text-slate-100">
        <button
          className="outline-none"
          onClick={() => {
            onClose();
          }}
        >
          <Close
            className="cursor-pointer bg-white shadow-md p-2 stroke-2 rounded-full absolute bottom-3 right-3 md:top-3 fill-black"
            size={10}
          />
        </button>
        <h2 className="text-2xl font-medium mb-8">
          We Use Othent.io
        </h2>
        <p className="max-w-md mb-8">
          Hello! We use Othent.io as our account login provider. Clicking the
          button below will open Othent's login process.
        </p>
        <LoginButton
          onlogin={(e) => {
            console.log("Successfully logged in");
            onLogin(e);
          }}
          apiid="YOUR_API_ID"
        >
          {/* Customized Othent button (copy-pasted from OG source code) */}
          <p className="bg-white px-4 py-3 rounded-full flex items-center mb-5">
            <svg
              width="38"
              height="auto"
              viewBox="0 0 44 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="othent-logo-svg mr-2"
            >
              <rect
                width="44"
                height="24"
                rx="12"
                fill="#2375EF"
              >
              </rect>
              <circle
                cx="32"
                cy="12"
                r="11.19276"
                fill="#F7F7FA"
              >
              </circle>
            </svg>
            <span className="text-sm text-slate-800 inline-block">
              Log in with Othent
            </span>
          </p>
        </LoginButton>
        <button
          className="outline-none font-bold text-sm"
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </button>
        <div className="mt-20 text-sm">
          Click here to learn more about Othent.io
        </div>
      </div>
    </Overlay>
  );
}
