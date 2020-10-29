import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';
import { DeleteButton, EditButton } from '../../molecules';

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
