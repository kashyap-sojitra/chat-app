import { Grid, GridItem, Tabs, TabPanels, TabPanel, TabList, Tab } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import socketConn from "../../socket";
import { AccountContext } from "../AccountContext";
import Chat from "./Chat";
import GroupChat from "./GroupChat";
import Sidebar from "./Sidebar";
import GroupSidebar from "./GroupSidebar"
import useSocketSetup from "./useSocketSetup";

export const FriendContext = createContext();
export const GroupContext = createContext();
export const GroupMessagesContext = createContext();
export const MessagesContext = createContext();
export const SocketContext = createContext();

const Home = () => {
  const [friendList, setFriendList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);
  const [friendIndex, setFriendIndex] = useState(0);
  const [groupIndex, setGroupIndex] = useState(0);

  const { user } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => socketConn(user));

  useEffect(() => {
    setSocket(() => socketConn(user));
  }, [user]);

  useSocketSetup(setFriendList, setMessages, setGroupList, setGroupMessages, socket);

  return (
    <Tabs variant='enclosed'>
      <TabList>
        <Tab>Personal Chats</Tab>
        <Tab>Group Chats</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <FriendContext.Provider value={{ friendList, setFriendList }} key={'friend-list'}>
            <SocketContext.Provider value={{ socket }}>
              <Grid
                templateColumns="repeat(10, 1fr)"
                h="100vh"
                as={Tabs}
                onChange={index => setFriendIndex(index)}
              >
                <GridItem colSpan="3" borderRight="1px solid gray">
                  <Sidebar />
                </GridItem>
                <GridItem colSpan="7" maxH="100vh">
                  <MessagesContext.Provider value={{ messages, setMessages }}>
                    <Chat userid={friendList[friendIndex]?.userid} />
                  </MessagesContext.Provider>
                </GridItem>
              </Grid>
            </SocketContext.Provider>
          </FriendContext.Provider>
        </TabPanel>

        <TabPanel>
          <GroupContext.Provider value={{ groupList, setGroupList }} key={'group-list'}>
            <SocketContext.Provider value={{ socket }}>
              <Grid
                templateColumns="repeat(10, 1fr)"
                h="100vh"
                as={Tabs}
                onChange={index => setGroupIndex(index)}
              >
                <GridItem colSpan="3" borderRight="1px solid gray">
                  <GroupSidebar />
                </GridItem>
                
                <GridItem colSpan="7" maxH="100vh">
                  <GroupMessagesContext.Provider value={{ groupMessages, setGroupMessages }}>
                    <GroupChat groupId={groupList[groupIndex]?.groupId} userToken={user?.token} />
                  </GroupMessagesContext.Provider>
                </GridItem>
              </Grid>
            </SocketContext.Provider>
          </GroupContext.Provider>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Home;
