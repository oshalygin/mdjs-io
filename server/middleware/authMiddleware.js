function authMiddleware() {
  return function(request, response, next) {
    const { access_token: token } = request.cookies;

    if (!token) {
      return response.status(401).send('Unauthorized');
    }

    request.token = token;
    return next();
  };
}

export default authMiddleware;
