import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import SimpleFrag from "../../../app/shared/components/SimpleFrag";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activityScema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";
import type { Activity } from "../../../lib/types";

export default function ActivityForm() {

    // Initialize the form with the ActivitySchema type we defined for the form
    const { control, reset, handleSubmit } = useForm<ActivitySchema>({
        mode: "onTouched", // Set the validation mode to "onTouched" to trigger validation when a field is touched.
        resolver: zodResolver(activitySchema) // Use the zodResolver to integrate the Zod schema validation with react-hook-form, ensuring that the form data adheres to the defined schema before submission.
    });

    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id); // Reference the custom useActivities hook.
    const navigate = useNavigate();

    useEffect(() => {
        // Populate the form with the activity data when it is loaded.
        if (activity) {
            reset({
                ...activity,
                location: {
                    city: activity.city,
                    venue: activity.venue,
                    latitude: activity.latitude,
                    longitude: activity.longitude
                }
            });
        }
    }, [activity, reset]); // Reset the form with the activity data when it changes.

    // Handles submission of the MUI Box rendered as a real <form> element
    const onSubmit = async (data: ActivitySchema) => {

        // Validate and coerce form data to proper types
        const parsed = activitySchema.parse(data); // parsed is fully typed now

        const { location, ...rest } = parsed; // Destructure the form data to extract the necessary fields for creating or updating an activity.
        const flattenedData = { ...rest, ...location }; // Flatten the location object into the main data object to match the expected structure for the API.

        try {
            // If there is an activity, we are in edit mode and should call the updateActivity mutation. If there is no activity, we are in create mode and should call the createActivity mutation.
            if (activity) {
                updateActivity.mutate({ ...activity, ...flattenedData }, {
                    onSuccess: () => navigate(`/activities/${activity.id}`) // Navigate to the activity details page after a successful update.
                });
            }
            // Otherwise, we are in create mode and should call the createActivity mutation, which will create a new activity and navigate to its details page upon success.
            else {
                // add default id (0) and isCancelled(false) so it can be cast to Activity
                const newActivity: Activity = { id: "", isCancelled: false, ...flattenedData, city: flattenedData.city || "" };
                createActivity.mutate(newActivity, {
                    onSuccess: (id) => navigate(`/activities/${id}`) // Navigate to the newly created activity's details page after a successful creation.
                });
            }
        }
        catch (error) {
            console.error("Error submitting activity form:", error); // Log any errors that occur during form submission.
        }
    }

    if (isLoadingActivity) {
        return (
            <SimpleFrag message="Loading activity..." />
        )
    }

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? "Edit Activity" : "Create Activity"}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3}>
                <TextInput label="Title" control={control} name='title' />
                <TextInput label="Description" control={control} name='description' multiline rows={4} />

                <Box display='flex' gap={3}>
                    <SelectInput label="Category" control={control} name='category' items={categoryOptions} />

                    <DateTimeInput label="Date" control={control} name='date' />
                </Box>

                <LocationInput label="Enter the location" name="location" control={control} />

                <Box display="flex" justifyContent="end" gap={3}>
                    <Button onClick={() => navigate(`/activities/${activity?.id ?? ''}`)} color="inherit">Cancel</Button>
                    <Button type="submit" color="success" variant="contained" loading={updateActivity.isPending || createActivity.isPending}>Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}