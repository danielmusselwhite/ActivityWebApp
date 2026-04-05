import { useForm, Controller } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/app/shared/components/TextInput";
import Box from "@mui/material/Box";
import { useNavigate, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccounts";
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";

export default function Register(){
    const {registerUser} = useAccount();

    const navigate = useNavigate();
    const location = useLocation();

    const {control, handleSubmit, formState: {isValid, isSubmitting}} = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data);
    }

    return (
        <Paper component='form' onSubmit={handleSubmit(onSubmit)} 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                gap: 2,
                maxWidth: 'md',
                mx: 'auto',
                borderRadius: 2
            }}>
            <Box display='flex' alignItems='center' justifyContent='center' gap={2} color='secondary.main'>
                <LockOpen fontSize='large' color='secondary' />
                <Typography variant='h4'>Register</Typography>
            </Box>
            <TextInput label='Email' name='email' control={control} />
            <TextInput label='Display Name' name='displayName' control={control} />
            <TextInput label='Password' name='password' control={control} type='password' />
            <Button type='submit' variant='contained' color='primary' disabled={!isValid || isSubmitting}>
                Register
            </Button>
            <Typography sx={{textAlign: 'center'}}>
                Already have an account? <Button onClick={() => navigate('/login')}>Login</Button>
            </Typography>
        </Paper>
    )
}