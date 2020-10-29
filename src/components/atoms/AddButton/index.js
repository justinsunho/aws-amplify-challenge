import React from 'react';
import { Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import { EmployeeForm } from '../../molecules';
import { createEmployee, createSkill } from '../../../graphql/mutations';
import { listEmployees } from '../../../graphql/queries';

const updateCache = (cache, { data }) => {
    const existingEmployees = cache.readQuery({
        query: gql(listEmployees),
    });

    const newEmployee = data.createEmployee;

    cache.writeQuery({
        query: gql(listEmployees),
        data: {
            listEmployees: {
                items: [newEmployee, ...existingEmployees.listEmployees.items],
            },
        },
    });
};

const AddButton = () => {
    const [_createEmployee] = useMutation(gql(createEmployee), {
        update: updateCache,
    });
    const [_createSkill] = useMutation(gql(createSkill));
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (firstName, lastName, skills) => {
        _createEmployee({
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
                    _createSkill({
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
                variant="contained"
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
