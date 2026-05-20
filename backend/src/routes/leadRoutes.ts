import express from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  exportLeadsCSV,
} from '../ controllers/leadController';
import { protect, adminGuard } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateRequest';
import { createLeadSchema, updateLeadSchema, leadIdSchema } from '../validations/leadValidation';

const router = express.Router();

router.use(protect);

router.get('/export', exportLeadsCSV);

router.route('/')
  .get(getLeads)
  .post(validate(createLeadSchema), createLead);

router.route('/:id')
  .get(validate(leadIdSchema), getLeadById)
  .put(validate(updateLeadSchema), updateLead)
  .delete(adminGuard, validate(leadIdSchema), deleteLead);

export default router;