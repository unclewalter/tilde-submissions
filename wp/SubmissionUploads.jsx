import React, {Component} from 'react';
import ReactS3Uploader from 'react-s3-uploader'

export default class SubmissionUploads extends React.Component {

  render() {
    const uploads = this.props.schema;
    console.log("Upload Schema: ", uploads);
    return (
      <div>
        {uploads.map((upload, index) =>
          <div key={index}>
            <label>{upload.title}</label>
            <p>{upload.description}</p>
            <ReactS3Uploader
              signingUrl="/prod/authorise"
              signingUrlMethod="GET"
              s3path={"/"+this.props.submissionID+"/"+upload.path+"/"}
              preprocess={this.onUploadStart}
              onProgress={this.onUploadProgress}
              onError={this.onUploadError}
              onFinish={this.onUploadFinish}
              signingUrlWithCredentials={ true }
              uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
              contentDisposition="auto"
              server="https://nu6fl9emuh.execute-api.ap-southeast-2.amazonaws.com"
              scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
            />
          </div>
        )}
      </div>
    )
  }
}
