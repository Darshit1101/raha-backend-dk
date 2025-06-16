const response = {
  success(message, data = {}) {
    return {
      status: true,
      statusCode: 200,
      message,
      data,
      err: {},
    };
  },

  badRequest(message) {
    return {
      status: false,
      statusCode: 400,
      message,
      data: {},
      err: {},
    };
  },

  unauthorized(message) {
    return {
      status: false,
      statusCode: 401,
      message,
      data: {},
      err: {},
    };
  },

  serverError(message, err = {}) {
    return {
      status: false,
      statusCode: 500,
      message,
      data: {},
      err,
    };
  },

  invalidToken(message, err = {}) {
    return {
      status: false,
      statusCode: 498,
      message,
      data: {},
      err,
    };
  },
};

// export default response;
module.exports = response;
