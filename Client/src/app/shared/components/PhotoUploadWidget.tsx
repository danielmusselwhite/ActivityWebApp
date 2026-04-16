import { Box, Button, Grid, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloudUpload } from "@mui/icons-material";
import Cropper, { type ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
};

export default function PhotoUploadWidget({ uploadPhoto, loading }: Props) {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const cropperRef = useRef<ReactCropperElement>(null);

  // (cleanup) Revoke data uris to avoid memory leaks when component unmounts or files change
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file as Blob), // create previewUrl to be used as source for cropper component
        }),
      ),
    );
  }, []);

  const onCrop = useCallback(() => {
    const cropper = cropperRef.current?.cropper; // get the cropper instance from the ref
    cropper?.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!)); // get the cropped image as a blob and pass it to the uploadPhoto function
  }, [uploadPhoto]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Grid container spacing={3}>
      <Grid size={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="overline" color="secondary">
          Step 1 - Add Photo
        </Typography>
        <Box
          {...getRootProps()}
          sx={{
            border: "dashed 3px #b0dab3",
            borderColor: isDragActive ? "#67a86b" : "#b0dab3",
            background: isDragActive ? "#e8f7e8" : "transparent",
            borderRadius: 5,
            padding: 5,
            textAlign: "center",
            cursor: "pointer",
            height: "280px",
          }}
        >
          <input {...getInputProps()} />
          <CloudUpload sx={{ fontSize: 80 }} />
          <Typography variant="h5">
            Drag & Drop your image here, or click to select
          </Typography>
        </Box>
      </Grid>
      <Grid size={4} display="flex" flexDirection="column" alignItems="center">
        {files[0]?.preview && (
          <>
            <Typography variant="overline" color="secondary">
              Step 2 - Resize Photo
            </Typography>
            <Cropper
              src={files[0].preview}
              style={{ height: 300, width: "90%" }}
              initialAspectRatio={1}
              aspectRatio={1}
              preview=".img-preview"
              guides={false}
              viewMode={1}
              background={false}
              ref={cropperRef}
            />
          </>
        )}
      </Grid>
      <Grid size={4} display="flex" flexDirection="column" alignItems="center">
        {files[0]?.preview && (
          <>
            <Typography variant="overline" color="secondary">
              Step 3 - Preview & Upload Photo
            </Typography>

            <div
              className="img-preview"
              style={{
                width: 300,
                height: 300,
                overflow: "hidden",
              }}
            />

            <Button
              sx={{ my: 2, width: 300 }}
              onClick={onCrop}
              disabled={loading}
              variant="contained"
              color="secondary"
              fullWidth
            >
              Upload Photo
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}
