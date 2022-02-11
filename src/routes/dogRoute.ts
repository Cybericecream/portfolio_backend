import express, {Request, Response} from "express";
const router = express.Router();
const { requiredScopes } = require('express-oauth2-jwt-bearer');

const dogsController = require("../controller/dogsController");

const viewScopes = requiredScopes('view:dogs');
const editScopes = requiredScopes('edit:dogs');

router.use(viewScopes);

router.get("/", dogsController.listDogs);

router.get("/:id", dogsController.viewDogs);

router.use(editScopes);

router.post("/", dogsController.saveDogs);

router.put("/:id", dogsController.editDogs);

router.delete("/:id", dogsController.deleteDogs);

module.exports = router;