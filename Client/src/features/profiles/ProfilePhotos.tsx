import { useParams } from "react-router";
import SimpleFrag from "../../app/shared/components/SimpleFrag";
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Button, Divider, ImageList, ImageListItem, Typography } from "@mui/material";
import { useState } from "react";
import PhotoUploadWidget from "../../app/shared/components/PhotoUploadWidget";
import StarButton from "../../app/shared/components/StarButton";
import DeleteButton from "../../app/shared/components/DeleteButton";

export default function ProfilePhotos() {
    const { id } = useParams(); // get ID query arg from url
    const {
        photos,
        loadingPhotos,
        isCurrentUser,
        uploadPhoto,
        profile,
        setMainPhoto,
        deletePhoto,
    } = useProfile(id);
    const [editMode, setEditMode] = useState(false);

    const handlePhotoUpload = (file: Blob) => {
        uploadPhoto.mutate(file, {
            onSuccess: () => {
                setEditMode(false); // Exit edit mode after successful upload
            },
        });
    };

    if (loadingPhotos) return <SimpleFrag message="Loading Photos..." />;
    if (!photos) return <SimpleFrag message="No Photos Found For This User.." />;

    return (
        <Box>
            <Box display='flex' justifyContent='space-between'>
                {/* If current user is viewing their own profile, show the manage photos button */}
                <Typography variant="h5">Photos</Typography>
                {isCurrentUser && (
                    <Button onClick={() => setEditMode(!editMode)}> {/* Toggle edit mode on click */}
                        {editMode ? "Cancel" : "Upload"}
                    </Button>
                )}
            </Box>
            <Divider sx={{ my: 2 }} />

            {/* If user is in edit mode, show the photo widget; else, show the photo list */}
            {editMode ? (
                <PhotoUploadWidget
                    uploadPhoto={handlePhotoUpload}
                    loading={uploadPhoto.isPending}
                />
            ) : (
                <>
                    {photos.length === 0 ? (
                        <Typography>No photos uploaded yet.</Typography>
                    ) : (
                        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                            {photos!.map((photo) => (
                                <ImageListItem key={photo.id}>
                                    <img
                                        srcSet={`${photo.url.replace(
                                            "/upload/",
                                            "/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/",
                                        )}`}
                                        src={`${photo.url.replace(
                                            "/upload/",
                                            "/upload/w_164,h_164,c_fill,f_auto,g_face/",
                                        )}`}
                                        alt={"user profile image"}
                                        loading="lazy"
                                    />
                                    {isCurrentUser && (
                                        <div>
                                            <Box
                                                sx={{ position: "absolute", top: 0, left: 0 }}
                                                onClick={() => setMainPhoto.mutate(photo)}
                                            >
                                                <StarButton selected={photo.url == profile?.imageUrl} />
                                            </Box>

                                            {profile?.imageUrl !== photo.url && (
                                                <Box
                                                    sx={{ position: "absolute", top: 0, right: 0 }}
                                                    onClick={() => deletePhoto.mutate(photo.id)}
                                                >
                                                    <DeleteButton />
                                                </Box>
                                            )}
                                        </div>
                                    )}
                                </ImageListItem>
                            ))}
                        </ImageList>
                    )}
                </>
            )}
        </Box >
    );
}
