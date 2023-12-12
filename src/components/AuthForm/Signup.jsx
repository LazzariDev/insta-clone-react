import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

export default function Signup() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [inputs, setInputs] = useState({
        fullName: "",
        username:"",
        email: "",
        password: ""
    });

    return (
        <>
            < Input onChange={(e) => setInputs({...inputs, fullName: e.target.value})} placeholder="Full Name" fontSize={14} size={"sm"} type="text" value={inputs.fullName} />
            < Input onChange={(e) => setInputs({...inputs, username: e.target.value})} placeholder="Username" fontSize={14} size={"sm"} type="text" value={inputs.username} />
            < Input onChange={(e) => setInputs({...inputs, email: e.target.value})} placeholder="Email" fontSize={14} size={"sm"} type="email" value={inputs.email} />
            <InputGroup>
                < Input onChange={(e) => setInputs({...inputs, password: e.target.value})} placeholder="Password" fontSize={14} size={"sm"} type={showPassword ? "text" : "password"} value={inputs.password} />
                <InputRightElement h="full">
                    <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? < ViewIcon /> : < ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14}>
                Sign Up
            </Button>
        </>
    )
}
