import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center',
        padding: theme.spacing(2),
        marginTop: 'auto',
        color: 'black !important',
    },
    footerLinks: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(1),
    },
    footerLink: {
        margin: '0px 16px !important',
        color: 'black !important',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <Box className={classes.footer}>
            <Typography variant="body1">
                &copy; {new Date().getFullYear()} Genie. All rights reserved.
            </Typography>
            <Box className={classes.footerLinks}>
                <Link component={RouterLink} to="/about" className={classes.footerLink}>
                    About Us
                </Link>
                <Link component={RouterLink} to="/contact" className={classes.footerLink}>
                    Contact Us
                </Link>
            </Box>
        </Box>
    );
};

export default Footer;
