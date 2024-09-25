/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateEditCabinForm from "./CreateCabinForm";
import Row from "../../ui/Row";
import Button from "../../ui/Button";

function AddCabin({ cabinData = {}, editSession = false }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Row>
        <Button
          variation="primary"
          onClick={() => setShowModal((show) => !show)}
        >
          Add Cabin
        </Button>
      </Row>
      <Row>
        {showModal && (
          <Modal onClose={() => setShowModal((showModal) => !showModal)}>
            <CreateEditCabinForm
              setShowModal={setShowModal}
              cabinData={cabinData}
              editSession={editSession}
            />
          </Modal>
        )}
      </Row>
    </>
  );
}

export default AddCabin;
