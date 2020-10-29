import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { deleteEmployee, deleteSkill } from './../../../graphql/mutations';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    icon: {
        padding: '0 0.5rem',
    },
});

const DeleteButton = ({ employeeId }) => {
    const [_deleteEmployee] = useMutation(gql(deleteEmployee));
    const [_deleteSkill] = useMutation(gql(deleteSkill));
    const classes = useStyles();

    const handleDelete = (employeeId) => {
        _deleteEmployee({
            variables: {
                input: {
                    id: employeeId,
                },
            },
        }).then(
            ({
                data: {
                    deleteEmployee: {
                        skills: { items },
                    },
                },
            }) => {
                items.forEach((item) =>
                    _deleteSkill({
                        variables: {
                            input: {
                                id: item.id,
                            },
                        },
                    })
                );
            }
        );
    };

    return (
        <IconButton
            aria-label="delete"
            onClick={() => handleDelete(employeeId)}
            className={classes.icon}
        >
            <DeleteIcon />
        </IconButton>
    );
};

export default DeleteButton;
