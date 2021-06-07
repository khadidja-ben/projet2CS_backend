import { Router } from "express";
import { addATNotif, deleteATNotif, getATNotif, getATNotifs, updateATNotif } from "../controllers/agentTokenNotif";
import {
  addTaskNotif,
  getTaskNotif,
  markAsRead,
  deleteTaskNotif,
  get,
} from "../controllers/taskNotification";
let FCM = require("fcm-node")

const router = Router();

// Task notifications

router.get("/", get);

router.get("/taskNotif", getTaskNotif);

router.post("/taskNotif", addTaskNotif);

router.put("/taskNotif/:id", markAsRead);

router.delete("/taskNotif/:id", deleteTaskNotif);

// AgentToken Notification


router.get("/ATNotif", getATNotifs);

router.post("/ATNotif", addATNotif);

router.put("/ATNotif/", updateATNotif);

router.delete("/ATNotif/:id", deleteATNotif);

router.get("/ATNotif/:id", getATNotif);


// FCM Route 

const SERVER_KEY = "AAAASweisnY:APA91bEoxK-8mSVbQWBai4_fO7Hn9wcS2R1UCcoMJXboxLKiGAdmj5H2Le7hto97F5s56l6zxSULPwrHinlHQdyw47Cda1WMiAKGG09pD_oNi5E3TakZW1BuySY_Jjy-8J3n8N7_KHQ6"

router.post("/fcm", async (req, res, next) => {
  try {
    let fcm = new FCM(SERVER_KEY);
    
    let message = {
      to: "eqmcyT4lR3i4CgBDYeZ38W:APA91bH3AwGQ_OUdvs5w8UFhiWJiw2-Y5tHhDgqFRRmwRtm4LGf9A8fiiXCCpFyXCUTbB8OrEayB4QFHm_G8CoC4N48FbAI9YfuuewyWhA1xLTmgpKfRAKQYRHE1NekXMm_jtC1lxDGs",
      notification: {
        title: req.body.title,
        body: req.body.body,
        sound: "default",
        "click_action": "FCM_PLUGIN_ACTIVITY"

      }
    }

    fcm.send(message,(err:any,response:any) =>{
      if(err){
        next(err);
      } else {
        res.json(response)
      }
    })

  } catch (error) {
    next(error)
  }
})

export default router;
