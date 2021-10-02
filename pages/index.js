import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useQuery } from "react-query";
import { Flex, Text } from "@chakra-ui/layout";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/alert";
import { Heading, DarkMode } from "@chakra-ui/react";
import PathBox from "../components/features/PathBox";
import axios from "axios";

async function getBundles() {
  try {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/bundles/`
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function getStaticProps() {
  const bundles = await getBundles();
  return { props: { bundles } };
}

export default function Home({ bundles }) {
  const { data } = useQuery("bundles", getBundles, { initialData: bundles });
  const [status, setStatus] = useState(null);

  console.log("data", data, bundles);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setStatus("success");
      console.log("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setStatus("canceled");
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <Flex w="100%" flexFlow="column" justifyContent="center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {status && (
        <DarkMode>
          <Alert
            status={status == "success" ? "success" : "error"}
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            mb={10}
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {status == "success"
                ? "Your order has been confirmed!"
                : "Your order was canceled"}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {status == "success"
                ? "You will get an email containing the airtable url"
                : "Order canceled -- continue to shop around and checkout when you’re ready."}
            </AlertDescription>
          </Alert>
        </DarkMode>
      )}
      <Heading as="h2" size="3xl" mb={10} isTruncated>
        Path of resources
      </Heading>
      <Heading as="h5" maxW="600px" size="md" mb={5}>
        Hey there. These are just some bundles containing resources. Basically
        we did the research so you don't have to
      </Heading>

      <Text as="p" colorScheme="blue" mb={10}>
        You can stalk me{" "}
        <Link href="https://www.dimitrisstefanakis.dev/">
          <a target="_blank" style={{color:'#90cdf4'}}>here</a>
        </Link>{" "}
        if you don't like the bundles 💀
      </Text>

      <Flex w="100%" flexWrap="wrap" justifyContent="space-between">
        {data && data.map((bundle) => {
          return <PathBox bundle={bundle} key={bundle.name} />;
        })}
      </Flex>

      <footer></footer>
    </Flex>
  );
}
