import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Box, Container, List, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ListLink } from '../../atoms';

const useStyles = makeStyles({
    footer: {
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: '0',
    },
    list: {
        flexDirection: 'row',
        display: 'flex',
    },
});

const Footer = () => {
    const classes = useStyles();

    return (
        <Container>
            <Box display="flex" flexDirection="row" className={classes.footer}>
                <List className={classes.list}>
                    <ListLink href="https://www.linkedin.com/in/justinsunho/">
                        <ListItemIcon>
                            <LinkedInIcon color="primary" fontSize="large" />
                        </ListItemIcon>
                    </ListLink>
                    <ListLink href="https://github.com/justinsunho">
                        <ListItemIcon>
                            <GitHubIcon color="primary" fontSize="large" />
                        </ListItemIcon>
                    </ListLink>
                </List>
            </Box>
        </Container>
    );
};

export default Footer;
