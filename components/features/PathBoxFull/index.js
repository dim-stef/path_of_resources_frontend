import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Box, Text, Flex } from "@chakra-ui/layout";
import {
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  chakra
} from "@chakra-ui/react";
import { DarkMode } from "@chakra-ui/color-mode";
import axios from "axios";
import styles from '../../../styles/PathBoxFull.module.css';

function PathBoxFull({ bundle, isOpen, onOpen, onClose }) {
  const router = useRouter();
  let price = parseInt(bundle.price, 10) / 100;

  async function handleBuyClick() {
    try {
      const formData = new FormData();
      formData.append("price", bundle.price_id);
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/create_checkout_session/`,
        formData
      );
      router.push(response.data.checkout_url);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <DarkMode>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent maxW="46rem">
        <Image
          w="100%"
          h="65%"
          transform="scale(1.001)" // Fixes visual glitch
          src={bundle.image}
          objectFit="cover"
          alt="cover"
        />

          <ModalHeader fontSize="4xl">{bundle.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box dangerouslySetInnerHTML={{__html: bundle.description}} className={styles.pathBoxFull}></Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              textColor="black"
              mr={3}
              onClick={handleBuyClick}
            >
              Get for {price}€
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </DarkMode>
  );
}

export default PathBoxFull;
