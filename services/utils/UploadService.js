const cloudinary = require('cloudinary').v2;
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const uploadImage = async (file, category) => {
    try {
        resizedImgPath = path.parse(file.path).dir + '\\rs_temp.jpg';

        await sharp(file.path)
        .resize(300, 300)
        .toFile(resizedImgPath)

        const { url } = await cloudinary.uploader.upload(
            resizedImgPath,
            { resource_type: 'image', public_id: `categories/${category}/${file.originalname}` }
        );
        return url;
    }
    catch (err) {
        console.log("Couldn't process/upload image", err);
        throw new Error("Couldn't process/upload image");
    }
    finally {
        fs.unlinkSync(file.path);
        fs.unlinkSync(resizedImgPath);
    }
};

module.exports = {
    uploadImage
};