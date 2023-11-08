import {UserModel} from '../models';
import ApiError from '../utils/error';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';


export const getUsers = async (limit, offset) => {
  const users = await UserModel.find({}).skip(offset).limit(limit);
  const total = await UserModel.countDocuments({});
  return {users: users, count: total};
};


export const createUser = async (payload) => {
  if (await UserModel.exists({username: payload.username})) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username has already been taken');
  }

  payload.password = await bcrypt.hash(payload.password, 10);
  return UserModel.create(payload);
};

export const getUserById = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user found with this Id');
  }

  return user;
};

export const updateUserById = async (userId, payload) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user found with this Id');
  }

  if (payload.hasOwnProperty('password')) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  Object.assign(user, payload)
  await UserModel.updateOne({_id: userId}, payload);
  return user;
};

export const deleteUserById = async (userId) => {
  const user = await UserModel.findById(userId);
  if (user) {
    await UserModel.deleteOne({_id: userId});
  }

  return user;
}