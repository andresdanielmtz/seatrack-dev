import React, { useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  useDisclosure,
} from "@chakra-ui/react"; // Make sure to add this import

export default function SignUpPopUp({ onClose }) {
  const { isOpen, onOpen } = useDisclosure();
  const cancelRef = useRef();
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
          <AlertDialogHeader>Welcome to Seatrack!</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            To use Seatrack, be sure to first check out the{" "}
            <a className="text-blue-500" href="/instructions">
              {" "}
              instructions{" "}
            </a>{" "}
            and then{" "}
            <a className="text-blue-500" href="/login">
              {" "}
              log in{" "}
            </a>
            .
            <br /> Thank you!
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
