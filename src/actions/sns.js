const
aws = require('../services/aws'),
sns = new aws.SNS({apiVersion: '2010-03-31'}),

sendTopic = function(param)
{
  return (dispatch, getState) =>
  {
    dispatch({ type: 'SNS_INIT' })

    sns.publish(
      param,
      (err, data) =>
      {
        if (err) dispatch({ type: 'ERROR', error: err })
        else dispatch({ type: 'SNS_SUCCESS' })
      }
    )
  }
}

module.exports = sendTopic
