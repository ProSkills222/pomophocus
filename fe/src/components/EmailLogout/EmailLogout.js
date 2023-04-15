import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import classes from "./EmailLogout.module.css";
import Button from "../Button/Button";
import { useRef, useState, useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import AuthService from "../AuthService/AuthService";

export default function EmailLogout({ setIsOpenLogout }) {
  const LOGOUT_URL = "/logout";
  const modalRef = useRef(null);

  const { auth, setAuth } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(LOGOUT_URL, {
        headers: { "Content-Type": "application/json" },
      });

      AuthService.logout();

      setAuth({});
    } catch (err) {}
  };

  return (
    <>
      {
        <Modal
          className={classes.modal}
          modalRef={modalRef}
          setIsOpen={setIsOpenLogout}
        >
          <form className={classes.container} onSubmit={handleSubmit}>
            <div className={classes.button}>
              <Button>Logout</Button>
            </div>
          </form>
        </Modal>
      }
    </>
  );
}
