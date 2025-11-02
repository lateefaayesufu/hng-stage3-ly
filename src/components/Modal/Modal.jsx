"use client"

import Modal from "react-modal"
import Cart from "../Cart/Cart"

const CartModal = ({ showModal, modelState }) => {
  return (
    <div>
      <Modal
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: "20",
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
        }}
        closeTimeoutMS={800}
        isOpen={showModal}
        onRequestClose={!showModal}
        contentLabel="Cart"
        id="modal"
        onRequestClose={() => modelState()}
        shouldCloseOnOverlayClick={true}
        className={"modalContent"}
      >
        <Cart closeCart={modelState} />
      </Modal>
    </div>
  )
}

export default CartModal
