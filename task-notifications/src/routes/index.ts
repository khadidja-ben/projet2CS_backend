import { Router } from "express";
import {
  addTaskNotif,
  getTaskNotif,
  markAsRead,
  deleteTaskNotif,
  get,
} from "../controllers/taskNotification";

const router = Router();

// Task notifications

router.get("/", get);

router.get("/taskNotif", getTaskNotif);

router.post("/taskNotif", addTaskNotif);

router.put("/taskNotif/:id", markAsRead);

router.delete("/taskNotif/:id", deleteTaskNotif);

export default router;
