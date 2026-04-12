import { Button, styled, type ButtonProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import type { LinkProps } from "react-router";

type StyledButtonProps = ButtonProps & Partial<LinkProps>

const StyledButton = styled(Button)<StyledButtonProps>(({theme}) => ({
    '&.Mui-disabled': {
        backgroundColor: grey[300],
        color: grey[500]
    }
}))

export default StyledButton;