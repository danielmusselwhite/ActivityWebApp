import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import { DateTimePicker, type DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';

type Props<T extends FieldValues> = {
} & UseControllerProps<T> & DateTimePickerProps // Extend the props to include both the label for the input and the necessary props for react-hook-form's useController and MUI's TextField.

export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props});

  return (
    <DateTimePicker
        {...props} // Spread the incoming props to ensure all necessary props are passed to the TextField component from the caller. (eg label, name, etc.)
        value={field.value ? new Date(field.value) : null} // Convert the value from react-hook-form to a Date object for the DateTimePicker, or set it to null if there is no value.
        onChange={ newValue => {
            field.onChange(new Date(newValue!)) // Convert the new value from the DateTimePicker back to a Date object and pass it to react-hook-form's onChange handler to update the form state.
        }}
        sx={{width: '100%'}} // Set the width of the DateTimePicker to 100% to make it full width like the TextField.
        
        slotProps={{ // treat the datetimepicker as a textfield for the purposes of error handling and helper text display, by passing the error and helperText props to the textField slot of the DateTimePicker's slotProps.
            textField: {
                onBlur: field.onBlur, // Pass the onBlur handler from react-hook-form to the TextField to trigger validation when the field is blurred.
                error: !!fieldState.error, // Set the error state of the TextField based on whether there is an error in the fieldState from useController.
                helperText: fieldState.error ? fieldState.error.message : '' // Display the error message from react-hook-form's validation if there is an error for this field.
            }
        }}
    />
  )
}