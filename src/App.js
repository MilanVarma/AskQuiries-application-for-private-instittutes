import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home';

import LandingPage from './LandingPage';
import Login from './Login';
import AskQuestion from './AskQuestion';
import ViewQuestion from './ViewQuestion';
import Profile from './Profile';
import SignUp from './SignUp';
import PublicQuestions from './PublicQuestions.js';
import YourQuestions from './YourQuestions';

function App() {
  return (
   <Router>
     <Switch>

        <Route exact path="/">
            <LandingPage />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/signup">
            <SignUp />
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/askquestion">
          <AskQuestion />
        </Route>

        <Route exact path="/ViewQuestion/:id">
          <ViewQuestion />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>

        <Route exact path="/publicquestion">
          <PublicQuestions />
        </Route>

        <Route exact path="/yourquestions">
          <YourQuestions />
        </Route>

     </Switch>
   </Router>
  );
}

export default App;
