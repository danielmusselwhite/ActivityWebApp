using System;
using Application.Interfaces;
using Application.Profiles.DTOs;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary _cloudinary;

    public PhotoService(IOptions<CloudinarySettings> cloudinaryOptions)
    {
        // Deconstruct the Cloudinary settings from the configuration and create a Cloudinary account object
        var cloudinarySettings = cloudinaryOptions.Value;
        var account = new Account(
            cloudinarySettings.CloudName,
            cloudinarySettings.ApiKey,
            cloudinarySettings.ApiSecret
        );

        // Initialize the Cloudinary client with the account information
        _cloudinary = new Cloudinary(account);
    }

    public async Task<PhotoUploadResult?> UploadPhotoAsync(IFormFile file)
    {
        if (file?.Length > 0)
        {
            await using var stream = file.OpenReadStream(); // Get the file stream ('await using' to ensure proper disposal)

            // Create the upload parameters with the file stream and transformation settings
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Transformation = new CloudinaryDotNet.Transformation().Crop("fill").Gravity("face").Width(500).Height(500),
                Folder = "ActivityWebApp/UserPhotos" // Specify the folder in Cloudinary where the photo will be stored
            };

            // Upload the photo to Cloudinary
            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            // Check if there was an error during the upload process and throw an exception if so
            if (uploadResult.Error != null)
            {
                throw new Exception(uploadResult.Error.Message); // Throw an exception if there was an error during upload
            }
            
            // Return the result of the upload, including the public ID and URL of the uploaded photo
            return new PhotoUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.ToString()
            };
        }

        return null; // Return null if the file is null or has no content
    }

    public async Task<string> DeletePhotoAsync(string publicId)
    {
        var deleteParams = new DeletionParams(publicId); // Create deletion parameters with the public ID of the photo to be deleted
        var result = await _cloudinary.DestroyAsync(deleteParams); // Attempt to delete the photo

        if (result.Error != null)
        {
            throw new Exception(result.Error.Message); // Throw an exception if there was an error during deletion
        }
        
        return result.Result; // Return the result of the deletion operation (e.g., "ok" if successful)
    }
}
