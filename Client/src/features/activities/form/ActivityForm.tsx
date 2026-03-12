import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import LoadingFrag from "../../../app/app/shared/components/LoadingFrag";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activityScema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/app/shared/components/TextInput";
import SelectInput from "../../../app/app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";

export default function ActivityForm() {

    // Initialize the form with the ActivitySchema type we defined for the form
    const { control, reset, handleSubmit } = useForm<ActivitySchema>({
        mode: "onTouched", // Set the validation mode to "onTouched" to trigger validation when a field is touched.
        resolver: zodResolver(activitySchema) // Use the zodResolver to integrate the Zod schema validation with react-hook-form, ensuring that the form data adheres to the defined schema before submission.
    });

    const {id} = useParams();
    const {updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id); // Reference the custom useActivities hook.
    const navigate = useNavigate();

    useEffect(() => {
        if(activity){
            reset(activity); // Populate the form with the activity data when it is loaded.
        }
    }, [activity, reset]); // Reset the form with the activity data when it changes.

    // Handles submission of the MUI Box rendered as a real <form> element
    const onSubmit = (data: ActivitySchema) => {
        console.log(data);
    }

    if(isLoadingActivity){
        return (
            <LoadingFrag />
        )
    }

    return (
        <Paper sx={{borderRadius: 3, padding: 3}}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity? "Edit Activity" :  "Create Activity"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3}>
                <TextInput label="Title" control={control} name='title' />
                <TextInput label="Description" control={control} name='description' multiline rows={4} />
                
                <SelectInput label="Category" control={control} name='category' items={categoryOptions} />

                <TextInput label="Date" control={control} name='date' type="datetime-local" InputLabelProps={{ shrink: true }} />
                <TextInput label="City" control={control} name='city' />
                <TextInput label="Venue" control={control} name='venue' />

                <Box display="flex" justifyContent="end" gap={3}>
                    <Button onClick={() => navigate(`/activities/${activity?.id ?? ''}`)} color="inherit">Cancel</Button>
                    <Button type="submit" color="success" variant="contained" loading={updateActivity.isPending || createActivity.isPending}>Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}