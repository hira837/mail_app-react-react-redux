import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './index.css';
import reducer from './reducers'
import MailboxIndex from './components/mailbox_index'
import MailboxCreate from './components/mailbox_create'
import MailboxShow from './components/mailbox_show'
import * as serviceWorker from './serviceWorker'

const enhancer =
  process.env.NODE_ENV === "development"
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk)
const store = createStore(reducer, enhancer)

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/mailbox/create" component={MailboxCreate} />
          <Route path="/mailbox/:id" component={MailboxShow} />
          <Route exact path="/" component={MailboxIndex} />
          <Route exact path="/mailbox" component={MailboxIndex} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
