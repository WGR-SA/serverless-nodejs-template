const
_ = require('lodash'),
aws = require('../services/aws'),
cloudwatchlogs = new aws.CloudWatchLogs({apiVersion: '2014-03-28'}),
logStreamName = process.env.STAGE+'-registry',
logGroupName= '/aws/lambda/read-doc',

sendLog = function()
{
  return (dispatch, getState) =>
  {
    dispatch({ type: 'LOG_INIT' })

    let
    params =
    {
      logGroupName: logGroupName, /* required */
    }
    cloudwatchlogs.describeLogStreams(params, (err, data) =>
    {
      if (err) dispatch({ type: 'ERROR', error: err })
      else dispatch(log(data.logStreams.find(logStream => logStream.logStreamName = logStreamName))) // successful response
    })
  }
},

log = function(logStream)
{
  return (dispatch, getState) =>
  {
    dispatch({ type: 'LOG_LOG' })

    let
    params =
    {
      logEvents:
      [
        {
          message: _.get(getState(),'message.in.key')+': '+_.get(getState(),'message.in.path')+' -> READ!', /* required */
          timestamp: Date.now() /* required */
        },
      ],
      logGroupName: logGroupName, /* required */
      logStreamName: logStreamName, /* required */
    }

    // if uploadSequenceToken!
    if(logStream.uploadSequenceToken) params.sequenceToken = logStream.uploadSequenceToken

    cloudwatchlogs.putLogEvents(params, (err, data) =>
    {
      if (err) console.log(err, err.stack);//dispatch({ type: 'ERROR', error: err })
      else dispatch({ type: 'LOG_SUCCESS' })
    })
  }
}

module.exports = sendLog
