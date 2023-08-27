import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ChatIcon } from "@chakra-ui/icons";
import {
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Tab, TabList } from "@chakra-ui/tabs";
import { useContext } from "react";
import AddGroupModal from "./AddGroupModal";
import { GroupContext } from "./Home";

const GroupSidebar = () => {
  const { groupList } = useContext(GroupContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack py="1.4rem" key={'group'}>
        <HStack justify="space-evenly" w="100%">
          <Heading size="md">Add Group</Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />

        <VStack as={TabList} key={'group-list'}>
          {groupList.map((group, index) => (
            <HStack as={Tab} key={`group-${group.groupId}-${index}`}>
              <Text>{group.groupId}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
      <AddGroupModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default GroupSidebar;
