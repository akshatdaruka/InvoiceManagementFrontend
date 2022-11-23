import React from 'react';
import { Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import App from './appb';
import Table from "./table";
const useStyles = makeStyles((theme) => ({
    root: {
      color: "blue",
      backgroundColor: "blue",
    },
  }));
export default function Box(){
    const classes = useStyles();
    return (<Paper className={classes.root}>
      <App/>
      <Table/>
        </Paper>)
}