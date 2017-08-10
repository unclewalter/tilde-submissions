import React, {Component} from 'react';
import Form from "react-jsonschema-form";
import axios from 'axios';

const schema = {
  title: "Project Submissions",
  description: "Submissions for the 2019 Tilde festival",
  type: "object",
  required: [
    "name",
    "email",
    "confirm_email",
    "phone_number",
    "discipline",
    "artistBio",
    "cv",
    "project_title",
    "short_description",
    "long_description",
    "duration",
    "technical_requirements",
    "your_equipment",
    "tilde_equipment",
    "setup_time",
    "outsideOfAustralia",
    "soughtFunding",
    "focus_areas",
    "links"
  ],
  properties: {
    name: {
      type: "string",
      title: "Name"
    },
    email: {
      type: "string",
      format: "email",
      title: "Email",
      description: "This information will be used for correspondance with the Tilde team and will not be disseminated to others."
    },
    confirm_email: {
      type: "string",
      format: "email",
      title: "Confirm Email"
    },
    phone_number: {
      type: "string",
      title: "Phone Number",
      description: "This information will be used for correspondance with the Tilde team and will not be disseminated to others."
    },
    discipline: {
      type: "string",
      title: "Discipline",
      "enum": [
        "performance",
        "installation",
        "exhibition",
        "other"
      ],
      "enumNames": [
        "Performance",
        "Installation",
        "Exhibition",
        "Other"]
    },
    artistBio: {
      type: "string",
      title: "Artist Bio (up to 500 words)",
      description: "Give us an idea of who you are, including: your practice and artistic interests. This will be used as programming promotional material and for peer assessment."
    },
    cv: {
      type: "string",
      title: "Brief CV",
      description: "List major career achievements and developments."
    },
    project_title: {
      type: "string",
      title: "Project Title"
    },
    short_description: {
      type: "string",
      title: "Short description/Program notes",
      description: "Program note. This will be used for promotion as well as the festival program"
    },
    long_description: {
      type: "string",
      title: "Long description (up to 500 words)",
      description: "Describe your project in more detail. How you will deliver it? Include repertoire (if relevant). This information will help us to determine whether or not Tilde can facilitate the project."
    },
    duration: {
      type: "string",
      title: "Duration"
    },
    technical_requirements: {
      type: "string",
      title: "Technical Requirements",
      description: "Description of setup"
    },
    your_equipment: {
      type: "string",
      title: "Equipment you will supply",
    },
    tilde_equipment: {
      type: "string",
      title: "Equipment that you would like Tilde to supply								",
    },
    setup_time: {
      type: "string",
      title: "Setup Time",
      description: "Let us know how much time you will need to set up and if you will need access to the site before the day."
    },
    instrumentation: {
      type: "string",
      title: "Instrumentation (if relevant)",
      description: "Please make a note if an instrument requires amplification."
    },
    outsideOfAustralia: {
      type: "boolean",
      title: "Outside Of Australia"
    },
    soughtFunding: {
      type: "string",
      title: "Sought Funding",
      description: "Please give details of the submission and notification dates."
    },
    focus_areas: {
      type: "string",
      title: "Focus Areas",
      description: "Please provide a brief description of how your project addresses these areas. This information will be used by the assessors and will not appear in the program. NB: Site-specific works should go further than simply reacting to the site through improvisation. Artists are encouraged to visit Testing Grounds and discuss possibilities with the Tilde team (info@tilde.net.au)"
    },
    links: {
      type: "string",
      title: "Link(s) to support material",
      description: "Show us an example of your work"
    },
    comments: {
      type: "string",
      title: "Comments",
      description: "Comments/other information"
    }
  }
};

const uiSchema = {
  "artistBio": {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 5
    }
  },
  "cv": {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 5
    }
  },
  "short_description": {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 5
    }
  },
  "long_description": {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 5
    }
  },
  "technical_requirements": {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 5
    }
  },
  "your_equipment": {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 5
    }
  },
  "tilde_equipment": {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 5
    }
  },
  "outsideOfAustralia": {
    "ui:widget": "radio"
  },
  "discipline": {
    "ui:widget": "radio"
  },
  "soughtFunding": {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 5
    }
  },
  "focus_areas": {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 5
    }
  },
  "links": {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 5
    }
  },
  "comments": {
    "ui:widget": "textarea",
    "ui:options": {
      "rows": 5
    }
  }
}

function validate(formData, errors) {
  if (formData.email !== formData.confirm_email) {
    errors.confirm_email.addError("Email and confirmation do not match");
  }
  return errors;
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

class App extends Component {
  render() {
    return (
      <Form schema={schema}
        uiSchema={uiSchema}
        validate={validate}
        onSubmit={onSubmit}
        onChange={log("changed")}
        onError={log("errors")} />
    );
  }
}
export default App;
