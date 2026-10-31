export function createHttpError(response, data, fallbackMessage) {
  const error = new Error(
    data?.error || data?.message || data?.mensaje || fallbackMessage
  );
  error.status = response.status;
  return error;
}
