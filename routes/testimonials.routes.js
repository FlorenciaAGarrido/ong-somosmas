let express = require('express');
let router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');
const { authenticatedUser } = require("../middlewares/authenticatedUser");
const { verifyIsAdmin } = require('../middlewares/user.middelware');
const { validateTestimonial } = require('../validators/testimonialValidator');

/* GET testimonials listen. */
router.get('/', testimonialController.getAllTestimonials);

/* GET testimonial by Id*/
router.get('/:id', authenticatedUser, verifyIsAdmin, testimonialController.getAllTestimonialsById)

/* POST testimonial. */
router.post('/',authenticatedUser, verifyIsAdmin, validateTestimonial, testimonialController.createTestimonial);

/* PUT testimonial. */ 
router.put('/:id', authenticatedUser, verifyIsAdmin, validateTestimonial, testimonialController.updateTestimonial);

/* DELETE testimonial. */ 
router.delete('/:id', authenticatedUser, verifyIsAdmin, testimonialController.deleteTestimonial);

module.exports = router;
