import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const {loading, error, login} = useLogin();

    return (
        <>
            < Input onChange={(e) => setInputs({...inputs, email: e.target.value})} placeholder="Email" fontSize={14} size={"sm"} type="email" value={inputs.email} />
            < Input onChange={(e) => setInputs({...inputs, password: e.target.value})} placeholder="Password" fontSize={14} size={"sm"} type="password" value={inputs.password} />

            {error && (
                <Alert status="error" fontSize={13} p={2} borderRadius={4}>
                    < AlertIcon fontSize={12} />
                    {error.message}
                </Alert>
            )}

            <Button onClick={() => login(inputs)} isLoading={loading} w={"full"} colorScheme="blue" size={"sm"} fontSize={14}>
                Log In
            </Button>
        </>
    )
}
