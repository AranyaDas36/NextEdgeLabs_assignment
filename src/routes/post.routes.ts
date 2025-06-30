import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { authenticateJWT } from '../middleware/auth.middleware';
import multer from 'multer';

const router = Router();
const upload = multer();

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create new post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: "This is my post!"
 *               caption:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               media:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 */
router.post('/', authenticateJWT, upload.single('media'), PostController.createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get feed posts (paginated)
 *     tags: [Post]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Page size
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 */
router.get('/', PostController.getFeed);

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Get specific post
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 */
router.get('/:postId', PostController.getPostById);

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Update post caption/tags
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               caption:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Updated post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 */
router.put('/:postId', authenticateJWT, PostController.updatePost);

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Delete post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       204:
 *         description: Post deleted
 */
router.delete('/:postId', authenticateJWT, PostController.deletePost);

/**
 * @swagger
 * /posts/{postId}/like:
 *   post:
 *     summary: Like/unlike post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post liked/unliked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 */
router.post('/:postId/like', authenticateJWT, PostController.likePost);

/**
 * @swagger
 * /posts/{postId}/likes:
 *   get:
 *     summary: Get post likes
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: List of user IDs who liked the post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/:postId/likes', PostController.getPostLikes);

/**
 * @swagger
 * /posts/user/{userId}:
 *   get:
 *     summary: Get posts for a user
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 */
router.get('/user/:userId', PostController.getUserPosts);

/**
 * @swagger
 * /posts/{postId}/archive:
 *   post:
 *     summary: Archive/unarchive post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               archive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Post archived/unarchived
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 */
router.post('/:postId/archive', authenticateJWT, PostController.archivePost);

export default router; 