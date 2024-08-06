"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import MapContainer from "./MapContainer";

export default function Component(props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>View</Button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size={"6xl"}>
        <div className="flex flex-row justify-between">
          <div className="font-serif text-3xl pt-2 pl-8" > {props.gem.name} </div>        
          <Button className="w-1/4 justify-content-end" onClick={() => setOpenModal(false)}>Close</Button>
        </div>

          <Modal.Body className="size-full flex flex-row">
            <divleft className="w-1/2 h-[600px] border-4 border-red-700 pr-3">
              This is called divleft in Modal.jsx.
            </divleft>

            <divright className="w-1/2 h-[600px] pl-3">
              <MapContainer className="size-full h-[600px]" gems={[props.gem]}/>
            </divright>
          </Modal.Body>
      </Modal>
    </>
  );
}