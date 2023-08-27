import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { HStack } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import { useContext, useCallback } from "react";
import * as Yup from "yup";
import { GroupMessagesContext, SocketContext } from "./Home";

const GroupChatBox = ({ groupId, userId }) => {
  const { setGroupMessages } = useContext(GroupMessagesContext);
  
  const { socket } = useContext(SocketContext);

  const sendGroupMessage = useCallback((values, actions) => {
    const message = { to: groupId, from: userId, content: values.message };
    socket.emit("gm", message);
    setGroupMessages(prevMsgs => [message, ...prevMsgs]);
    actions.resetForm();
  }, [groupId, setGroupMessages, socket, userId])

  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={Yup.object({
        message: Yup.string().min(1).max(255),
      })}
      onSubmit={sendGroupMessage}
    >
      <HStack as={Form} w="100%" pb="1.4rem" px="1.4rem">
        <Input
          as={Field}
          name="message"
          placeholder="Type message here.."
          size="lg"
          autoComplete="off"
        />
        <Button type="submit" size="lg" colorScheme="teal">
          Send
        </Button>
      </HStack>
    </Formik>
  );
};

export default GroupChatBox;
