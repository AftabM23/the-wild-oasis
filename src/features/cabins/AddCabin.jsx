/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { useState } from "react";
// import Row from "../../ui/Row";
import Modal from "../../ui/Modal";
import CreateEditCabinForm from "./CreateCabinForm";

import Button from "../../ui/Button";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add Cabin</Button>
      </Modal.Open>
      <Modal.WindowModal name="cabin-form">
        <CreateEditCabinForm />
      </Modal.WindowModal>
    </Modal>
  );
  // return (
  //   <>
  //     <Row>
  //       <Button
  //         variation="primary"
  //         onClick={() => setShowModal((show) => !show)}
  //       >
  //         Add Cabin
  //       </Button>
  //     </Row>
  //     <Row>
  //       {showModal && (
  //         <Modal onClose={() => setShowModal((showModal) => !showModal)}>
  //           <CreateEditCabinForm
  //             setShowModal={setShowModal}
  //             cabinData={cabinData}
  //             editSession={editSession}
  //           />
  //         </Modal>
  //       )}
  //     </Row>
  //   </>
  // );
}

export default AddCabin;
