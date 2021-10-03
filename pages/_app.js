import '../styles/global.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Flex, Box } from "@chakra-ui/layout";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import theme from '../components/theme';

const stripePromise = loadStripe('pk_test_51JfQdeK8quZTT1Es7q0G3wAe8Dz11Gc8RniEAnRZZ7yAdLouhoDBHb5IqUYOHnyN3htW1mMOFZI3GuAfWbtLmv5000pqy0xkao');
const queryClient = new QueryClient();


function MyApp({ Component, pageProps }) {
  return (
    <Elements stripe={stripePromise}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Flex minH="100vh" w="100%" justifyContent="center" padding={10}>
            <Flex h="100%" w="100%" maxW="860px" justifyContent="center">
              <Component {...pageProps} />
            </Flex>
          </Flex>
        </QueryClientProvider>
      </ChakraProvider>
    </Elements>
  );
}

export default MyApp;
