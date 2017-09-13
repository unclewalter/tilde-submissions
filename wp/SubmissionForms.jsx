import React, {Component} from 'react';
import Form from "react-jsonschema-form";
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import {markdown} from 'markdown';
import SubmissionUploads from './SubmissionUploads.jsx';


function validate(formData, errors) {
  if (formData.email != formData.confirm_email) {
    errors.confirm_email.addError("Email and confirmation do not match");
  }
  if (!formData.checkedAestheticConsiderations) {
    errors.checkedAestheticConsiderations.addError("Please be sure to read the aesthetic considerations on the previous page and then confirm in the select box before submitting");
  }
  return errors;
}

const schemas = {
  projects: require('./formSchemas/projects.json')
}

const MarkdownDescriptionField = ({id, description}) => {
  var mdDescription = "";
  if (description) {
    mdDescription = markdown.toHTML(description);
  } else {
     mdDescription = "";
  }
  return <div dangerouslySetInnerHTML={{ __html: mdDescription }} />;
};

const fields = {
  DescriptionField: MarkdownDescriptionField
};

const log = (type) => console.log.bind(console, type);

class SubmissionForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissionPage: 1,
      responseMessage: '',
      submissionID: ''
    };
    const parentThis = this;
    this.onSubmit = ({formData}) => {
      console.log("Submitting: ", JSON.stringify(formData));
      axios.post('https://nu6fl9emuh.execute-api.ap-southeast-2.amazonaws.com/prod/submit', {
        data: formData,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }).then(function (res) {
          console.log("Response: ", res.data);
          parentThis.setState({
            submissionPage: 2,
            responseMessage: res.data.message,
            submissionID: res.data.submissionID
          });
        })
        .catch(function (err) {
          console.error("Error: ", err.message);
          parentThis.setState({
            submissionPage: 3,
            responseMessage: "Error: " + res.data.message
          });
        });
    };
  }

  componentDidMount() {
    this.setState({
      submissionPage: 1,
      responseMessage: '',
      submissionID: ''
    });
  }

  render() {
    const formSelection = this.props.match.params.form;
    const formSchema = schemas[formSelection];
    const { submissionPage, responseMessage, submissionID } = this.state;

    return (
      <div>
        <Link to="/">&laquo; Back</Link>
        <hr />
        {(() => {
          switch (submissionPage) {
            case 1:
              return <Form schema={formSchema.schema}
                uiSchema={formSchema.uiSchema}
                validate={validate}
                onSubmit={this.onSubmit}
                onError={log("errors")}
                fields={fields} />
              break;
            case 2:
              return <SubmissionUploads schema={formSchema.uploadSchema} submissionID={submissionID} />
              break;
            case 3:
              return <div>{responseMessage}</div>
              break;
          }
        })()}
      </div>
    );
  }
}
export default SubmissionForms;
