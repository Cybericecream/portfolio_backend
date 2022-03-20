import express, {Request, Response} from "express";
const router = express.Router();

const dogsController = require("../controller/dogsController");

router.get("/", dogsController.listDogs);

router.get("/:id", dogsController.viewDogs);

router.post("/", dogsController.saveDogs);

router.put("/:id", dogsController.editDogs);

router.delete("/:id", dogsController.deleteDogs);

module.exports = router;