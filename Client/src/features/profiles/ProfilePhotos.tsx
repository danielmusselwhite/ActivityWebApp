import { useParams } from "react-router";
import SimpleFrag from "../../app/shared/components/SimpleFrag";
import { useProfile } from "../../lib/hooks/useProfile";
import { ImageList, ImageListItem } from "@mui/material";

export default function ProfilePhotos() {

    const { id } = useParams(); // get ID query arg from url
    const {photos, loadingPhotos } = useProfile(id);

    if(loadingPhotos) return <SimpleFrag message="Loading Photos..."/>
    if ( !photos || photos.length === 0) <SimpleFrag message="No Photos Found For This User.."/>

    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {photos!.map((photo) => (
                <ImageListItem key={photo.id}>
                <img
                    srcSet={`${photo.url.replace(
                        '/upload/',
                        '/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/'
                    )}`}
                    src={`${photo.url.replace(
                        '/upload/',
                        '/upload/w_164,h_164,c_fill,f_auto,g_face/'
                    )}`}
                    alt={"user profile image"}
                    loading="lazy"
                />
                </ImageListItem>
            ))}
        </ImageList>
    )
}