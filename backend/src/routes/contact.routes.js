import express, { Router } from "express"
import { contactController, getContactController } from "../controllers/contact.controllers.js"
const router = Router()

router.post("/contact", contactController)
router.get("/contact", getContactController  )

export default router