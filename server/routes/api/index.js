const router = require('express').Router();
const { graphql } = require('graphql');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

module.exports = router;
