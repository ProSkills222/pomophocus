import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import classes from "./EmailLogin.module.css";
import Button from "../Button/Button";
import { useRef } from "react";

export default function EmailLogin({ setIsOpenLogin, setIsOpenRegister }) {
  const modalRef = useRef(null);

  return (
    <Modal
      className={classes.modal}
      modalRef={modalRef}
      setIsOpen={setIsOpenLogin}
    >
      <div className={classes.container}>
        <h2 className={classes.title}>Login</h2>
        <h2 className={classes["field-name"]}>Username</h2>
        <div className={classes.input}>
          <Input />
        </div>
        <h2 className={classes["field-name"]}>Password</h2>
        <div className={classes.input}>
          <Input />
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
      </div>
    </Modal>
  );
}
