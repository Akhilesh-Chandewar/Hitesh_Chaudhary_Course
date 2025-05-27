import { Router } from "express";
import { registerUser , loginUser , refreshAccessToken , logoutUser} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/register",
    upload.fields([{ name: "avatar", maxCount: 1 }, { name: "cover", maxCount: 1 }]),
    registerUser
);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logoutUser);

export default router;