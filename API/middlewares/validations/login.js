import { validate } from '../../helpers/util';

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const data = {
    email,
    password,
  };

  const rules = {
    email: 'required|email',
    password: 'required|min:5',
  };

  validate(data, rules, res, next);
};

export default validateLogin;
