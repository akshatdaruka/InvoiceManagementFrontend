import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import theme from '../src/utils/theme';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import MyStore from "./reducers/MyStore";
// ReactDOM.render(
//   <Provider store={MyStore}>
//   <MuiThemeProvider theme={theme}>
//       <App />
//     </MuiThemeProvider>
//     </Provider>,
//   document.getElementById('root')
// );
/*
CRACKED BY ILLUMINATI
TRUST US AND UNCOMMENT THIS CODE ONCE YOU SETUP YOUR REDUX STORE ;-)*/
 ReactDOM.render(
   <Provider store={MyStore}>
     <MuiThemeProvider theme={theme}>
       <App />
     </MuiThemeProvider>
   </Provider>,
   document.getElementById('root')
 );

serviceWorker.unregister();


