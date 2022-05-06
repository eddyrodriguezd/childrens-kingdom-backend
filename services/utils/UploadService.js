const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadImage = async (file, category) => {
    try {
        const { url } = await cloudinary.uploader.upload(
            file.path,
            { resource_type: 'image', public_id: `categories/${category}/${file.originalname}` }
        );
        return url;
    }
    catch (err) {
        console.log("Couldn't upload image", err);
        throw new Error("Couldn't upload image");
    }
    finally {
        fs.unlinkSync(file.path);
    }
};

module.exports = {
    uploadImage
};