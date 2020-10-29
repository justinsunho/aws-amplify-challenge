import React from 'react';
import ListItem from '@material-ui/core/ListItem';

const ListLink = ({ href, children }) => {
    return (
        <ListItem button component="a" href={href}>
            {children}
        </ListItem>
    );
};

export default ListLink;
