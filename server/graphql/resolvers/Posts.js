const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find().sort({ createdAt: 1 });
				return posts;
			} catch (error) {
				console.log(error.message);
			}
		},
		async getPost(_, { postId }) {
			try {
				const post = await Post.findById(postId);
				if (post) {
					return post;
				} else {
					throw new Error('Post not found.');
				}
			} catch (error) {
				console.log(error.message);
			}
		}
	},
	Mutation: {
		async createPost(_, { body }, context) {
			const user = checkAuth(context);

			const newPost = new Post({
				body,
				user: user.indexOf,
				username: user.username,
				createdAt: new Date().toISOString()
			});

			const post = await newPost.save();
			context.pubsub.publish('NEW_POST', {
				newPost: post
			});
			return post;
		},
		async deletePost(_, { postId }, context) {
			const user = checkAuth(context);

			try {
				const post = await Post.findById(postId);
				if (user.username === post.username) {
					await post.deleteOne();
					return 'Post deleted.';
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		async likePost(_, { postId }, context) {
			const { username } = checkAuth(context);

			const post = await Post.findById(postId);
			if (post) {
				if (post.likes.find((like) => like.username === username)) {
					post.likes = post.likes.filter((like) => like.username !== username);
				} else {
					post.likes.push({
						username,
						createdAt: new Date().toISOString()
					});
				}
				await post.save();
				return post;
			} else {
				throw new UserInputError('Post not found.');
			}
		}
	},
	Subscription: {
		newPost: {
			subscribe: (_, args, { pubsub }) => pubsub.asyncIterator('NEW_POST')
		}
	}
};