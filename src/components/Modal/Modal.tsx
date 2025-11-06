"use client"

import Modal, { Styles } from "react-modal"

// Set the app element for accessibility on the client only
if (typeof window !== "undefined") {
  try {
    Modal.setAppElement("#__next")
  } catch (e) {
    // ignore
  }
}
import Cart from "../Cart/Cart"

interface CartModalProps {
  showModal: boolean;
  modelState: () => void;
}

const modalStyles: Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 20,
    cursor: "pointer",
  },
  content: {
    position: "absolute",
    height: "488px",
    top: "110px",
    bottom: "0",
    border: "1px solid #ccc",
    background: "white",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px",
    cursor: "auto",
  },
}

const CartModal = ({ showModal, modelState }: CartModalProps) => {
  return (
    <Modal
        ariaHideApp={false}
      style={modalStyles}
        closeTimeoutMS={300}
        isOpen={showModal}
        onRequestClose={modelState}
        contentLabel="Cart"
        id="modal"
        shouldCloseOnOverlayClick={true}
        className={"modalContent"}
      >
        <Cart closeCart={modelState} />
      </Modal>
  )
}

export default CartModal
