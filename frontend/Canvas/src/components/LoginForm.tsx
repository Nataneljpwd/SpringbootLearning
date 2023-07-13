import { FormControl } from "@mui/base";
import { TextField } from "@mui/material";
import { useReducer } from "react";
import { object, string } from "zod";


let initState = {
    mail: "",
    password: "",
    userName: "",
    mError: false,
    pError: false,
    uError: false
}
type loginState = {
    mail: string,
    password: string,
    userName: string,
    mError: boolean,
    pError: boolean,
    uError: boolean
}

type loginAction = {
    type: "mail" | "password" | "userName" | "mError" | "pError" | "uError",
    text?: string,
    bool?: boolean
}
const loginScheme = object({
    password: string()
        .nonempty("Password must not be empty")
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password must be under 32 characters"),
    email: string().nonempty("Email cannot be empty").email("Invalid Emaio;"),
});

function LoginForm() {


    function reducer(action: loginAction, state: loginState): loginState {
        switch (action.type) {
            case "mail":
                if (!action.text) return state;
                return { ...state, mail: action.text };
            case "password":
                if (!action.text) return state;
                return { ...state, password: action.text };
            case "userName":
                if (!action.text) return state;
                return { ...state, userName: action.text };
            case "mError":
                if (action.bool == null || action.bool == undefined) return state;
                return { ...state, mError: action.bool };
            case "pError":
                if (action.bool == null || action.bool == undefined) return state;
                return { ...state, pError: action.bool };
            case "uError":
                if (action.bool == null || action.bool == undefined) return state;
                return { ...state, uError: action.bool };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initState);

    const handleSubmit = () => {
        // form validation (password) 
    }

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>

            <TextField required variant="outlined" error={state.mError} type="email" color="secondary" label="Email" onChange={() => dispatch({ type: "mail", text: e.target.value })}></TextField>
            // <TextField required error={state.pError} type="text" color="secondary" label="Username"></TextField> this is for signup, migh later make them both in asingle componenrt
            <TextField required variant="outlined" error={state.uError} type="password" color="secondary" label="Password" onChange={() => dispatch({ type: "password", text: e.target.value })}></TextField>

        </form >
    )

}
