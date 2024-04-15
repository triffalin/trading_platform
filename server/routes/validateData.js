const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().alphanumeric().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

function validateUser(req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}

module.exports = validateUser;
