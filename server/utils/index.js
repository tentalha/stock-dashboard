const parseBoolean = (value) => {
  return String(value).toLowerCase() === "true";
};

module.exports = {
  parseBoolean,
};
