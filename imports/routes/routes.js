import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route ,browserHistory } from 'react-router';

import signup from '../UI/Signup';
import link from '../UI/Link';
import notfound from '../UI/NotFound';
import login from '../UI/Login';

// window.browserHistory = browserHistory;
const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/link']
const onEnterPublicPages = () => {
  if (Meteor.userId()){
    browserHistory.replace('/link');
  }
};
const onEnterPrivatePages = () => {
  if (!Meteor.userId() ) {
    browserHistory.replace('/');
  }
};
export const onAuthChange=(isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnautheticatedPage =unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  if (isUnautheticatedPage && isAuthenticated) {
    browserHistory.replace('/link');
  }else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
export const routes = (
  <Router history={browserHistory}>
       <Route path="/signup" exact={true} component={signup} onEnter={onEnterPublicPages}/>
       <Route path="/Link" exact={true} component={link} onEnter={onEnterPrivatePages}/>
       <Route path="/" exact={true} component={login} onEnter={onEnterPublicPages}/>
       <Route path="*" component={notfound}/>
  </Router>
);
