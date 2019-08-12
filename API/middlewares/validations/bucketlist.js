import { validate } from '../../helpers/util';

export const validateBucketList = (req, res, next) => {
  const { name, userId } = req.body;

  const data = {
    name,
    userId,
  };

  const rules = {
    name: 'required|string|min:5',
  };

  validate(data, rules, res, next);
};


export const validateBucketListParam = (req, res, next) => {
  const { id } = req.params;

  const data = {
    id,
  };

  const rules = {
    id: 'required|integer',
  };

  validate(data, rules, res, next);
};


export const validateupdateBucketList = (req, res, next) => {
  const { name } = req.body;

  const data = {
    name,
  };

  const rules = {
    name: 'required|string|min:5',
  };

  validate(data, rules, res, next);
};
