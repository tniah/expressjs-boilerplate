import {Router} from "express";
import * as userController from '../../controllers/user.controller';
import {userValidation} from '../../validations'
import {validate} from '../../middlewares/validate';

const router = Router();

router
  .route('/')
  .get(validate(userValidation.getUsers), userController.getUsers)
  .post(validate(userValidation.createUser), userController.createUser);

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

export default router;