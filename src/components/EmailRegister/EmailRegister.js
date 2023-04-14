import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import classes from "./EmailRegister.module.css";
import Button from "../Button/Button";
import { useRef } from "react";

export default function EmailRegister({ setIsOpenRegister, setIsOpenLogin }) {
  const modalRef = useRef(null);

  return (
    <Modal
      className={classes.modal}
      modalRef={modalRef}
      setIsOpen={setIsOpenRegister}
    >
      <div className={classes.container}>
        <h2 className={classes.title}>Register</h2>
        <h2 className={classes["field-name"]}>Username</h2>
        <div className={classes.input}>
          <Input />
        </div>
        <h2 className={classes["field-name"]}>Password</h2>
        <div className={classes.input}>
          <Input />
        </div>
        <div className={classes.button}>
          <Button>Register</Button>
        </div>

        <button
          className={classes["link-button"]}
          onClick={() => {
            setIsOpenLogin(true);
            setIsOpenRegister(false);
          }}
        >
          Already have an account? Login
        </button>
      </div>
    </Modal>
  );
}
