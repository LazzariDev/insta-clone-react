import { useToast } from "@chakra-ui/react"
import { useCallback } from "react"; // useCallback is used to prevent infinite loop by caching the function

export default function useShowToast() {
    const toast = useToast();

    const showToast = useCallback((title, description, status) => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: 2000,
            isClosable: true,
        })
    }, [toast])

    return showToast
}
