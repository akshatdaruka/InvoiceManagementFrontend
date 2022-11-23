import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Add from './Addbutton';
import Edit from './editbutton';
import Delete from './deletebutton';
import PredictButton from './PredictButton';
import CorrButton from './CorrButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#2c414f'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
            position: 'relative',
            display:'inline-block',
            borderRadius: theme.shape.borderRadius,
            borderColor:"#14AFF1",
            height:"4.5vh",
    width:"20vw",
    fontSize:"2vh",
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
              backgroundColor: fade(theme.palette.common.white, 0.25),
            },
    },
    searchIcon: {
        padding: theme.spacing(0.75, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'inline',
        alignItems: 'center',
        justifyContent: 'center',
        right: 0, width: 20, height: 10,
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {

        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        paddingLeft: `calc(1em + ${theme.spacing(-1)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '21ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    button: {
        margin: theme.spacing.unit,

    },
      margin: {
        margin: theme.spacing(1),
      },
      textField: {
        width: '25ch',
      },
}));

export default function Appbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <div className={classes.menuButton}>
                            <PredictButton />
                        </div>

                        <div className={classes.menuButton}>
                            <CorrButton />
                        </div>
                    </IconButton>

                    <Typography className={classes.title} variant="h6" noWrap>

                    </Typography>
                    <div className={classes.menuButton}>
                        <Add />
                    </div>
                    <div className={classes.menuButton}>
                        <Edit />
                    </div>
                    <div className={classes.menuButton}>
                        <Delete />
                    </div>

                   <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search by Invoice"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              style={{borderColor:"#356680"}}
            />
          </div>
                </Toolbar>
            </AppBar>
        </ div>
    );
}
