import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Flex } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import PathBox from "../components/features/PathBox";
import axios from "axios";

async function getBundles(bundleType) {
  try {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/bundles/?bundle_type=${bundleType}`
    );
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

// export async function getStaticProps(context) {
//   const bundleType = context.params.bundleType;
//   const bundles = await getBundles(bundleType);
//   return { props: { bundles } };
// }

function BundlePage() {
  const router = useRouter();
  const { bundleType, name } = router.query;
  const bundleResponse = useQuery(["bundle_type", bundleType], () =>
    getBundles(bundleType)
  );

  console.log("bundleResponse", bundleResponse, bundleType);

  return (
    <Box w="100%">
      <Heading as="h2" size="3xl" mb={10} isTruncated>
        {name}
      </Heading>

      <Flex w="100%" flexWrap="wrap" justifyContent="space-between">
        {bundleResponse.status == "loading" ? (
          <>
            <Skeleton height="450px" width="350px" />
            <Skeleton height="450px" width="350px" />
          </>
        ) : (
          bundleResponse.data &&
          bundleResponse.data.map((bundle) => {
            return <PathBox bundle={bundle} key={bundle.name} />;
          })
        )}
      </Flex>
    </Box>
  );
}

export default BundlePage;
