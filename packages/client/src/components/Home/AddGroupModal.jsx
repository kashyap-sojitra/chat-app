import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
  } from "@chakra-ui/modal";
  import { Button, Heading, ModalOverlay } from "@chakra-ui/react";
  import { groupSchema } from "@chat-app/common";
  import { Form, Formik } from "formik";
  import { useCallback, useContext, useState } from "react";
  import TextField from "../TextField";
  import { GroupContext, SocketContext } from "./Home";
  
  const AddGroupModal = ({ isOpen, onClose }) => {
    const [error, setError] = useState("");
    const closeModal = useCallback(() => {
      setError("");
      onClose();
    }, [onClose]);
    
    const { setGroupList } = useContext(GroupContext);
    const { socket } = useContext(SocketContext);

    const addNewGroup = useCallback(values => {
      socket.emit(
        "add_group",
        values.groupId,
        ({ errorMsg, done, newGroup }) => {
          if (done) {
            setGroupList(c => [newGroup, ...c]);
            closeModal();
            return;
          }
          setError(errorMsg);
        }
      );
    }, [closeModal, setGroupList, socket]);

    return (
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a group!</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ groupId: "" }}
            onSubmit={addNewGroup}
            validationSchema={groupSchema}
          >
            <Form>
              <ModalBody>
                <Heading fontSize="xl" color="red.500" textAlign="center">
                  {error}
                </Heading>
                <TextField
                  label="Group's Id"
                  placeholder="Enter group's id.."
                  autoComplete="off"
                  name="groupId"
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    );
  };
  
  export default AddGroupModal;
  