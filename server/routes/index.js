import express from 'express';
import validate from 'express-validation';
import validations from '../validation';
import plangeneratorController from '../controller/plangenerator';

const router = express.Router();

router.route('/generate-plan').post(validate(validations.input), plangeneratorController.generate)

export default router;
