import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl } from "@mui/base";
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { object, string, TypeOf } from "zod";
import api from '../api/api';
import Popup from './Popup';

const loginScheme = object({
    password: string()
        .nonempty("Password must not be empty")
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password must be under 32 characters"),
    email: string().nonempty("Email cannot be empty").email("Invalid Email"),
});

type LoginInput = TypeOf<typeof loginScheme>;

export default function LoginForm({ message }) {

    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(true);
    const navigate = useNavigate();

    const { register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<LoginInput>({
        resolver: zodResolver(loginScheme),
    })
    useEffect(() => {
        //TODO: show message
        if (message != null && message !== "") {
            setShowPopup(true);
        }
    }, [])
    useEffect(() => {
        if (isSubmitSuccessful) {
            navigate("/canvas");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);
    const onSubmitHandler = (data: LoginInput) => {
        axios.post("http://localhost:8080/api/v1/auth/authenticate", data)
            .then(response => { localStorage.setItem("token", response.data.token); console.log(response.data.token); });
        console.log(data);
    }

    return (
        <>
            <Box sx={{ maxWidth: "32rem" }}>
                <Typography variant="h4" component='h1' sx={{ mb: 3 }}>Login</Typography>
                <Box component='form' noValidate autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>

                    <TextField required fullWidth sx={{ mb: 2 }} variant="outlined" type="email" color="secondary" label="Email" error={!!errors["email"]} helperText={errors["email"] ? errors["email"].message : ""} {...register("email")} ></TextField>
                    <TextField required fullWidth sx={{ mb: 2 }} variant="outlined" type="password" color="secondary" label="Password" error={!!errors["password"]} helperText={errors["password"] ? errors["password"].message : ""} {...register("password")} ></TextField>

                    <LoadingButton variant="contained" type="submit" loading={loading} fullWidth sx={{ py: '0.5rem', mt: '1rem' }}>Login</LoadingButton>
                </Box >
            </Box>
            {showPopup && <Popup message={message} duration={3000} />}
        </>
    )

}
