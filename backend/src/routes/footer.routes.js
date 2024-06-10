import express, { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { deleteFooterController, footerController, getFooterController, updateFooterController } from "../controllers/footer.controllers.js";

const router = Router();

router.post("/footer", upload.single('footerImage'), footerController);
router.put("/footer/:id",upload.single('footerImage'), updateFooterController); // Note: Added ':' before 'id' to correctly capture URL parameter
router.delete("/footer/:id", deleteFooterController); // Note: Added ':' before 'id' to correctly capture URL parameter
router.get("/footer", getFooterController ); // Note: Added ':' before 'id' to correctly capture URL parameter


export default router;
