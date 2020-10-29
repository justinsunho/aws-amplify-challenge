import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import List from '@material-ui/core/List';
import GitHubIcon from '@material-ui/icons/GitHub';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
