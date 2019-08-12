import jwt from 'jsonwebtoken';
import { errorResponse } from '../../helpers/util';

const authenticateUser = (req, res, next) => {
  try {
    if (!req.headers['x-access-token']
    && !req.headers.token && (!req.headers.authorization)
    && (!req.body.token) && (!req.body.Authorization)) { throw new Error('You do not have access to this resource'); }

    const token = req.body.token
    || req.headers['x-access-token']
    || req.headers.token
    || req.headers.authorization
    || req.body.Authorization;

    const decoded = jwt.verify(token, process.env.SECRET);
    req.decoded = decoded;
    return next();
  } catch (error) {
    return errorResponse(error, res, 401);
  }
};

export default authenticateUser;
