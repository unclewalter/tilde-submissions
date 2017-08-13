import React, {Component} from 'react';
import Form from "react-jsonschema-form";
import axios from 'axios';


function validate(formData, errors) {
  if (formData.email !== formData.confirm_email) {
    errors.confirm_email.addError("Email and confirmation do not match");
  }
  return errors;
}

const schemas = {
  projects: require('./formSchemas/projects.json')
}

const log = (type) => console.log.bind(console, type);
const onSubmit = ({formData}) => {
  console.log("Submitting: " + formData);
  axios.post('https://nu6fl9emuh.execute-api.ap-southeast-2.amazonaws.com/prod/submit', {
    data: formData,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(function (res) {
      console.log("Response: ", res.data);
    })
    .catch(function (err) {
      console.error("Error: ", err.message);
    });
};

class SubmissionForms extends Component {
  render() {
    const formSelection = this.props.match.params.form;
    const formSchema = schemas[formSelection];

    return (
      <Form schema={formSchema.schema}
        uiSchema={formSchema.uiSchema}
        validate={validate}
        onSubmit={onSubmit}
        onChange={log("changed")}
        onError={log("errors")} />
    );
  }
}
export default SubmissionForms;
