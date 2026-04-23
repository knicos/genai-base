import { createTheme } from '@mui/material/styles';
import colours from '@public/colours.module.css';
import './theme.css';

const isTest = globalThis?.process?.env?.NODE_ENV === 'test';

export const theme = createTheme({
    palette: {
        primary: {
            main: isTest ? '#fff' : colours.primary,
            light: isTest ? '#fff' : colours.primary,
            dark: isTest ? '#fff' : colours.primaryLight,
        },
        secondary: {
            main: isTest ? '#fff' : colours.secondary,
            light: isTest ? '#fff' : colours.secondary,
            dark: isTest ? '#fff' : colours.secondaryLight,
        },
        success: {
            main: '#4caf50',
            light: '#4caf50',
            dark: '#81c784',
        },
        info: {
            main: '#75a4e2',
            light: '#75a4e2',
            dark: '#a4bfe2',
        },
        error: {
            main: '#f44336',
            light: '#f44336',
            dark: '#e57373',
        },
    },
    typography: {
        fontFamily: [
            'Andika',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: isTest ? '#fff' : colours.primaryLight,
            light: isTest ? '#fff' : colours.primary,
            dark: isTest ? '#fff' : colours.primaryLight,
        },
        secondary: {
            main: isTest ? '#fff' : colours.secondaryLight,
            light: isTest ? '#fff' : colours.secondary,
            dark: isTest ? '#fff' : colours.secondaryLight,
        },
        success: {
            main: '#81c784',
            light: '#4caf50',
            dark: '#81c784',
        },
        info: {
            main: '#a4bfe2',
            light: '#75a4e2',
            dark: '#a4bfe2',
        },
        error: {
            main: '#e57373',
            light: '#f44336',
            dark: '#e57373',
        },
    },
    typography: {
        fontFamily: [
            'Andika',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});
