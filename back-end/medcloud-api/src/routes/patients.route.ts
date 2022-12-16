import express from "express";

const router = express.Router();

// Patients routes
router.route('/patients')
  .get()
  .post();

router.route('/patients/:id')
  .get()
  .put()
  .delete();

export default router;
