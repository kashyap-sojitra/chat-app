import { Text, VStack } from "@chakra-ui/layout";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";
import { useContext, useEffect, useRef, useState } from "react";
import GroupChatBox from "./GroupChatBox";
import { GroupMessagesContext, GroupContext } from "./Home";

const GroupChat = ({ groupId, userToken }) => {
  const { groupList } = useContext(GroupContext);
  const { groupMessages } = useContext(GroupMessagesContext);
  const bottomDiv2 = useRef(null);
  const [userId, setUserId] = useState("")

  useEffect(() => {
    bottomDiv2.current?.scrollIntoView();

    if (!userToken) { return ""; }
    
    const base64Url = userToken.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const user =  JSON.parse(window.atob(base64));
    
    setUserId(user?.userid);
  }, [userToken]);

  return groupList.length > 0 ? (
    <VStack h="100%" justify="end" key={`groupchat`}>
      <TabPanels overflowY="scroll">
        {groupList.map(group => (
          <VStack
            flexDir="column-reverse"
            as={TabPanel}
            key={`groupchat:${group.groupId}`}
            w="100%"
          >
            <div ref={bottomDiv2} />
            {groupMessages
              .filter(
                msg => msg.to === group.groupId
              )
              .map((message, idx) => (
                <Text
                  m={
                    message.from !== userId
                      ? "1rem auto 0 0 !important"
                      : "1rem 0 0 auto !important"
                  }
                  maxW="50%"
                  key={`groupmsg:${group.groupId}.${idx}`}
                  fontSize="lg"
                  bg={message.from !== userId ? "gray.100" : "blue.100"}
                  color="gray.800"
                  borderRadius="10px"
                  p="0.5rem 1rem"
                >
                  {message.content}
                </Text>
              ))}
          </VStack>
        ))}
      </TabPanels>
      <GroupChatBox groupId={groupId} userId={userId} />
    </VStack>
  ) : (
    <VStack
      justify="center"
      pt="5rem"
      w="100%"
      textAlign="center"
      fontSize="lg"
    >
      <TabPanels>
        <TabPanel>
          <Text>No groups :( Click add group to start chatting</Text>
        </TabPanel>
      </TabPanels>
    </VStack>
  );
};

export default GroupChat;
