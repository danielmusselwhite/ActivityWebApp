import { useForm, Controller } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccounts";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/app/shared/components/TextInput";
import Box from "@mui/material/Box";


export default function Login(){
    const {loginUser} = useAccount();

    const {control, handleSubmit, formState: {isValid, isSubmitting}} = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data);
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
                <Typography variant='h4'>Login</Typography>
            </Box>
            <TextInput label='Email' name='email' control={control} />
            <TextInput label='Password' name='password' control={control} type='password' />
            <Button type='submit' variant='contained' color='primary' disabled={!isValid || isSubmitting}>
                Login
            </Button>
        </Paper>
    )
}