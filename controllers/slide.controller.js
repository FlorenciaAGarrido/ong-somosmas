const { Slide } = require('../models');


const getAllSlides = async ( req, res ) => {

    res.json({
        msg: 'Hello from get all slides'
    })

}

const createSlide = async ( req, res ) => {

    res.json({
        msg: 'Hello from create slide'
    })

}


const getSlideById = async ( req, res ) => {

    const id = req.params.id;

    try {

        const slide = await Slide.findByPk(id);
        if(!slide){
            return res.status(404).json({
                msg:'Invalid or nonexisting slide'
            })
        }
        res.status(200).json({
            slide
        })
        
    } catch (error) {
        console.log( error )
        res.status(500).json({
            msg: 'Something went wrong call the admin'
        })
    }
   
}

const updateSlide = async ( req, res ) => {

    res.json({
        msg: 'Hello from update slide'
    })
}


const deleteSlide = async ( req, res ) => {

    res.json({
        msg: 'Hello from delete slide'
    })

}

module.exports = {
    getAllSlides,
    createSlide,
    getSlideById,
    updateSlide,
    deleteSlide
}