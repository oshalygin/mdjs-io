export function redirect(request, response) {
  if (request.method === 'GET') {
    return response.redirect(
      301,
      `https://${request.headers.host}${request.originalUrl}`,
    );
  }

  return response.status(403).send('All requests must be over HTTPS');
}

function hstsMiddleware() {
  return function(request, response, next) {
    if (request.secure || request.originalUrl === '/healthz') {
      return next();
    }

    return redirect(request, response);
  };
}

export default hstsMiddleware;
