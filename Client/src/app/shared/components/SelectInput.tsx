import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select, type SelectProps } from "@mui/material";

type Props<T extends FieldValues> = {
    items: {text: string, value: string}[] // Define an items prop that is an array of objects, where each object has a text and value property. This will be used to populate the options in the select input.
} & UseControllerProps<T> & Partial<SelectProps>  // Extend the props to include both the label for the input and the necessary props for react-hook-form's useController and MUI's TextField.

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
    const {field, fieldState} = useController({...props});

  return (
    <FormControl
        fullWidth
        error={!!fieldState.error} // Set the error state of the FormControl based on whether there is an error in the fieldState from useController.
    >
        <InputLabel>{props.label}</InputLabel> {/* Use the label prop to set the label for the select input. */}
        <Select
            value={field.value || ''} //
            label={props.label} //
            onChange={field.onChange} //     
        >
            {/* map each item to create a new option in the select (dropdown) with the key & value equal to the value from the items props, and the display to the text field */}
            {props.items.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                    {item.text}
                </MenuItem>
            ))}
        </Select>

    </FormControl>
  )
}