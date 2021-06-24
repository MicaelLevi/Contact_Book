import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter, useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Container, Typography, TextField, Button } from '@material-ui/core';

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
}))

export interface IValues {
    name: string,
    phone: string,
    email: string,
    description: string,
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

export const defaultValues: IValues = {
    name: "",
    phone: "",
    email: "",
    description: ""
}

function CreateContact<RouteComponentProps>() {
    const [values, setValues] = useState(defaultValues as IValues);

    const classes = useStyles();
    const history = useHistory();

    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event: any) => {
        event.persist();
        axios.post(`http://127.0.0.1:8000/api/contacts`, values).then(data => [
            history.push('/')
        ]);
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Adicionar Contato
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
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
                        required
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
                    <Link to={`/`}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Adicionar
                        </Button>
                    </Link>

                </form>

            </div>
        </Container>
    )
}

export default withRouter(CreateContact);