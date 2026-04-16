import { Box, Grid, Typography } from "@mui/material";
import { useDropzone } from 'react-dropzone';
import { useCallback, useRef, useState } from 'react';
import { CloudUpload } from "@mui/icons-material";
import Cropper, { type ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function PhotoUploadWidget() {
    const [files, setFiles] = useState<(File & { preview: string })[]>([]);
    const cropperRef = useRef<ReactCropperElement>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file as Blob) // create previewUrl to be used as source for cropper component
        })))

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
                {files[0]?.preview && (
                    <>
                        <Typography variant="overline" color="secondary">Step 2 - Resize Photo</Typography>
                        <Cropper
                            src={files[0].preview}
                            style={{ height: 300, width: "90%" }}
                            initialAspectRatio={1}
                            aspectRatio={1}
                            preview='.img-preview'
                            guides={false}
                            viewMode={1}
                            background={false}
                        />
                    </>
                )}
            </Grid>
            <Grid size={4}>
                {files[0]?.preview && (
                    <>
                        <Typography variant="overline" color="secondary">Step 3 - Preview & Upload Photo</Typography>

                        <div className="img-preview" style={{ width: 300, height: 300, overflow: 'hidden' }}>

                        </div>
                    </>
                )}
            </Grid>

        </Grid>
    )
}