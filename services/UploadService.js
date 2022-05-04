const uploadImage = async (file) => {
    try {
        const { url } = await cloudinary.uploader.upload(file.path);
        return url;
    } 
    catch (err) {
        console.log("Couldn't upload image");
        throw new Error("Couldn't upload image");
    }
};

module.exports = {
    uploadImage
};