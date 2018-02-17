import Joi from 'joi';

export default {
  input: {
    body: {
      loanAmount: Joi.string().regex(/^[0-9]+$/).required(),
      nominalRate: Joi.string().regex(/^\d*\.?\d*$/).required(),
      duration:  Joi.number().required(),
      startDate: Joi.date().iso() 
    }
  }
};
