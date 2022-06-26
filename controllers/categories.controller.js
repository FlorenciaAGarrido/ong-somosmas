const ModelCategories= require('../models').Categories;

const getAllCategories= async (req, res) => {
  try{
     const categories= await ModelCategories.findAll({attributes: ['name']})
     res.status(200).json({msg:'successfully',categories})    

   } catch(error) {
     res.status(500).json(error)
   }
};

const getOneCategory= async (req, res) => {
  try{
    const category= await ModelCategories.findByPk(req.params.id) 
    
    if(!category){
      return res.status(404).json({msg:'the category does not exist'})
    };
    res.status(200).json({msg:'successful',category})

  } catch(error) {
    res.status(500).json(error)
  }
};

const createCategory= async (req,res)=> {
  try {
    const category=await ModelCategories.create({name:req.body.name,
                                                description:req.body.description,
                                                image:req.body.image
                                              })         
    res.status(201).json({msg:'category created successfully',category})

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
};

  const updateCategory=async (req,res)=>{
    res.send('update category')
  };

  const deleteCategory=async (req,res)=>{
    res.send('delete category')
  };



module.exports = {getAllCategories,
                  getOneCategory,
                  createCategory,
                  updateCategory,
                  deleteCategory};