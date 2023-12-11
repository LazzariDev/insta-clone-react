import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function SuggestedHeader() {
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar name="randomguy" size={"lg"} src="/profilepic.png"/>
                <Text fontSize={12} fontWeight={"bold"}>
                    randomguy
                </Text>
            </Flex>
            <Link as={RouterLink} to={"/auth"} fontSize={14} fontWeight={"medium"} color={"blue.400"} style={{textDecoration: "none"}} cursor={"pointer"}>
                Log out
            </Link>
        </Flex>
    )
}
