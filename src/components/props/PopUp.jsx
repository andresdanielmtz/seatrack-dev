import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react"; // Make sure to add this import
import axios from "axios";
import { toast } from "react-toastify";

export default function PopUp({ onClose, latitude, longitude }) {
  const { isOpen, onOpen } = useDisclosure();
  const cancelRef = React.useRef();
  const [title, setTitle] = React.useState("");

  function uploadCoords() {
    axios({
      method: "POST",
      url: "/register_coord",
      data: {
        name: title,
        latitude: latitude,
        longitude: longitude,
      },
    })
      .then((response) => {
        console.log(response);
        toast.success("Coordinates uploaded successfully!"); // Show success notification
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error uploading coordinates. Please try again."); // Show error notification
      });
  }

  function uploadButtonHandler() {
    if (title === "") {
      toast.error("Please enter a title.");
      return;
    }
    uploadCoords();
    onClose();
  }
  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Upload these coordinates?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to upload these coordinates?
            <p className="">
              Latitude: <span className="italic font-bold"> {latitude} </span>
              <br />
              Longitude: <span className="italic font-bold"> {longitude} </span>
            </p>
            <br />
            If so, fill out the form below and click "Upload".
            <br />
            <div className="mb-4">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-md border p-2 w-full"
              />
            </div>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="red" ml={3} onClick={uploadButtonHandler}>
              Upload
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
