const CommentModel = require("../models").Comment;
const { Role } = require('../models');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const createComment = async (req, res) => {
    try {
        const comment = await CommentModel.create(req.body);
        return res.status(201).send(comment);

    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllComents = async (req, res) => {

    try {
        const comments = await CommentModel.findAll({
            attributes:['body'],
            order: [['createdAt', 'DESC']]
        })
        res.status(200).send({ comments })
    } catch (error) {
        res.status(500).send({ error })
    }
}

const getCommentById = async (req, res) => {
    try {
        const { id } = req.params

        const comment = await CommentModel.findByPk(id)
        if (!comment) return res.status(404).send({ msg: 'Comment not found!' })
        res.status(200).send({ comment })
    } catch (error) {
        res.status(500).res.send({ error })
    }
}

const deleteComment = async (req, res) => {
    const { id } = req.params;
    
    try{
        const token =  req.headers.authorization.split(' ')[1];

        if (!token) return res.json({ msg: 'no token in request' });

        const jwtDecoded = jwt.verify(token, process.env.PRIVATE_KEY);

        const comment = await CommentModel.findOne({ where: { id } });

        const userComment = await User.findOne({ where: { id: comment.user_id }})  

        const { name } = await Role.findOne({ where: { id: jwtDecoded.user.roleId } });

        if (!comment){
            
            return res.status(404).json({ msg: 'Comment not found' });
        }


        if (userComment.email !== jwtDecoded.user.email && name !== 'Admin' ){

            return res.status(401).send('you dont have permissions to delete')
        }

        comment.destroy();

            return res.status(200).send('comment delete successfully')

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createComment,
    getAllComents,
    getCommentById,
    deleteComment
}