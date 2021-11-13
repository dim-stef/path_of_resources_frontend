import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Heading } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { useMediaQuery } from "@chakra-ui/media-query";
import styles from "../../../styles/BundleType.module.css";

function BundleType({ bundleType }) {
  const [isSmallerThan480] = useMediaQuery("(max-width: 480px)");
  const router = useRouter();

  function handleBundleTypeClick(e) {
    e.preventDefault();
    router.push({
      pathname: bundleType.slug,
      query: { name: bundleType.name },
    });
  }

  return (
    <Link href={bundleType.slug} onClick={handleBundleTypeClick}>
      <Box
        mt={10}
        mb={10}
        ml={isSmallerThan480 ? 0 : 10}
        mr={isSmallerThan480 ? 0 : 10}
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
    </Link>
  );
}

export default BundleType;
