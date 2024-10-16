import React, { useState } from 'react';
import { Box, VStack, Button, Text, keyframes } from '@chakra-ui/react';

// Keyframes for rotating animation
const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Component for the rotating ring
const Ring = ({ radius, delay, centerX, centerY, ids }) => (
  <Box
    position="absolute"
    width={`${radius * 2}px`}
    height={`${radius * 2}px`}
    borderRadius="50%"
    border="2px solid"
    borderColor="yellow.500"
    left={`${centerX - radius}px`}
    top={`${centerY - radius}px`}
    animation={`${rotateAnimation} ${20 + delay}s linear infinite`}
    animationDelay={`${delay}s`}
  >
    {ids.map((id, index) => (
      <IdCircle
        key={id}
        id={id}
        angle={(index * 360) / ids.length} // Evenly distribute IDs around the ring
        radius={radius}
        centerX={radius}
        centerY={radius} // Local center for positioning inside the Ring component
      />
    ))}
  </Box>
);

// Component for the IDs placed on the ring
const IdCircle = ({ id, angle, radius, centerX, centerY }) => {
  const radians = (angle * Math.PI) / 180; // Convert angle to radians
  const x = centerX + radius * Math.cos(radians); // X position on the ring
  const y = centerY + radius * Math.sin(radians); // Y position on the ring

  return (
    <Box
      position="absolute"
      width="20px"
      height="20px"
      borderRadius="50%"
      bg="yellow.500"
      left={`${x}px`}
      top={`${y}px`}
      transform="translate(-50%, -50%)" // Centering the text on the position
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="xs"
      fontWeight="bold"
      color="gray.900"
    >
      
    </Box>
  );
};

const IlvuNearbyPage = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNearbyClick = () => {
    setIsAnimating(true);
  };

  const ids = ['1', '2', '3', '4', '5'];
  const centerX = 150;
  const centerY = 150;

  return (
    <Box
      minHeight="100vh"
      bg="gray.900"
      color="whiteAlpha.900"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={8}>
        <Text
          fontSize="6xl"
          fontFamily="'Orbitron', sans-serif"
          fontWeight="bold"
          bgGradient="linear(to-r, #FFD700, #FFA500)"
          bgClip="text"
          filter="drop-shadow(0 0 5px #FFD700)"
        >
          ilvu
        </Text>
        
        <Box position="relative" width="300px" height="300px">
          {isAnimating && (
            <>
              {/* Ring 1 */}
              <Ring radius={150} delay={0} centerX={centerX} centerY={centerY} ids={ids.slice(0, 2)} />

              {/* Ring 2 */}
              <Ring radius={200} delay={2} centerX={centerX} centerY={centerY} ids={ids.slice(2, 4)} />

              {/* Ring 3 */}
              <Ring radius={250} delay={4} centerX={centerX} centerY={centerY} ids={ids} />
            </>
          )}
        </Box>

        <Button
          onClick={handleNearbyClick}
          bg="yellow.500"
          color="gray.900"
          _hover={{ bg: 'yellow.400' }}
          fontFamily="'Orbitron', sans-serif"
          fontSize="lg"
          py={3}
          px={6}
        >
          Nearby
        </Button>
      </VStack>
    </Box>
  );
};

export default IlvuNearbyPage;
