import Validator from 'validatorjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const validator = (data, rules) => {
  const validation = new Validator(data, rules);
  if (validation.passes()) {
    return true;
  }
  return {
    error: {
      status: 400,
      message: validation.errors.all(),
    },
  };
};

export const errorResponse = (error, res, statusCode) => res.status(statusCode).json({
  status: statusCode,
  error: error.message,
});

export const successResponse = (res, statusCode, data) => res.status(statusCode).json({
  status: statusCode,
  data,
});

export const validate = (data, rules, res, next) => {
  const validation = validator(data, rules);
  return validation === true ? next() : errorResponse(validation.error, res, 400);
};

export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const comparePassword = (hashPwd, password) => bcrypt.compareSync(password, hashPwd);

export const createToken = (user) => {
  const token = jwt.sign(
    {
      user,
    },
    process.env.SECRET,
    { expiresIn: '24h' },
  );

  return token;
};

export const paginate = ({ page, pageSize }) => {
  const offset = page * pageSize;
  const limit = offset + pageSize;

  return {
    offset,
    limit,
  };
};
