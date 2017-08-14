import React, {Component} from 'react';
import Form from "react-jsonschema-form";
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';


function validate(formData, errors) {
  if (formData.email != formData.confirm_email) {
    errors.confirm_email.addError("Email and confirmation do not match");
  }
  if (!formData.checkedAestheticConsiderations) {
    errors.checkedAestheticConsiderations.addError("Please be sure to read the aesthetic considerations on the previous page and then mark the check box before submitting");
  }
  return errors;
}

const schemas = {
  projects: require('./formSchemas/projects.json')
}

const log = (type) => console.log.bind(console, type);

class SubmissionForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisible: true,
      responseMessage: ''
    };
    const parentThis = this;
    this.onSubmit = ({formData}) => {
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
          parentThis.setState({
            formVisible: false,
            responseMessage: res.data.message
          });
        })
        .catch(function (err) {
          console.error("Error: ", err.message);
          parentThis.setState({
            formVisible: false,
            responseMessage: "Error: " + res.data.message
          });
        });
    };
  }

  componentDidMount() {
    this.setState({
      formVisible: true,
      responseMessage: ''
    });
  }

  render() {
    const formSelection = this.props.match.params.form;
    const formSchema = schemas[formSelection];
    const { formVisible, responseMessage } = this.state;

    return (
      <div>
        <Link to="/">&laquo; Back</Link>
        <hr />
        {
          formVisible
            ? <Form schema={formSchema.schema}
                uiSchema={formSchema.uiSchema}
                validate={validate}
                onSubmit={this.onSubmit}
                onChange={log("changed")}
                onError={log("errors")} />
            : <div>{responseMessage}</div>
        }
      </div>
    );
  }
}
export default SubmissionForms;
