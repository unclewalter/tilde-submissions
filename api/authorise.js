var AWS = require('aws-sdk');

AWS.config.loadFromPath('./aws-config.json');
const s3 = new AWS.S3();

module.exports.main = (event, context, callback) =>  {
  const key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });

  var params = {
    Bucket: 'submissions.tilde.net.au',
    Key: key,
    ACL: 'public-read',
    Expires: 120
  };

  s3.getSignedUrl('putObject', params, function (err, url) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, { url });
    }
  });
};
