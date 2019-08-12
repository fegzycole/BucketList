/* eslint-disable consistent-return */
import _ from 'lodash';
import model from '../models';
import {
  comparePassword,
  errorResponse,
  createToken,
  hashPassword,
  successResponse,
} from '../helpers/util';


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await model.User.findAll({ where: { email } });
    if (user.length > 0) {
      const correctPassword = comparePassword(user[0].password, password);
      if (correctPassword) {
        user[0].token = createToken(user[0]);
        const payLoad = _.pick(user[0], ['id', 'email', 'token', 'createdAt', 'updatedAt']);
        const { session } = req;
        session.user = payLoad;
        return successResponse(res, 200, payLoad);
      }
      return errorResponse(new Error('Invalid user credentials'), res, 401);
    }
    const newUser = await model.User.create({ email, password: hashPassword(password) });
    newUser.token = createToken(newUser);
    const payLoad = _.pick(newUser, ['id', 'email', 'token', 'createdAt', 'updatedAt']);
    const { session } = req;
    session.user = payLoad;
    return successResponse(res, 201, payLoad);
  } catch (error) {
    return errorResponse(error, res, 500);
  }
};

export default login;
