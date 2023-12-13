import { Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/AuthStore";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function GoogleAuth({prefix}) {
    const [ signInWithGoogle, , , error ] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login)

    const handleGoogleAuth = async () => {
        try {
            const newUser = await signInWithGoogle();
            if(!newUser && error) {
                showToast("Error", error.message, "error");
                return;
            }

            const userRef = doc(db, "users",newUser.user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                // Log in
                const userDoc = userSnap.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            } else {
                // Sign up
                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    username: newUser.user.email.split("@")[0],
                    fullName: newUser.user.displayName,
                    bio: "",
                    profilePicURL: newUser.user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now()
                }
                await setDoc(doc(db, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc)
            }
        } catch (error) {
        showToast("Error", error.message, "error");
        }
    }

    return (
        <Flex onClick={handleGoogleAuth} alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
            < Image src="/google.png" w={5} alt="Google logo" />
            <Text mx="2" color={"blue.500"}>
                {prefix} with Google
            </Text>
        </Flex>
    )
}
