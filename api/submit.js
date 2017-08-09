// // Loading Dependencies
var proc   = require('./process-submission');
//     email  = require('./confirmation-email'),

var AWS = require('aws-sdk');
// import uuid from 'uuid';
// import proc from './process-submission'

module.exports.main = (evt, context, callback) => {

  const event = evt.body;
  const datetime  = new Date();
  const timestamp = datetime.getTime(); // Generate timestamp for server time

  console.log("Incoming: ", event);

  console.log("email address =", event.email);
  console.log("time stamp =", timestamp);

  if (!event.email) {
    context.fail("No email address provided");
  } else if (event.email != event.confirm_email) {
    context.fail("Email address and confirmation do not match!");
  }
  /*
  TODO: Add proper email validation
        Add responses for user feedback
  */

  var submissionDetails = {
    "timestamp":              event.timestamp,
    "name":                   event.name,
    "email":                  event.email,
    "confirm_email":          event.confirm_email,
    "phone_number":           event.phone_number,
    "discipline":             event.discipline,
    "artistBio":              event.artistBio,
    "cv":                     event.cv,
    "project_title":          event.project_title,
    "short_description":      event.short_description,
    "long_description":       event.long_description,
    "duration":               event.duration,
    "technical_requirements": event.technical_requirements,
    "setup_time":             event.setup_time,
    "instrumentation":        event.instrumentation,
    "outsideOfAustralia":     event.outsideOfAustralia,
    "soughtFunding":          event.soughtFunding,
    "focus_areas":            event.focus_areas,
    "links":                  event.links,
    "comments":               event.comments
  };
  proc.processSubmission(submissionDetails, context);
  // const submissionID = uuid.v1();

  // const str = "submissionID: "+submissionID;
  // return callback(null, str);
};
