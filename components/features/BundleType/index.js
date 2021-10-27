import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import styles from "../../../styles/BundleType.module.css";

function BundleType({ bundleType }) {
  const router = useRouter();

  function handleBundleTypeClick() {
    router.push({
      pathname: bundleType.slug,
      query: { name: bundleType.name },
    })
  }

  return (
    <Box
      onClick={handleBundleTypeClick}
      h="200px"
      w="350px"
      borderRadius={5}
      position="relative"
      overflow="hidden"
      className={styles.bundleType}
    >
      <Image
        className={styles.bundleTypeImage}
        w="100%"
        h="100%"
        src={bundleType.image}
        objectFit="cover"
        alt="cover"
        position="absolute"
        top="0"
        left="0"
      />
      <Heading as="h1" position="absolute" bottom="20px" left="20px">
        {bundleType.name}
      </Heading>
    </Box>
  );
}

export default BundleType;
