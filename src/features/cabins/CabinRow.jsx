/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabin";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

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
const BtnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
function CabinRow({ cabin }) {
  const [editSession, setEditSession] = useState(false);

  const queryClient = useQueryClient();
  const { isLoading: isDleteting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("cabin deleted succesfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow>
        <Img src={cabin.image}></Img>
        <Cabin>{cabin.name}</Cabin>
        <div>Fits upto {cabin.maxCapacity} Guests</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        <Discount>{formatCurrency(cabin.discount)}</Discount>
        <BtnsContainer>
          {" "}
          <button onClick={() => setEditSession(!editSession)}>
            Edit Cabin
          </button>
          <button onClick={() => mutate(cabin.id)} disabled={isDleteting}>
            {isDleteting ? "Deleting" : "Delete"}
          </button>
        </BtnsContainer>
      </TableRow>
      {editSession && (
        <CreateCabinForm cabinData={cabin} editSession={editSession} />
      )}
    </>
  );
}

export default CabinRow;
