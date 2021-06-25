import React, { useEffect, useState } from 'react';
import { IValues, ParamsType } from '../../types/ContactsTypes';
import axios from 'axios';
import { withRouter, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column'
    },
    typo: {
        textAlign: 'center'
    },
    ciruclarProgress: {
        position: 'absolute',
        left: '50%',
        top: '50%',
    },
}))


function DetailsContact() {
    const [values, setValues] = useState({} as IValues);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<ParamsType>();

    const classes = useStyles();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const contact = await axios.get(`http://127.0.0.1:8000/api/contacts/${id}`)
        setValues(contact.data);
        setLoading(false);
    }

    return (
        <>
            {loading && <CircularProgress className={classes.ciruclarProgress} />}

            {!loading && (<Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" className={classes.typo}>
                        Detalhes
                    </Typography>
                    <p>
                        <span>Nome </span>
                        {values.name}
                    </p>
                    <p>
                        Telefone {values.phone}
                    </p>
                    <p>
                        E-mail {values.email}
                    </p>
                    <p>
                        Descrição {values.description}
                    </p>
                </div>
            </Container>)
            }
        </>

    )
}

export default withRouter(DetailsContact)