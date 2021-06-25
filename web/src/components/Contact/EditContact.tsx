import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter, useHistory, useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import { IValues, ParamsType } from '../../types/ContactsTypes';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        textDecoration: 'none',
    }
}))

function EditContact() {
    const [values, setValues] = useState({} as IValues);
    const { id } = useParams<ParamsType>();
    console.log(id);

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const contact = await axios.get(`http://127.0.0.1:8000/api/contacts/${id}`)
        setValues(contact.data);
        console.log('http://127.0.0.1:8000/api/contacts/' + id)
        console.log(values)
    }

    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event: any) => {
        event.persist();
        axios.put(`http://127.0.0.1:8000/api/contacts/` + id, values).then(data => {
            history.push('/')
        });
    }

    function refreshPage() {
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Alterar Contato
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Nome"
                        type="text"
                        name="name"
                        defaultValue={values.name}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="phone"
                        label="Telefone"
                        type="text"
                        name="phone"
                        defaultValue={values.phone}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="E-mail"
                        type="email"
                        name="email"
                        autoFocus
                        defaultValue={values.email}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="description"
                        label="Descrição"
                        type="text"
                        name="description"
                        defaultValue={values.description}
                        onChange={handleChange}
                    />
                    <Link to={`/`} onClick={refreshPage} className={classes.link} >
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Salvar
                        </Button>
                    </Link>

                </form>

            </div>
        </Container>
    )
}

export default withRouter(EditContact);