const { sendApiError } = require("../services/response.service")

const register = async (req, res, next) => {
  try {

  } catch(err) {
    sendApiError(res, 401, err, 'An error occurs register account!');
  }
}

const login = async (req, res, next) => {
  try {

  } catch(err) {
    sendApiError(res, 401, err, 'An error occurs login!');
  }
}

const logout = async (req, res, next) => {
  try {
    
  } catch(err) {
    sendApiError(res, 401, err, 'Logout failed!');
  }
}

module.exports = {
  register,
  login,
  logout
}