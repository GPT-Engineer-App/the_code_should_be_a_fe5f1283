import React, { useState } from "react";
import { Box, VStack, Text, Input, useToast, Divider, Code, Container, Heading, IconButton, HStack } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [messages, setMessages] = useState([
    { role: "user", text: "hello" },
    { role: "assistant", text: "Hello, how are you?" },
    { role: "user", text: "I am good! Write me a hello world script in Python" },
    { role: "assistant", text: "Sure! Here is a simple hello world script in Python:\n\n```python\nprint(\"Hello world!\")\n```" }
    // Add more messages to the conversation here if needed
  ]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Message is empty",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setMessages([...messages, { role: "user", text: inputValue }]);
    setInputValue("");
    // Simulate AI response
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { role: "assistant", text: "AI response placeholder" }]);
    }, 1000);
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">
          AI Chat Interface
        </Heading>
        <Divider />
        <VStack spacing={4} align="stretch" h="500px" overflowY="auto" p={4} borderColor="gray.200" borderWidth="1px" borderRadius="md">
          {messages.map((message, index) => (
            <Box key={index} alignSelf={message.role === "user" ? "flex-start" : "flex-end"}>
              <Text fontSize="sm" color={message.role === "user" ? "blue.500" : "green.500"}>
                {message.role === "user" ? "You" : "AI Agent"}:
              </Text>
              {message.text && (
                <Text p={2} bg={message.role === "user" ? "blue.100" : "green.100"} borderRadius="md">
                  {message.text}
                </Text>
              )}
              {message.code && <Code p={2} bg={message.role === "user" ? "blue.50" : "green.50"} borderRadius="md" children={message.code} />}
            </Box>
          ))}
        </VStack>
        <HStack
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <IconButton aria-label="Send message" icon={<FaPaperPlane />} onClick={sendMessage} />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
