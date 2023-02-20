import express from "express";
import { StudioController } from "../controllers/studio.controller";
const studioRouter = express.Router();

// hvata sve na putanji /studios

studioRouter.route('/allCurrentStudios').get(
    (req, res)=>new StudioController().allCurrentStudios(req, res)
);

studioRouter.route('/getAllStudiosForOrganizer').get(
    (req, res)=>new StudioController().getAllStudiosForOrganizer(req, res)
);

studioRouter.route('/top5Studios').get(
    (req, res)=>new StudioController().top5Studios(req, res)
);

studioRouter.route('/searchStudiosName').get(
    (req, res)=>new StudioController().searchStudiosName(req, res)
);

studioRouter.route('/searchStudiosPlace').get(
    (req, res)=>new StudioController().searchStudiosPlace(req, res)
);

studioRouter.route('/searchStudiosNameAndPlace').get(
    (req, res)=>new StudioController().searchStudiosNameAndPlace(req, res)
);

studioRouter.route('/getStudio').get(
    (req, res)=>new StudioController().getStudio(req, res)
);

studioRouter.route('/getAllPicturesForStudio').get(
    (req, res)=>new StudioController().getAllPicturesForStudio(req, res)
);

studioRouter.route('/like').post(
    (req, res)=>new StudioController().like(req, res)
);

studioRouter.route('/dislike').post(
    (req, res)=>new StudioController().dislike(req, res)
);

studioRouter.route('/cancel').post(
    (req, res)=>new StudioController().cancel(req, res)
);

studioRouter.route('/apply').post(
    (req, res)=>new StudioController().apply(req, res)
);

studioRouter.route('/addToListOfWaitingUsers').post(
    (req, res)=>new StudioController().addToListOfWaitingUsers(req, res)
);

studioRouter.route('/create').post(
    (req, res)=>new StudioController().create(req, res)
);

studioRouter.route('/approve').post(
    (req, res)=>new StudioController().approve(req, res)
);

studioRouter.route('/getStudioMainIcon').get(
    (req, res)=>new StudioController().getStudioMainIcon(req, res)
);

studioRouter.route('/getStudioIcons').get(
    (req, res)=>new StudioController().getStudioIcons(req, res)
);

studioRouter.route('/update').post(
    (req, res)=>new StudioController().update(req, res)
);

export default studioRouter;