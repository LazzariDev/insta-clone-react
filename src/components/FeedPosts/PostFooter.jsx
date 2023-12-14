import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/AuthStore";
import useLikePost from "../../hooks/useLikePost";

export default function PostFooter({post, username, isProfilePage}) {
    const [ comment, setComment ] = useState("");
    const commentRef = useRef(null);
    
    const authUser = useAuthStore(state => state.user);
    const { isCommenting, handlePostComment } = usePostComment();
    const { handleLikePost, isLiked, likes } = useLikePost(post);
    
    

    const handleSubmitComment = async() => {
        await handlePostComment(post.id, comment);
        setComment("");
    }

    return (
        <Box mb={10} marginTop={"auto"}>
            <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
                <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
                    {!isLiked ? (< NotificationsLogo />) : (< UnlikeLogo />)}
                </Box>
                <Box onClick={() => commentRef.current.focus()} cursor={"pointer"} fontSize={18}>
                    < CommentLogo />
                </Box>
            </Flex>
            <Text fontWeight={600} fontSize={"sm"}>
                {likes} likes
            </Text>

            {!isProfilePage && (
                <>
                    <Text fontSize="sm" fontWeight={700}>
                        {username}{" "}
                        <Text as="span" fontWeight={400}>
                            Feeling good
                        </Text>
                    </Text>
                    <Text fontSize="sm" color={"gray"}>
                        View all 1,000 comments
                    </Text>                
                </>
            )}

            {authUser && (
                <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
                    <InputGroup>
                        < Input onChange={(e) => setComment(e.target.value)} value={comment} ref={commentRef} variant={"flushed"} placeholder={"Add a comment..."} fontSize={14} />
                        <InputRightElement>
                            <Button onClick={handleSubmitComment} isLoading={isCommenting} fontSize={14} color={"blue.500"} fontWeight={600} cursor={"pointer"} _hover={{color: "white"}} bg={"transparent"}>
                                Post
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Flex>
            )}
            
        </Box>
    )
}
