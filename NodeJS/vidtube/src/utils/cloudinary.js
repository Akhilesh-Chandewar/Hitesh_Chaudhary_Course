import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('File path is required for upload');
        }
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'uploads',
            resource_type: 'auto', // Automatically detect the resource type
        });
        fs.unlinkSync(filePath); 
        return result;
    } catch (error) {
        fs.unlinkSync(filePath);
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
}

export { uploadOnCloudinary };
