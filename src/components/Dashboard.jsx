import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Flex, Text, VStack, Input, Button, Avatar,
  Icon, InputGroup, InputRightElement, useBreakpointValue,
  Tooltip
} from '@chakra-ui/react';
import { SearchIcon, SettingsIcon, ArrowForwardIcon, ChatIcon, BellIcon } from '@chakra-ui/icons';
import { useNavigate } from "react-router-dom";


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

const LeftNavStrip = ( {navigate} ) => (

  <VStack spacing={4} align="center" py={4} bg="gray.800" h="100%" width="70px" borderRight="1px" borderColor="gray.700">
    <Avatar size="md" name="User" />
    <NavButton icon={ChatIcon} label="Chats" />
    <NavButton icon={BellIcon} label="Status" />
    <NavButton icon={SettingsIcon} label="Settings" />
    <VStack spacing={0} flex={1} justify="flex-end">
      <NavButton icon={ArrowForwardIcon} label="Logout" onClick={() => navigate('/') }/>
    </VStack>
  </VStack>
);

const NavButton = ({ icon, label, onClick }) => (
  <Tooltip label={label} placement="right">
    <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "gray.700" }} onClick={onClick}>
      <Icon as={icon} boxSize={6} />
    </Button>
  </Tooltip>
);

const ChatArea = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, incomingMessage]);
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const handleSendMessage = useCallback(() => {
    if (message.trim() && socket && socket.readyState === WebSocket.OPEN) {
      const messageObject = { text: message, isUser: true };
      socket.send(JSON.stringify(messageObject));
      setMessages(prevMessages => [...prevMessages, messageObject]);
      setMessage('');
      onSendMessage(message);
    }
  }, [message, socket, onSendMessage]);

  return (
    <Flex flex={1} direction="column" bg="gray.700">
      <VStack flex={1} p={4} overflowY="auto" align="stretch" spacing={4}>
        {messages.map((msg, index) => (
          <Box 
            key={index}
            alignSelf={msg.isUser ? "flex-end" : "flex-start"}
            bg={msg.isUser ? "yellow.500" : "gray.600"}
            color={msg.isUser ? "gray.800" : "white"}
            borderRadius="lg"
            px={3}
            py={2}
            maxWidth="70%"
          >
            <Text>{msg.text}</Text>
          </Box>
        ))}
      </VStack>
      <Box p={4} borderTop="1px" borderColor="gray.600">
        <InputGroup size="md">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            bg="gray.600"
            border="none"
            _placeholder={{ color: 'gray.400' }}
            _focus={{ boxShadow: '0 0 0 1px #FFD700' }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" colorScheme="yellow" onClick={handleSendMessage}>
              Send
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  );
};

const IlvuChatDashboard = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();

  const handleSendMessage = (message) => {
    console.log('Message sent:', message);
    // You can add any additional logic here if needed
  };

  return (
    <Box minH="100vh" bg="gray.900">
      <Flex h="100vh">
        <LeftNavStrip navigate={navigate}/>
        <Flex direction="column" flex={1}>
          <Flex bg="gray.800" p={4} justify="center" align="center" borderBottom="1px" borderColor="gray.700">
            <Box width="200px" height="60px">
              <IlvuLogo />
            </Box>
          </Flex>
          <Flex flex={1} overflow="hidden">
            {!isMobile && (
              <Box width="300px" bg="gray.800" borderRight="1px" borderColor="gray.700">
                <Text color="gray.400" p={4}>Contacts List (Not Implemented)</Text>
              </Box>
            )}
            <ChatArea onSendMessage={handleSendMessage} />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default IlvuChatDashboard;
