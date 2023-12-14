import { useEffect, useState } from "react";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import useAuthStore from "../store/AuthStore";

export default function useFollowUser(userId) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const {userProfile, setUserProfile} = useUserProfileStore();
    const showToast = useShowToast();

    const handleFollowUser = async() => {
        setIsUpdating(true);
        try {
            const currentUserRef = doc(db, "users", authUser.uid);
            const userToFollowOrUnfollowRef = doc(db, "users", userId);
            
            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
            })
            await updateDoc(userToFollowOrUnfollowRef, {
                followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            })

            if (isFollowing) {
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userId)
                })

                if (userProfile) {
                    setUserProfile({
                        ...userProfile,
                        followers: userProfile.followers.filter(uid => uid !== authUser.uid)
                    })
                }

                localStorage.setItem("user-info", JSON.stringify({
                    ...authUser,
                    following: authUser.following.filter(uid => uid !== userId)
                }))

                setIsFollowing(false);
            } else {
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userId]
                })
                
                if (userProfile) {
                    setUserProfile({
                        ...userProfile,
                        followers: [...authUser.followers, userId]
                    })
                }

                localStorage.setItem("user-info", JSON.stringify({
                    ...authUser,
                    following: [...authUser.following, userId]
                }))
                
                setIsFollowing(true);
            }

        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsUpdating(false);
        }
    }

    useEffect(() => {
        if (authUser) {
            const isFollowing = authUser.following.includes(userId);
            setIsFollowing(isFollowing);
        }
    }, [authUser, userId])

    return { isUpdating, isFollowing, handleFollowUser }
}
