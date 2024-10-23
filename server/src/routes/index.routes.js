import express from 'express';
import articleRoutes from './articles.routes.js';
import categoryRoutes from './category.routes.js';
import imageRoutes from './images.routes.js';
import undercategoryRoutes from './undercategory.routes.js';
import userRoutes from './users.routes.js';


const router = express.Router();

//  les routes principales de mon blog
router.use('/article', articleRoutes);       
router.use('/category', categoryRoutes);    
router.use('/image', imageRoutes);           
router.use('/undercategory', undercategoryRoutes); 
router.use('/user', userRoutes);            


router.get('/', (req, res) => {
  res.status(200).json({ message: 'test de connexion OK' });
});


export default router;

