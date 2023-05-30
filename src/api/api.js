const api = require('express').Router();

const jwtMiddleware = require('../middlewares/jwt');
const ArticleRouter = require('./routers/article');
const ProfileRouter = require('./routers/profile');
const loginRouter = require('./routers/login');
const registerRouter = require('./routers/register');


api.use('/login', loginRouter);
api.use('/signup', registerRouter);
api.use('/', jwtMiddleware.jwtVerify);
api.use('/' , ArticleRouter)
api.use('/' , ProfileRouter)

module.exports = api;
