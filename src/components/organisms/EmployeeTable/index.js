import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { gql, useQuery } from '@apollo/client';
import { listEmployees } from '../../../graphql/queries';
import { AddButton } from '../../atoms';
import { EmployeeRow } from '../../molecules';

const useStyles = makeStyles({
    table: {},
    toolbar: {
        justifyContent: 'space-between',
        padding: '0 1.5rem',
    },
});

const EmployeeTable = () => {
    const { loading, error, data: employeeListData } = useQuery(
        gql(listEmployees)
    );
    const classes = useStyles();

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const {
        listEmployees: { items },
    } = employeeListData;

    return (
        <TableContainer component={Paper}>
            <Toolbar disableGutters className={classes.toolbar}>
                <Typography variant="h6" id="tableTitle" component="div">
                    Employees
                </Typography>
                <AddButton />
            </Toolbar>
            <Table
                aria-label="simple table"
                className={classes.table}
                size="small"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Edit/Delete</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Skills</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <EmployeeRow key={item.id} employee={item} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeeTable;
