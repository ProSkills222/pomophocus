import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import classes from "./EmailLogin.module.css";
import Button from "../Button/Button";
import { useRef, useState, useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

export default function EmailLogin({ setIsOpenLogin, setIsOpenRegister }) {
  const LOGIN_URL = "/login";
  const modalRef = useRef(null);
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { auth, setAuth } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          username,
        })
      );

      setAuth({ username });
      setUsername("");
      setPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg(err.response.data.message);
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {
        <Modal
          className={classes.modal}
          modalRef={modalRef}
          setIsOpen={setIsOpenLogin}
        >
          <form className={classes.container} onSubmit={handleSubmit}>
            <p ref={errRef} className={errMsg ? classes.errmsg : classes.hide}>
              {errMsg}
            </p>
            <h2 className={classes.title}>Login</h2>
            <h2 className={classes["field-name"]}>Username</h2>
            <div className={classes.input}>
              <Input onChange={(e) => setUsername(e.target.value)} />
            </div>
            <h2 className={classes["field-name"]}>Password</h2>
            <div className={classes.input}>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={classes.button}>
              <Button>Login</Button>
            </div>
            <button
              className={classes["link-button"]}
              onClick={() => {
                setIsOpenLogin(false);
                setIsOpenRegister(true);
              }}
            >
              Create account
            </button>
          </form>
        </Modal>
      }
    </>
  );
}
