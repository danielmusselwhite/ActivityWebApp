import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { debounce, List, ListItemButton, TextField } from "@mui/material";
import axios from "axios";
import type { LocationIQSuggestion } from "../../../../lib/types";

type Props<T extends FieldValues> = 
{label: string} 
& UseControllerProps<T> 

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props});
    const [loading, setLoading] = useState(false); // loading flag to indicate when the geocoding API is being called
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]); // state to hold the location suggestions returned from the geocoding API
    const [inputValue, setInputValue] = useState(field.value || ''); // state to hold the current value of the input field

    useEffect(() => {
        // If the field value is an object (a selected suggestion), set the input value to the display name of the suggestion.
        if(field.value && typeof field.value === 'object'){
            setInputValue(field.value.display_name); }
        // Otherwise, set the input value to the raw string value of the field (which may be an address typed by the user).
        else{
            setInputValue(field.value || ''); 
        }
    }, [field.value]);
    
    const locationUrl = `https://api.locationiq.com/v1/autocomplete?key=${import.meta.env.VITE_LOCATIONIQ_KEY}&limit=5&dedupe=1&`; // Base URL for the LocationIQ autocomplete API, with a placeholder for the query parameter.

    // usememo is used here to memoize the fetchSuggestions function, which will be called whenever the input value changes. This function will call the LocationIQ API with the current input value and update the suggestions state with the results.
    const fetchSuggestions = useMemo(() => 
        debounce(async (query: string) => {
            // Clear suggestions if the query is empty or too short.
            if(!query || query.length < 3) {
                setSuggestions([]); 
                return;
            }

            setLoading(true); // Set loading to true when starting the API call.
            
            try{
                const response = await axios.get<LocationIQSuggestion[]>(`${locationUrl}q=${encodeURIComponent(query)}`); // Make a GET request to the LocationIQ API with the encoded query parameter.
                setSuggestions(response.data); // Update the suggestions state with the data returned from the API.
            }
            catch(error){
                console.error("Error fetching location suggestions:", error); // Log any errors that occur during the API call.
            }
            finally{
               setLoading(false); // Set loading to false after the API call is complete, regardless of success or failure. 
            }
        }, 500), [locationUrl] // The debounce function will delay the execution of the API call until 500 milliseconds have passed since the last time it was invoked, preventing excessive API calls as the user types.
    );

    // Handle changes to the input field and call the fetchSuggestions function with the current input value.
    const handleChange = async (value: string) => {
        field.onChange(value); // Update the form field value with the current input value.
        await fetchSuggestions(value); // Call the fetchSuggestions function to get location suggestions based on the current input value.
    }

    // Handle the selection of a location suggestion. This function will be called when a user clicks on a suggestion from the list, and it will update the form field value with the display name of the selected suggestion.
    const handleSelect = (suggestion: LocationIQSuggestion) => {
        const city = suggestion.address.city || suggestion.address.town || suggestion.address.village || suggestion.address.hamlet || ''; // Extract the city from the suggestion's address, using fallback options if city is not available.
        const venue = suggestion.display_name; // Use the display name of the suggestion as the venue.
        const latitude = suggestion.lat; // Parse the latitude from the suggestion's lat property.
        const longitude = suggestion.lon; // Parse the longitude from the suggestion's lon property.

        setInputValue(venue); // Update the input value to the display name of the selected suggestion.
        field.onChange({display_name: venue, city, venue, latitude, longitude}); // Update the form field value with an object containing the display name, city, venue, latitude, and longitude of the selected suggestion.
        setSuggestions([]); // Clear the suggestions after a selection is made.
    }

  return (
    <Box>
        <TextField
            {...props} // Spread the incoming props to ensure all necessary props are passed to the TextField component from the caller. (eg label, name, etc.)
            value={inputValue} // Set the value of the TextField to the current inputValue state, which is updated based on the field value and user input.
            onChange = {(e) => handleChange(e.target.value)} // Call the handleChange function whenever the input value changes, passing the current input value.
            fullWidth
            variant="outlined"
            error={!!fieldState.error} // Set the error state of the TextField based on whether there is an error in the fieldState from useController.
            helperText={fieldState.error ? fieldState.error.message : ''} // Display the error message from react-hook-form's validation if there is an error for this field.
        />

        {loading && <div>Loading...</div>} {/* Display a loading indicator when the geocoding API is being called */}

        {/* Render the location suggestions as a list below the input field */}
        <List sx={{border: '1px solid #ccc', borderRadius: '4px', maxHeight: 180, overflowY: 'auto'}}>
            {suggestions.map(suggestion => (
                <ListItemButton
                    divider
                    key={suggestion.place_id} 
                    onClick={() => 
                    {
                        handleSelect(suggestion); // Call the handleSelect function when a suggestion is clicked, passing the selected suggestion.
                    }}
                >
                    {suggestion.display_name}
                </ListItemButton>
            ))}
        </List>

    </Box>
  )
}
