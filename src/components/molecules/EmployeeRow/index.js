import React from 'react';
import { Grid, TableCell, TableRow } from '@material-ui/core';
import { DeleteButton, EditButton } from '../../atoms';

const EmployeeRow = ({ employee }) => {
    return (
        <TableRow key={employee.id}>
            <TableCell>
                <Grid container direction="row">
                    <DeleteButton employeeId={employee.id} />
                    <EditButton employeeId={employee.id} />
                </Grid>
            </TableCell>
            <TableCell component="th" scope="row">
                {employee.firstname}
            </TableCell>
            <TableCell>{employee.lastname}</TableCell>
            <TableCell>
                {employee.skills.items.map((skill) => skill.name).join(', ')}
            </TableCell>
        </TableRow>
    );
};

export default EmployeeRow;
