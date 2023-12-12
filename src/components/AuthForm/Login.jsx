import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    return (
        <>
            < Input onChange={(e) => setInputs({...inputs, email: e.target.value})} placeholder="Email" fontSize={14} size={"sm"} type="email" value={inputs.email} />
            < Input onChange={(e) => setInputs({...inputs, password: e.target.value})} placeholder="Password" fontSize={14} size={"sm"} type="password" value={inputs.password} />

            <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14}>
                Log In
            </Button>
        </>
    )
}
