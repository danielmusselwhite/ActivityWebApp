import { useParams } from "react-router";
import SimpleFrag from "../../app/shared/components/SimpleFrag";
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
import PhotoUploadWidget from "../../app/shared/components/PhotoUploadWidget";
import StarButton from "../../app/shared/components/StarButton";

export default function ProfilePhotos() {
  const { id } = useParams(); // get ID query arg from url
  const {
    photos,
    loadingPhotos,
    isCurrentUser,
    uploadPhoto,
    profile,
    setMainPhoto,
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
      {/* If current user is viewing their own profile, show the manage photos button */}
      {isCurrentUser && (
        <Box>
          {/* Toggle edit mode on click */}
          <Button onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancel" : "Upload"}
          </Button>
        </Box>
      )}

      {/* If user is in edit mode, show the photo widget; else, show the photo list */}
      {editMode ? (
        <PhotoUploadWidget
          uploadPhoto={handlePhotoUpload}
          loading={uploadPhoto.isPending}
        />
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
                <Box
                  sx={{ position: "absolute", top: 0, left: 0 }}
                  onClick={() => setMainPhoto.mutate(photo)}
                >
                  <StarButton selected={photo.url == profile?.imageUrl} />
                </Box>
              )}
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
}
