import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react"

export default function ProfileContent() {
    const [value, setValue] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const tabContent = [
        {label: "About", content: <div>About</div>},
        {label: "Photos", content: <div>Photos</div>},
        {label: "Events", content: <div>Events</div>},
        {label: "Followers", content: <div>Followers</div>},
        {label: "Following", content: <div>Following</div>}
    ]

  return (
    <Box
        component={Paper}
        mt={2}
        p={3}
        elevation={3}
        height={500}
        sx={{display: "flex", alignItems: "flex-start", borderRadius: 3}}
    >

        {/* Tabs for different sections of the profile, onChange, calls handleChange, which calls setValue, which updates the currently selected tab */}
        <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            sx={{borderRight: 1, height: 450, minWidth: 200}}
        >
            {tabContent.map((tab, index) => (
                <Tab key={index} label={tab.label} sx={{mr:3}}/>    
            ))}
        </Tabs>

        {/* Content of the currently selected tab (gotten from tabContent array based on the current value selected) */}
        <Box sx={{flexGrow: 1, p: 3}}>
            {tabContent[value].content} 
        </Box>
    </Box>
  )
}