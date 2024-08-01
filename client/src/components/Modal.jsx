"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import MapContainer from "./MapContainer";

export default function Component(props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>View</Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{props.name}</Modal.Header>
        <Modal.Body>
          <div className="w-[400px] h-[400px]">
          <MapContainer gems={[props.gem]}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}