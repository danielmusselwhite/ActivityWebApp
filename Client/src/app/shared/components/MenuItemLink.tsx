import { NavLink } from "react-router";
import { MenuItem } from '@mui/material';
import type { ReactNode } from "react";

// children = child frags from within it
export default function MenuItemLink({children, to}: {children: ReactNode, to: string}) {
  return (
    <MenuItem
        component={NavLink}to={to}
        sx={{
            fontSize: '1.2rem',
            textTransform: 'uppercase',
            fontWeight:'bold',
            color: 'inherit',
            '&.active': {
                color: "yellowgreen"
            }
        }}
    >
        {children}
    </MenuItem>
  )
}