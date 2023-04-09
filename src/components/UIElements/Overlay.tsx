import classes from "./Overlay.module.css";

type ModalProps = {
  closeModal: () => void;
};

function Overlay({ closeModal }: ModalProps) {
  return <div onClick={closeModal} className={classes.overlay}></div>;
}

export default Overlay;
