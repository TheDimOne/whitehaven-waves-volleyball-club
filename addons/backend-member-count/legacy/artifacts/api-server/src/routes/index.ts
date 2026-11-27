import { Router, type IRouter } from "express";
import healthRouter from "./health";
import lineupRouter from "./lineup";

const router: IRouter = Router();

router.use(healthRouter);
router.use(lineupRouter);

export default router;
