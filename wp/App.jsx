import React, {Component} from 'react';
import SubmissionForms from './SubmissionForms.jsx';
import Home from './Home.jsx';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/forms/:form' component={SubmissionForms}/>
      </Switch>
    );
  }
}
export default App;
