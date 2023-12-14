import { Box, Button, CloseButton, Flex, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/AuthStore";
import usePostStore from "../../store/postStore";
import useUserProfileStore from "../../store/userProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";


export default function CreatePost() {
    const [ caption, setCaption ] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const imageRef = useRef(null);
    const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
    const { isLoading, handleCreatePost } = useCreatePost();
    const showToast = useShowToast();

    const handlePostCreation = async() => {
        try {
            await handleCreatePost(selectedFile, caption);
            onClose();
            setCaption("");
            setSelectedFile(null);
        } catch (error) {
            showToast("Error", error.message, "error")
        }
    }

    return (
        <>
            <Tooltip hasArrow label={"Create"} placement='right' ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
                <Flex onClick={onOpen} alignItems={"center"} gap={4} _hover={{ bg: "whiteAlpha.400" }} borderRadius={6} p={2} w={{ base: 10, md: "full" }} justifyContent={{ base: "center", md: "flex-start" }}>
                    <CreatePostLogo />
                    <Box display={{ base: "none", md: "block" }}>Create</Box>
                </Flex>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
				< ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					< ModalCloseButton />
					<ModalBody pb={6}>
						< Textarea onChange={(e) => setCaption(e.target.value)} value={caption} placeholder='Post caption...' />

						< Input type='file' ref={imageRef} onChange={handleImageChange} hidden />

						<BsFillImageFill onClick={() => imageRef.current.click()} style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }} size={16} />
                        {selectedFile && (
                            <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
                                < Image src={selectedFile} alt="Selected image" />
                                < CloseButton onClick={() => {setSelectedFile("")}} position={"absolute"} top={2} right={2} />
                            </Flex>
                        )}
					</ModalBody>

					<ModalFooter>
						<Button onClick={handlePostCreation} isLoading={isLoading} mr={3}>Post</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
        </>
    );
}

function useCreatePost() {
    const [ isLoading, setIsLoading ] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    const createPost = usePostStore((state) => state.createPost);
    const addPost = useUserProfileStore((state) => state.addPost);
    const { pathname } = useLocation();

    const handleCreatePost = async(selectedFile, caption) => {
        if (isLoading) return;
        if (!selectedFile) throw new Error("Please select an image");
        setIsLoading(true);
        const newPost = {
            caption: caption,
            likes: [],
            comments: [],
            createdAt: Date.now(),
            createdBy: authUser.uid
        }

        try {
            const postDocRef = await addDoc(collection(db, "posts"), newPost);
            const userDocRef = doc(db, "users", authUser.uid);
            const imageRef = ref(storage, `posts/${postDocRef.id}`);

            await updateDoc(userDocRef, {posts: arrayUnion(postDocRef.id)});
            await uploadString(imageRef, selectedFile, "data_url");
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(postDocRef, {imageURL: downloadURL});

            newPost.imageURL = downloadURL;

            createPost({...newPost, id: postDocRef.id});
            addPost({...newPost, id:postDocRef.id});

            showToast("Success", "Post created successfully", "success")
            
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    }

    return { isLoading, handleCreatePost }
}