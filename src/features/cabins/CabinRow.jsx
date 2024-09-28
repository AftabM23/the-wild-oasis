/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import { useState } from "react";
import CreateEditCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import useCreateCabins from "./useCreateCabins";
import Modal from "../../ui/Modal";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  margin-left: 0.5rem;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 700;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { deleteCabin, isDleteting } = useDeleteCabin();
  const { creatingCabin, createCabin } = useCreateCabins();

  const { id, name, maxCapacity, description, regularPrice, discount, image } =
    cabin;
  const handleDuplicatecabin = () => {
    createCabin({
      name: `copy of ${name}`,
      maxCapacity,
      description,
      regularPrice,
      discount,
      image,
    });
  };
  return (
    <>
      <TableRow>
        <Img src={image}></Img>
        <Cabin>{name}</Cabin>
        <div>Fits upto {maxCapacity} Guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <TableRow>
          <Modal>
            <Modal.Open opens="edit-form">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.WindowModal name="edit-form">
              <CreateEditCabinForm cabinData={cabin} />
            </Modal.WindowModal>
          </Modal>

          <button onClick={() => deleteCabin(id)} disabled={isDleteting}>
            <HiTrash />
          </button>
          <button disabled={creatingCabin} onClick={handleDuplicatecabin}>
            <HiSquare2Stack />
          </button>
        </TableRow>
      </TableRow>
    </>
  );
}

export default CabinRow;
