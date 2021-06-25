import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PageviewIcon from '@material-ui/icons/Pageview';
import { Container, Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    marginRight: {
        marginRight: 10
    },
    ciruclarProgress: {
        position: 'absolute',
        left: '50%',
        top: '50%',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

export interface IValues {
    id: number,
    name: string,
    phone: string,
    email: string,
    description: string,
}

export default function ContactTable() {
    const classes = useStyles();
    const [data, setData] = useState([] as IValues[]);
    const [loading, setLoading] = useState(true);
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const contacts = await axios.get('http://127.0.0.1:8000/api/contacts');
        setData(contacts.data);
        setLoading(false);
        if (JSON.stringify(contacts.data) === '[]') {
            setEmpty(true);
        }
        console.log(contacts.data);
    }

    const deleteContact = async (event: any, id: number) => {
        event.persist();
        await axios.delete('http://127.0.0.1:8000/api/contacts/' + id).then(data_ => {
            getData();
        })
    }

    return (
        <>
            {loading && <CircularProgress className={classes.ciruclarProgress} />}
            {!loading && empty && (
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5" >
                            Sem Contatos Adicionados
                        </Typography>
                    </div>
                </Container>
            )}
            {!loading && !empty && (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="right">Telefone</TableCell>
                                <TableCell align="right">Ações</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(contact => (
                                <TableRow key={contact.id}>
                                    <TableCell component="th" scope="row">
                                        {contact.name}
                                    </TableCell>
                                    <TableCell align="right">{contact.phone}</TableCell>
                                    <TableCell align="right">
                                        <Link to={`editar/${contact.id}`}>
                                            <Button><EditIcon /></Button>
                                        </Link>
                                        <Link to={`detalhes/${contact.id}`}>
                                            <Button><PageviewIcon /></Button>
                                        </Link>
                                        <Button><DeleteIcon onClick={e => deleteContact(e, contact.id)} /></Button>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

        </>
    )
}