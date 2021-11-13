import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image, Button, useDisclosure, DarkMode } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";
import axios from "axios";
import PathBoxFull from "../PathBoxFull";
import styles from "../../../styles/PathBox.module.css";

function PathBox({ bundle }) {
  const router = useRouter();
  const [isSmallerThan480] = useMediaQuery("(max-width: 480px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  //let price = bundle.price.toLocaleString("de-DE", {style:"currency", currency:"EUR"});
  let price = (parseInt(bundle.price, 10) / 100).toString();

  // get digits after "." and check if price is 1.3 convert it to 1.30
  if (price.split(".")[1]?.length == 1) {
    price = price + "0";
  }

  return (
    <>
      <Flex
        flexFlow="column"
        h="450px"
        w="350px"
        mt={10}
        mb={10}
        ml={isSmallerThan480 ? 0 : 10}
        mr={isSmallerThan480 ? 0 : 10}
        borderRadius={5}
        overflow="hidden"
        backgroundColor="#252232"
        onClick={onOpen}
        className={styles.boxContainer}
      >
        <Image
          w="100%"
          h="65%"
          src={bundle.image}
          objectFit="cover"
          alt="cover"
        />
        <Text margin={5} fontWeight={500}>
          {bundle.name}
        </Text>
        <Box flex="1"></Box>
        <Flex justifyContent="center" alignItems="center" width="100%" p={5}>
          <DarkMode>
            <Button width="90%" colorScheme="blue" onClick={onOpen}>
              Get for {price}€
            </Button>
          </DarkMode>
        </Flex>
      </Flex>
      <PathBoxFull
        bundle={bundle}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
}

export default PathBox;
