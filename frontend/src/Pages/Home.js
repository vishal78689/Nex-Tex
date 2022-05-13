import React, { useEffect } from 'react'
import { ChatState } from "../context/ChatProvider";
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import{Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
const Home = () => {

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // setUser(userInfo);

    if (user) history.push("/chats");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
    return (
    <Container maxW='xl' centerContent>
    <Box
    d='flex'
    justifyContent="center"
    p={3}
    bg={'white'}
    w="100%"
    m="40px 0 15px 0"
    borderRadius="lg"
    borderWidth="1px"
     >
        <Text fontSize="4xl"
         fontfamily="work sans"
         color="black"
        >Nex-Tex</Text>
    </Box>
<Box bg="white"
w="100%"
p={4}
borderRadius='lg'
borderWidth="1px"
color="black"
>
<Tabs variant="soft-rounded" >
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Signup</Tab>
   
  </TabList>

  <TabPanels>
    <TabPanel>
     <Login />
    </TabPanel>
    <TabPanel>
  <Signup/>
    </TabPanel>
   
  </TabPanels>
</Tabs>
</Box>
    </Container>
    )
}

export default Home
