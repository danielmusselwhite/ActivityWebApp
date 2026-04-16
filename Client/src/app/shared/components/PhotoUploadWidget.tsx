import { Box, Grid, Typography } from "@mui/material";
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import { CloudUpload } from "@mui/icons-material";

export default function PhotoUploadWidget() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles);
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <Grid container spacing={3}>

            <Grid size={4}>
                <Typography variant="overline" color="secondary">Step 1 - Add Photo</Typography>
                <Box {...getRootProps()}
                    sx={{
                        border: 'dashed 3px #b0dab3',
                        borderColor: isDragActive ? '#67a86b' : '#b0dab3',
                        background: isDragActive ? '#e8f7e8' : 'transparent',
                        borderRadius: 5,
                        padding: 5,
                        textAlign: 'center',
                        cursor: 'pointer',
                        height: '280px'
                    }}
                >
                    <input {...getInputProps()} />
                    <CloudUpload sx={{ fontSize: 80 }} />
                    <Typography variant="h5">Drag & Drop your image here, or click to select</Typography>
                </Box>
            </Grid>
            <Grid size={4}>
                <Typography variant="overline" color="secondary">Step 2 - Resize Photo</Typography>
            </Grid>
            <Grid size={4}>
                <Typography variant="overline" color="secondary">Step 3 - Preview & Upload Photo</Typography>
            </Grid>

        </Grid>
    )
}