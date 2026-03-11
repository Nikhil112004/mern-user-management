import express from "express";
import { exportUserCSV } from "../utils/exportCSV.js";

import  { getUsers, createUser, getUserById, updateUser, deleteUser, searchUsers } from "../controllers/userController.js";

const router: any = express.Router()

router.get("/users", getUsers)
router.post("/users", createUser)
router.get("/users/search", searchUsers)
router.get("/users/export", exportUserCSV)
router.get("/users/:id", getUserById)
router.put("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)



export default router;