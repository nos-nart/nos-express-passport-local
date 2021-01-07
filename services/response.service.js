const sendApiSuccess = (res, status, data, message) => {
  return res.status(status).json({
    ok: true,
    status,
    message,
    data,
    error: null
  })
}

const sendApiError = (res, status, error, message) => {
  return res.status(status).json({
    ok: false,
    status,
    message,
    data: null,
    error
  })
}

module.exports = {
  sendApiSuccess,
  sendApiError
}
