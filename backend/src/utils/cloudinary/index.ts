interface CloudinaryV2 {
  uploader: {
    upload: (imagePath: string, options: object) => Promise<any>;
  };
}

export const uploadImage = async (imagePath:string ,v2: CloudinaryV2) => {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      const result = await v2.uploader.upload(imagePath, options);
      console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    };
};
