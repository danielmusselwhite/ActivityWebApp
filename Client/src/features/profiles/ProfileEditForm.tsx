import { Box, Button, Divider, Typography } from "@mui/material";
import type { Profile } from "../../lib/types";
import TextInput from "../../app/shared/components/TextInput";
import { editProfileSchema, type EditProfileSchema } from "../../lib/schemas/editProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { activitySchema } from "../../lib/schemas/activityScema";

type Props = {
    setEditMode: (editMode: boolean) => void;
}

export default function ProfileEditForm({ setEditMode }: Props) {
    // from the url; get the id (and use that to get the profile)
    const { id } = useParams();
    const { profile, editProfile } = useProfile(id);

    // Initialize the form with the EditProfileSchema type we defined for the form
    const { control, handleSubmit, reset, formState: { isDirty, isValid } } = useForm<EditProfileSchema>({
        resolver: zodResolver(editProfileSchema),
        mode: 'onTouched'
    });


    // Populate/reset the form with the activity data when it is loaded.
    useEffect(() => {
        reset({
            displayName: profile?.displayName,
            bio: profile?.bio || ''
        });
    }, [profile, reset]);

    const onSubmit = (data: EditProfileSchema) => {
        editProfile.mutate(data, {
            onSuccess: () => setEditMode(false)
        });
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ overflowY: 'auto', maxHeight: 300, p: 2 }}>
                <Typography variant="h6" mb={2}>DisplayName</Typography>
                <TextInput label='Display Name' name='displayName' control={control} />
                <Divider sx={{ width: '100%', mt: 3, mb: 1 }} />
                <Typography variant="h6" mb={2}>Bio</Typography>
                <TextInput label='Bio' name='bio' control={control} multiline rows={4} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                >
                    Upload Photo
                </Button>
            </Box>
        </Box>
    )
}