function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const config = {
  retry: {
    retries: parseInt(required("REACT_APP_RETRIES")),
    initialDelayMs: parseInt(required("REACT_APP_INITIAL_DELAY_MS")),
  },
  cloudinary: {
    cloudName: required("REACT_APP_CLOUD_NAME"),
    apiKey: required("REACT_APP_API_KEY"),
    apiSecret: required("REACT_APP_API_SECRET"),
  },
};
