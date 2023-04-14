import clsx from "clsx";
import Icon from "../Icon/Icon";
import classes from "./Modal.module.css";

export default function Modal({ children, className, modalRef, setIsOpen }) {
  return (
    <div className={classes.container}>
      <div className={classes.overlay} />
      <div className={clsx(classes.modal, className)} ref={modalRef}>
        {children}
        <button
          className={classes.closeButton}
          onClick={() => setIsOpen(false)}
        >
          <Icon name="close" />
        </button>
      </div>
    </div>
  );
}
