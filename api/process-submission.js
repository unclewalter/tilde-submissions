var crypto = require('crypto'),
  fs = require('fs'),
  AWS = require('aws-sdk');

var getFilesizeInBytes = function(filename) {
  var stats = fs.statSync(filename)
  var fileSizeInBytes = stats["size"]
  return fileSizeInBytes
}

var removeEmptyStringElements = function(obj) {
  for (var prop in obj) {
    if (typeof obj[prop] === 'object') {// dive deeper in
      removeEmptyStringElements(obj[prop]);
    } else if(obj[prop] === '') {// delete elements that are empty strings
      delete obj[prop];
    }
  }
  return obj;
}

/*
Function Name: processSubmission

Process:
1. Receives Expression of Interest submission details.
2. Generates hash from email address.
3. Generates PDF file named <hash>-<timestamp>.pdf using the submission details
   - TODO: Possibly move this process into another module.
4. Concatinates CV from submission
5. Pushes the PDF file to S3.
*/

module.exports.processSubmission = function(submissionDetails, callback) {
  const hash = crypto.createHash('md5').update(submissionDetails.email).digest("hex");
  const identifier = submissionDetails.timestamp + '_' + hash;

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "tilde-submissions",
    Item: removeEmptyStringElements(submissionDetails)
  };

  params.Item.submissionID = identifier;

  console.log("Adding a new item...");
  docClient.put(params, function(err, data) {
    if (err) {
      callback(("Unable to add item. Error JSON: "+JSON.stringify(err, null, 2)), null);
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      var returnPayload = {
        submissionID: identifier,
        message: "Submission Successful"
      }
    }
    callback(err, returnPayload);
  });
};
