import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function useGetUserProfileById(userId) {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ userProfile, setUserProfile ] = useState(null);

    const showToast = useShowToast();

    useEffect(() => {
        const getUserProfile = async() => {
            setIsLoading(true);
            setUserProfile(null);
            
            try {
                const userRef = await getDoc(doc(db, "users", userId));
                if (userRef.exists()) {
                    setUserProfile(userRef.data());
                }



            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };
        getUserProfile();
    },[ showToast, setUserProfile, userId ])

    return { isLoading, userProfile, setUserProfile };
}
