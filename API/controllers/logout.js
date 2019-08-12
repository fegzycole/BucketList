import {
  errorResponse,
} from '../helpers/util';

const logout = async (req, res) => {
  try {
    await req.session.destroy();
    return res.redirect('/');
  } catch (error) {
    return errorResponse(error, res, 500);
  }
};

export default logout;
