"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import MapContainer from "./MapContainer";

export default function Component(props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>View</Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} className="w-auto h-full">
        <Button className="flex flex-row basis-1/4" onClick={() => setOpenModal(false)}>Close</Button>
        <div className="h-[600px]"> 
          <Modal.Body className="size-full">
            <div className="size-full">
              <MapContainer className="size-full" gems={[props.gem]}/>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}