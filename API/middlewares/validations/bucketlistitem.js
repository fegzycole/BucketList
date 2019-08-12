import { validate } from '../../helpers/util';

export const validateBucketListItem = (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  const data = {
    name,
    id,
  };

  const rules = {
    name: 'required|string|min:5',
    id: 'required|integer',
  };

  validate(data, rules, res, next);
};


export const validateBucketListItemParam = (req, res, next) => {
  const { id } = req.params;

  const data = {
    id,
  };

  const rules = {
    id: 'required|integer',
  };

  validate(data, rules, res, next);
};


export const validateBucketListParams = (req, res, next) => {
  const { id, itemId } = req.params;

  const data = {
    id,
    itemId,
  };

  const rules = {
    id: 'required|integer',
    itemId: 'required|integer',
  };

  validate(data, rules, res, next);
};
