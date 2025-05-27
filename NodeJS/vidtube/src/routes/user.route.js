import { Router } from "express";
import {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    changePassword,
    getCurrentUser, 
    updateAccountDetails, 
    updateAvatar, 
    updateCover
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
    "/register",
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "cover", maxCount: 1 }
    ]),
    registerUser
);

router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", verifyJwt, logoutUser);
router.post(
    "/change-password",
    verifyJwt,
    changePassword
);
router.get("/current", verifyJwt, getCurrentUser);
router.put(
    "/update-account",
    verifyJwt,
    updateAccountDetails
);
router.put(
    "/update-avatar",
    verifyJwt,
    upload.single("avatar"),
    updateAvatar
);
router.put(
    "/update-cover",
    verifyJwt,
    upload.single("cover"),
    updateCover
);


export default router;
