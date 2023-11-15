"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    /**
     * @swagger
     * /api/comments:
     *   post:
     *     summary: Create a new comment
     *     description: Create a new comment with the provided text, ticket, and user
     *     tags:
     *       - Comments
     *     parameters:
     *       - in: body
     *         name: comment
     *         description: The comment information to create
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             text:
     *               type: string
     *             ticket:
     *               type: string
     *             user:
     *               type: string
     *     responses:
     *       201:
     *         description: Successfully created a new comment
     *       500:
     *         description: Internal server error
     */
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { text, ticketId, user } = req.body;
                const newComment = yield this.commentService.createComment(ticketId, user, text);
                res.status(201).json(newComment);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to create comment.' });
            }
        });
    }
    /**
     * @swagger
     * /api/comments/{id}:
     *   patch:
     *     summary: Update a comment
     *     description: Update the text of an existing comment
     *     tags:
     *       - Comments
     *     parameters:
     *       - in: path
     *         name: id
     *         description: The ID of the comment to update
     *         required: true
     *         type: string
     *       - in: body
     *         name: comment
     *         description: The updated comment text
     *         required: true
     *         schema:
     *           type: object
     *           properties:
     *             text:
     *               type: string
     *     responses:
     *       200:
     *         description: Successfully updated the comment
     *       404:
     *         description: Comment not found
     *       500:
     *         description: Internal server error
     */
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { text } = req.body;
                const updatedComment = yield this.commentService.update(id, { text });
                if (!updatedComment) {
                    return res.status(404).json({ error: 'Comment not found.' });
                }
                res.status(200).json(updatedComment);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to update comment.' });
            }
        });
    }
    /**
     * @swagger
     * /api/comments/{id}:
     *   delete:
     *     summary: Delete a comment
     *     description: Delete an existing comment
     *     tags:
     *       - Comments
     *     parameters:
     *       - in: path
     *         name: id
     *         description: The ID of the comment to delete
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Successfully deleted the comment
     *       404:
     *         description: Comment not found
     *       500:
     *         description: Internal server error
     */
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deleted = yield this.commentService.delete(id);
                if (!deleted) {
                    return res.status(404).json({ error: 'Comment not found.' });
                }
                res.status(200).json({ message: 'Comment deleted successfully.' });
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to delete comment.' });
            }
        });
    }
    /**
     * @swagger
     * /api/comments:
     *   get:
     *     summary: Get all comments
     *     description: Get a list of all comments
     *     tags:
     *       - Comments
     *     responses:
     *       200:
     *         description: Successfully fetched comments
     *       500:
     *         description: Internal server error
     */
    getAllComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield this.commentService.findAll();
                res.status(200).json(comments);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch comments.' });
            }
        });
    }
}
exports.CommentController = CommentController;
