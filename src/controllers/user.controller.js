import {catchAsync} from '../utils/catchAsync';
import {userService} from '../services';
import httpStatus from 'http-status';

export const getUsers = catchAsync(async (req, res) => {
  const result = await userService.getUsers(req.query.limit, req.query.offset);
  res.status(httpStatus.OK).send(result);
});

export const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

export const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  res.status(httpStatus.OK).send(user);
});

export const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.status(httpStatus.OK).send(user);
});

export const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});