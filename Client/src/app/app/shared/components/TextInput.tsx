import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";

type Props<T extends FieldValues> = {
} & UseControllerProps<T> & TextFieldProps // Extend the props to include both the label for the input and the necessary props for react-hook-form's useController and MUI's TextField.

export default function TextInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props});

  return (
    <TextField
        {...props} // Spread the incoming props to ensure all necessary props are passed to the TextField component from the caller. (eg label, name, etc.)
        {...field} // Spread the field props from useController to connect the TextField to react-hook-form's state management. (eg onChange, value, etc.)
        fullWidth
        variant="outlined"
        error={!!fieldState.error} // Set the error state of the TextField based on whether there is an error in the fieldState from useController.
        helperText={fieldState.error ? fieldState.error.message : ''} // Display the error message from react-hook-form's validation if there is an error for this field.
    />
  )
}