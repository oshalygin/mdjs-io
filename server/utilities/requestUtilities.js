export function getJsonHeaders() {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

export function getHeaders(token) {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
}
