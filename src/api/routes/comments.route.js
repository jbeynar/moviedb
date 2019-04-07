'use strict';

const CommentsManager = require('../managers/comments.manager');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/comments',
        options: {
            tags: ['api'],
            handler: async () => {
                return await CommentsManager.getComments();
            }
        }
    },
    {
        method: 'POST',
        path: '/comments',
        options: {
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {
                        201: {
                            description: 'Comment has been saved'
                        },
                        400: {
                            description: 'Request payload does not match expected format'
                        }
                    },
                    payloadType: 'form'
                }
            },
            validate: {
                payload: {
                    body: Joi.string().required().description('Comment body'),
                    author: Joi.string().required().description('Comment author')
                }
            },
            handler: async (req, h) => {
                const comment = req.payload;
                await CommentsManager.saveComment(comment);
                return h.response().code(201);
            }
        }
    }
];
