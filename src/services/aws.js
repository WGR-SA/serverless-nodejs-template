const
aws = require('aws-sdk'),
config = require('../../config/main').aws

aws.config.update(config)

module.exports = aws
