import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Row from "../ui/Row";
import styled from "styled-components";
import { useState } from "react";

function Cabins() {
  const Container = styled.div`
    display: flex;
    gap: 2.5rem;
    flex-direction: column;
  `;

  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Container>
        {" "}
        <Row type="horizontal">
          <Heading as="h1">All cabins</Heading>
          <p>test</p>
        </Row>
        <Row>
          <CabinTable />
        </Row>
        <Row>
          <Button
            variation="primary"
            onClick={() => setShowForm((show) => !show)}
          >
            {showForm ? "Close form" : "Add Cabin"}
          </Button>
        </Row>
        <Row> {showForm && <CreateCabinForm />}</Row>
      </Container>
    </>
  );
}

export default Cabins;
