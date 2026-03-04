import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { type FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
    activity?: Activity
    closeForm: () => void;
}

export default function ActivityForm({activity, closeForm}: Props) {
    const {updateActivity, createActivity} = useActivities(); // Reference the custom useActivities hook.

    // Handles submission of the MUI Box rendered as a real <form> element
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // prevent the default submit behaviour (no refresh)
        
        // Create a FormData object referencing from the submitted form element (rendered from <Box component="form".../>)
        const formData = new FormData(event.currentTarget);

        // Convert FormData into a plain object
        const formDataObject = Object.fromEntries(formData.entries());

        // Creating a new Activity to store form values, where:
        // - existing activity fields are preserved (like latitude, longitude, etc.)
        // - form fields overwrite existing values if they are updated
        const data: Activity = {
            ...(activity ?? {}), // passing over old values
            ...formDataObject, // overwriting with new values
            id: activity?.id // if actvity passed had an Id, set to it so we update instead of create
        } as Activity; // must be done as otherwise missing fields in DTO which causes badrequest 400 on API

        // If we are editing an activity that already exists, also add id into data so we don't do id insert
        if(activity){
            await updateActivity.mutateAsync(data);
            closeForm();
        }
        // else, we are creating an activity
        else{
            await createActivity.mutateAsync(data);
            closeForm();
        }
    }

    return (
        <Paper sx={{borderRadius: 3, padding: 3}}>
            <Typography variant="h5" gutterBottom color="primary">
                Create Activity
            </Typography>
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
                <TextField name="title"  label="Title" defaultValue={activity?.title}/>
                <TextField name="description"  label="Description" defaultValue={activity?.description} multiline={true} rows={3} />
                <TextField name="category"  label="Category" defaultValue={activity?.category}/>
                <TextField name="date"  label="Date" type="date" 
                    defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                />
                <TextField name="city"  label="City" defaultValue={activity?.city}/>
                <TextField name="venue"  label="Venue" defaultValue={activity?.venue}/>
                <Box display="flex" justifyContent="end" gap={3}>
                    <Button color="inherit" onClick={closeForm}>Cancel</Button>
                    <Button type="submit" color="success" variant="contained" loading={updateActivity.isPending || createActivity.isPending}>Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}