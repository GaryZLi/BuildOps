import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Logo from '../../picSrc/logo.png';

const useStyles = makeStyles({
    root: {
        height: 100,
        width: '100%',
        backgroundColor: '#009be5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        color: 'white',
    },
    logo: {
        background: 'transparent',
        maxWidth: 50,
        maxHeight: 50,
        marginLeft: 20,
    },
});

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                BOPS
            </div>
            <img className={classes.logo} src={Logo} alt='logo'/>
        </div>
    );
};

export default Header;