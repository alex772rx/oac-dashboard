import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

const Provider = ({ children }: any) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
};

export default Provider;
