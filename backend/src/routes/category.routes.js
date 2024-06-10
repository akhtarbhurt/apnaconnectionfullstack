import express, { Router } from "express";
import { categoryController, deleteCategoryController, getCategoryController, updateCategoryController } from "../controllers/category.controllers.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.post("/category", upload.single('catImage'), categoryController);
router.put("/category/:id",upload.single('catImage'), updateCategoryController); // Note: Added ':' before 'id' to correctly capture URL parameter
router.delete("/category/:id", deleteCategoryController); // Note: Added ':' before 'id' to correctly capture URL parameter
router.get("/category", getCategoryController ); // Note: Added ':' before 'id' to correctly capture URL parameter


export default router;
