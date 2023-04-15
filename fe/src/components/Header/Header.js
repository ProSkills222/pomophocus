import { useState, useContext } from "react";
import Logo from "../Logo/Logo";
import Icon from "../Icon/Icon";
import classes from "./Header.module.css";
import EmailLogin from "../EmailLogin/EmailLogin";
import EmailLogout from "../EmailLogout/EmailLogout";
import Settings from "../Settings/Settings";
import Report from "../Report";
import EmailRegister from "../EmailRegister/EmailRegister";
import AuthContext from "../../context/AuthProvider";
import AuthService from "../AuthService/AuthService";

function Button({ icon, children, onClick }) {
  return (
    <button className={classes.button} onClick={onClick}>
      <Icon name={icon} />
      <span className={classes.label}>{children}</span>
    </button>
  );
}

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);
  const currUser = AuthService.getCurrentUser();
  console.log({ showLogin, showLogout });
  return (
    <header className={classes.container}>
      <div className={classes.content}>
        <Logo />
        <ul className={classes.nav}>
          <li>
            <Button
              icon="insert_chart_outlined"
              onClick={() => setShowReport(true)}
            >
              Report
            </Button>
            {showReport && <Report setIsOpen={setShowReport} />}
          </li>
          <li>
            <Button icon="settings" onClick={() => setShowSetting(true)}>
              Setting
            </Button>
            {showSetting && <Settings setIsOpen={setShowSetting} />}
          </li>
          <li>
            {!currUser ? (
              <Button icon="account_circle" onClick={() => setShowLogin(true)}>
                Login
              </Button>
            ) : (
              <Button icon="account_circle" onClick={() => setShowLogout(true)}>
                {currUser.username}
              </Button>
            )}

            {!currUser && showLogin && (
              <EmailLogin
                setIsOpenLogin={setShowLogin}
                setIsOpenRegister={setShowRegister}
              />
            )}
            {currUser && showLogout && (
              <EmailLogout setIsOpenLogout={setShowLogout} />
            )}
          </li>
          {showRegister && (
            <EmailRegister
              setIsOpenRegister={setShowRegister}
              setIsOpenLogin={setShowLogin}
            />
          )}
        </ul>
      </div>
    </header>
  );
}
