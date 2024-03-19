const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const uploadConfig = require("../configs/upload");
const multer = require("multer");
const UserAvatarController = require("../controllers/UserAvatarController");

const usersRoutes = Router();
const usersController = new UsersController();
const upload = multer(uploadConfig.MULTER)
const userAvatarController = new UserAvatarController()

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = usersRoutes;