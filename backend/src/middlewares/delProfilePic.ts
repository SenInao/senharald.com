import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import v2 from "../config/cloudinary";

export const deletePrevious = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user = await User.findById(req.session.userAuth);

    if (!user) {
      return;
    };

    if (user.profilePicture) {
      let pi = user.profilePicture.split("/").pop();

      if (pi) {
        pi = "profilePictures/" + pi.split(".")[0];
        deleteImageFromCloudinary(pi);
      };
    };

    next();
  } catch (error) {
    console.log(error);
    next();
  };
};

async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  try {
    const result = await v2.uploader.destroy(publicId);
  } catch (error) {
    throw error;
  }
}
