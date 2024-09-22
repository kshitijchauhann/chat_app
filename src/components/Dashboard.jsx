import React, { useState } from 'react';
import {
  Box, Flex, Text, VStack, HStack, Input, Button, Avatar,
  Container, Icon, List, ListItem, InputGroup, InputRightElement,
  useBreakpointValue, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure,
  Tooltip
} from '@chakra-ui/react';
import { SearchIcon, SettingsIcon, ArrowForwardIcon, ChatIcon, HamburgerIcon, InfoIcon, BellIcon } from '@chakra-ui/icons';

const IlvuLogo = () => (
  <svg viewBox="0 0 400 120" width="100%" height="100%">
    <defs>
      <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" 
          fontSize="96" fontFamily="'Orbitron', sans-serif" fontWeight="bold"
          fill="url(#neonGradient)" filter="drop-shadow(0 0 5px #FFD700)">
      ilvu
    </text>
  </svg>
);

const ContactItem = ({ name, lastMessage, isActive, onClick }) => (
  <ListItem 
    onClick={onClick}
    bg={isActive ? "gray.700" : "transparent"}
    _hover={{ bg: "gray.700" }}
    cursor="pointer"
    borderRadius="md"
    p={2}
  >
    <HStack spacing={3}>
      <Avatar size="sm" name={name} />
      <Box flex={1}>
        <Text color="white" fontWeight="bold">{name}</Text>
        <Text color="gray.400" fontSize="sm" noOfLines={1}>{lastMessage}</Text>
      </Box>
    </HStack>
  </ListItem>
);

const ChatMessage = ({ message, isUser }) => (
  <Box 
    alignSelf={isUser ? "flex-end" : "flex-start"}
    bg={isUser ? "yellow.500" : "gray.600"}
    color={isUser ? "gray.800" : "white"}
    borderRadius="lg"
    px={3}
    py={2}
    maxWidth="70%"
  >
    <Text>{message}</Text>
  </Box>
);

const LeftNavStrip = () => (
  <VStack spacing={4} align="center" py={4} bg="gray.800" h="100%" width="70px" borderRight="1px" borderColor="gray.700">
    <Avatar size="md" name="User Name" src="/path-to-user-avatar.jpg" />
    <Tooltip label="Chats" placement="right">
      <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "gray.700" }}>
        <Icon as={ChatIcon} boxSize={6} />
      </Button>
    </Tooltip>
    <Tooltip label="Status" placement="right">
      <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "gray.700" }}>
        <Icon as={BellIcon} boxSize={6} />
      </Button>
    </Tooltip>
    <Tooltip label="Settings" placement="right">
      <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "gray.700" }}>
        <Icon as={SettingsIcon} boxSize={6} />
      </Button>
    </Tooltip>
    <VStack spacing={0} flex={1} justify="flex-end">
      <Tooltip label="Logout" placement="right">
        <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "gray.700" }}>
          <Icon as={ArrowForwardIcon} boxSize={6} />
        </Button>
      </Tooltip>
    </VStack>
  </VStack>
);

const IlvuChatDashboard = () => {
  const [activeContact, setActiveContact] = useState(null);
  const [message, setMessage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const contacts = [
    { id: 1, name: "Alice", lastMessage: "Hey, how's it going?" },
    { id: 2, name: "Bob", lastMessage: "Did you see the latest update?" },
    { id: 3, name: "Charlie", lastMessage: "Let's catch up soon!" },
  ];

  const messages = [
    { id: 1, text: "Hi there!", isUser: false },
    { id: 2, text: "Hello! How can I help you today?", isUser: true },
    { id: 3, text: "I'm looking for some information about your services.", isUser: false },
    { id: 4, text: "Sure, I'd be happy to help. What specific information are you looking for?", isUser: true },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage('');
    }
  };

  const ContactsList = () => (
    <VStack spacing={0} align="stretch" h="100%">
      <Box p={4} borderBottom="1px" borderColor="gray.700">
        <InputGroup size="md">
          <Input
            placeholder="Search contacts..."
            bg="gray.700"
            border="none"
            _placeholder={{ color: 'gray.400' }}
            _focus={{ boxShadow: '0 0 0 1px #FFD700' }}
          />
          <InputRightElement>
            <Icon as={SearchIcon} color="gray.400" />
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box overflowY="auto" flex={1}>
        <List spacing={2} p={2}>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              name={contact.name}
              lastMessage={contact.lastMessage}
              isActive={activeContact === contact.id}
              onClick={() => {
                setActiveContact(contact.id);
                if (isMobile) onClose();
              }}
            />
          ))}
        </List>
      </Box>
    </VStack>
  );

  return (
    <Box minH="100vh" bg="gray.900">
      <Flex h="100vh">
        <LeftNavStrip />
        <Flex direction="column" flex={1}>
          <Flex bg="gray.800" p={4} justify="center" align="center" borderBottom="1px" borderColor="gray.700">
            <Box width="200px" height="60px">
              <IlvuLogo />
            </Box>
          </Flex>
          <Flex flex={1} overflow="hidden">
            {!isMobile && (
              <Box width="300px" bg="gray.800" borderRight="1px" borderColor="gray.700">
                <ContactsList />
              </Box>
            )}
            <Flex flex={1} direction="column" bg="gray.700">
              {isMobile && (
                <Box p={2} borderBottom="1px" borderColor="gray.600">
                  <Button leftIcon={<HamburgerIcon />} onClick={onOpen} colorScheme="yellow" variant="ghost" size="sm">
                    Contacts
                  </Button>
                </Box>
              )}
              <Box flex={1} p={4} overflowY="auto">
                {activeContact ? (
                  <VStack align="stretch" spacing={4}>
                    {messages.map((msg) => (
                      <ChatMessage key={msg.id} message={msg.text} isUser={msg.isUser} />
                    ))}
                  </VStack>
                ) : (
                  <Flex h="100%" align="center" justify="center">
                    <Text color="gray.400">Select a contact to start chatting</Text>
                  </Flex>
                )}
              </Box>
              <Box p={4} borderTop="1px" borderColor="gray.600">
                <InputGroup size="md">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    bg="gray.600"
                    border="none"
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{ boxShadow: '0 0 0 1px #FFD700' }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      colorScheme="yellow"
                      onClick={handleSendMessage}
                    >
                      Send
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800">
          <DrawerHeader borderBottomWidth="1px" borderColor="gray.700">Contacts</DrawerHeader>
          <DrawerBody p={0}>
            <ContactsList />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default IlvuChatDashboard;
