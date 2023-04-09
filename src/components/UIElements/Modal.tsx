import classes from "./Modal.module.css";
import Button from "./Button";

type ModalProps = {
  closeModal: () => void;
};

function Modal({ closeModal }: ModalProps) {
  return (
    <div className={classes.modal_container}>
      <form>
        <Button>SENDEN</Button>
      </form>
    </div>
  );
}

export default Modal;
