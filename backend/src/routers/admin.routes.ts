import express from "express";
import { AdminController } from "../controllers/admin.controller";
const adminRouter = express.Router();

// hvata sve na putanji /admin

adminRouter.route('/login').post(
    (req, res)=>new AdminController().login(req, res)
);

adminRouter.route('/allNotApprovedReq').get(
    (req, res)=>new AdminController().allNotApprovedReq(req, res)
);

adminRouter.route('/allUsers').get(
    (req, res)=>new AdminController().allUsers(req, res)
);

adminRouter.route('/approveRegistration').post(
    (req, res)=>new AdminController().approveRegistration(req, res)
);

adminRouter.route('/refuseRegistration').post(
    (req, res)=>new AdminController().refuseRegistration(req, res)
);

adminRouter.route('/deleteUser').post(
    (req, res)=>new AdminController().deleteUser(req, res)
);

adminRouter.route('/newUser').post(
    (req, res)=>new AdminController().newUser(req, res)
);

//*** STUDIOS

adminRouter.route('/allStudios').get(
    (req, res)=>new AdminController().allStudios(req, res)
);

adminRouter.route('/deleteStudio').post(
    (req, res)=>new AdminController().deleteStudio(req, res)
);

adminRouter.route('/allStudioSuggestions').get(
    (req, res)=>new AdminController().allStudioSuggestions(req, res)
);

adminRouter.route('/approveStudio').post(
    (req, res)=>new AdminController().approveStudio(req, res)
);

export default adminRouter;