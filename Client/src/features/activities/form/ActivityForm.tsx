import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import LoadingFrag from "../../../app/app/shared/components/LoadingFrag";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activityScema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ActivityForm() {

    // Initialize the form with the ActivitySchema type we defined for the form
    const { register, reset, handleSubmit, formState:{errors} } = useForm<ActivitySchema>({
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
                <TextField 
                    {...register("title")} label="Title" defaultValue={activity?.title}
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ''} // Display the error message from Zod validation if there is an error for the title field.
                />
                <TextField 
                    {...register("description")} label="Description" defaultValue={activity?.description} multiline={true} rows={3}
                    error={!!errors.description}
                    helperText={errors.description ? errors.description.message : ''} // Display the error message from Zod validation if there is an error for the description field.
                />
                <TextField 
                    {...register("category")} label="Category" defaultValue={activity?.category}
                    error={!!errors.category}
                    helperText={errors.category ? errors.category.message : ''} // Display the error message from Zod validation if there is an error for the category field.
                />
                <TextField {...register("date")} label="Date" type="date" 
                    defaultValue={activity?.date ? new Date(activity.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                    error={!!errors.date}
                    helperText={errors.date ? errors.date.message : ''} // Display the error message from Zod validation if there is an error for the date field.
                />
                <TextField 
                    {...register("city")} label="City" defaultValue={activity?.city} 
                    error={!!errors.city} 
                    helperText={errors.city ? errors.city.message : ''}
                />
                <TextField 
                    {...register("venue")} label="Venue" defaultValue={activity?.venue} 
                    error={!!errors.venue} 
                    helperText={errors.venue ? errors.venue.message : ''}
                />
                <Box display="flex" justifyContent="end" gap={3}>
                    <Button onClick={() => navigate(`/activities/${activity?.id ?? ''}`)} color="inherit">Cancel</Button>
                    <Button type="submit" color="success" variant="contained" loading={updateActivity.isPending || createActivity.isPending}>Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}