import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { act, type FormEvent } from "react";

type Props = {
    activity?: Activity
    closeForm: () => void
    submitForm: (activity: Activity) => void;
}

export default function ActivityForm({activity, closeForm, submitForm}: Props) {

    // Handles submission of the MUI Box rendered as a real <form> element
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // prevent the default submit behaviour (no refresh)
        
        // Create a FormData object referencing from the submitted form element (rendered from <Box component="form".../>)
        const formData = new FormData(event.currentTarget);

        // Define an empty object to store form values, where:
        // - each key is the 'name' attribute of a form field
        // - each value is the corresponding field value
        const data: { [key: string]: FormDataEntryValue } = {};

        // Iterate over all form entries and copy them into the data object, who's structure was defined above.
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // If we are editing an activity that already exists, also add id into data so we don't do id insert
        if(activity?.id){
            data.id = activity.id;
        }

        // At this point, 'data' contains all form input values
        submitForm(data as unknown as Activity); // placeholder, just simple in place update prior to us implementing API
        


        // todo - treat as a dto and can be sent to an API
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
                <TextField name="date"  label="Date" type="date" defaultValue={activity?.date}/>
                <TextField name="city"  label="City" defaultValue={activity?.city}/>
                <TextField name="venue"  label="Venue" defaultValue={activity?.venue}/>
                <Box display="flex" justifyContent="end" gap={3}>
                    <Button color="inherit" onClick={closeForm}>Cancel</Button>
                    <Button type="submit" color="success" variant="contained" >Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}