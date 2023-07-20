
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl } from "@mui/base";
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import api from '../api/api';

const registerScheme = object({
    password: string()
        .nonempty("Password must not be empty")
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password must be under 32 characters"),
    email: string().nonempty("Email cannot be empty").email("Invalid Email"),
    userName: string().min(3, "Name must be at least 3 characters").max(32, "Name must be at most 32 characters").nonempty("Username cannot be empty"),
    passwordConfirm: string().nonempty("Confirm your password ny retyping it")
}).refine((data) => data.password === data.passwordConfirm, { path: ["passwordConfirm"], message: "Passwords do not match" });
type RegisterInput = TypeOf<typeof registerScheme>;

export default function RegisterForm() {

    const [loading, setLoading] = useState(false);

    const { register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerScheme),
    })
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();//TODO:redirect to home
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler = (data: RegisterInput) => {
        axios.post("http://localhost:8080/api/v1/auth/register", data)
            .then(response => { localStorage.setItem("token", response.data.token); console.log(response.data.token, "response"); });
        console.log(data);
    }

    return (
        <>
            <Box sx={{ maxWidth: "32rem" }}>
                <Typography variant="h4" component='h1' sx={{ mb: 3 }}>Register</Typography>
                <Box component='form' noValidate autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>

                    <TextField required fullWidth sx={{ mb: 2 }} variant="outlined" type="email" color="secondary" label="Email" error={!!errors["email"]} helperText={errors["email"] ? errors["email"].message : ""} {...register("email")} ></TextField>
                    <TextField required fullWidth sx={{ mb: 2 }} variant="outlined" type="text" color="secondary" label="Username" error={!!errors["userName"]} helperText={errors["userName"] ? errors["userName"].message : ""} {...register("userName")} ></TextField>
                    <TextField required fullWidth sx={{ mb: 2 }} variant="outlined" type="password" color="secondary" label="Password" error={!!errors["password"]} helperText={errors["password"] ? errors["password"].message : ""} {...register("password")} ></TextField>
                    <TextField required fullWidth sx={{ mb: 2 }} variant="outlined" type="password" color="secondary" label="Confirm Password" error={!!errors["passwordConfirm"]} helperText={errors["passwordConfirm"] ? errors["passwordConfirm"].message : ""} {...register("passwordConfirm")} ></TextField>

                    <LoadingButton variant="contained" type="submit" loading={loading} fullWidth sx={{ py: '0.5rem', mt: '1rem' }}>Register</LoadingButton>
                </Box >
            </Box>
        </>
    )

}
