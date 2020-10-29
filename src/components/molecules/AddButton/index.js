import React from 'react';
import Button from '@material-ui/core/Button';
import { gql, useMutation } from '@apollo/client';
import { EmployeeForm } from '../index.js';
import { createEmployee, createSkill } from '../../../graphql/mutations';

const AddButton = () => {
    const [addEmployee] = useMutation(gql(createEmployee));
    const [addSkill] = useMutation(gql(createSkill));
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (firstName, lastName, skills) => {
        addEmployee({
            variables: {
                input: {
                    firstname: firstName,
                    lastname: lastName,
                },
            },
        }).then(
            ({
                data: {
                    createEmployee: { id },
                },
            }) => {
                skills.forEach((skill) =>
                    addSkill({
                        variables: {
                            input: {
                                employeeID: id,
                                name: skill,
                            },
                        },
                    })
                );
            }
        );

        setOpen(false);
    };

    return (
        <div>
            <Button
                color="primary"
                onClick={handleClickOpen}
                variant="outlined"
            >
                Add Employee
            </Button>
            <EmployeeForm
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                open={open}
                title={'Add Employee'}
            />
        </div>
    );
};

export default AddButton;
