import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            alignContent: "center"
        },
        menuButton: {
            marginRight: theme.spacing(2),
            textDecoration: "none",
        },
        appBar: {
            alignItems: "center",
        },
    }),
);

function Header() {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar variant="dense" >
                <NavLink exact activeClassName="active" to="/" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" className={classes.menuButton}>
                        Pagina Inicial
                    </Button>

                </NavLink>
                <NavLink exact activeClassName="active" to="/adicionar" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" className={classes.menuButton}>
                        Adicionar Contato
                    </Button>

                </NavLink>
            </Toolbar>
        </AppBar>


    )
};

export default Header;