import React from 'react'
import {useMutation, gql} from '@apollo/client'
import {deleteEmployee, deleteSkill} from './../../../graphql/mutations'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const DeleteButton = ({employeeId}) => {
    const [deleteE] = useMutation(gql(deleteEmployee));
    const [deleteS] = useMutation(gql(deleteSkill))

    const handleDelete = (employeeId) => {
        deleteE({
          variables: {
            input: {
              id: employeeId
            }
          }
        }).then(
          ({data: {deleteEmployee: {skills: {items}}}}) => {
          items.forEach(item => deleteS({
            variables: {
              input: {
                id: item.id
              }
            }
          }))
        });
      }

    return(
        <IconButton aria-label="delete" onClick={() => handleDelete(employeeId)}>
            <DeleteIcon />
        </IconButton>
    )
}

export default DeleteButton