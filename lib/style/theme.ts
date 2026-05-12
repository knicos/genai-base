import { createTheme } from '@mui/material/styles';
import colours from '@public/colours.module.css';
import './theme.css';

const isTest = globalThis?.process?.env?.NODE_ENV === 'test';

export const theme = createTheme({
    palette: {
        primary: {
            main: isTest ? '#fff' : colours.primary,
        },
        secondary: {
            main: isTest ? '#fff' : colours.secondary,
        },
        success: {
            main: '#4caf50',
        },
        info: {
            main: '#75a4e2',
        },
        error: {
            main: '#f44336',
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

export const darkChartPalette = isTest
    ? ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']
    : [colours.chartDark1, colours.chartDark2, colours.chartDark3, colours.chartDark4, colours.chartDark5, colours.chartDark6, colours.chartDark7, colours.chartDark8];

export const lightChartPalette = isTest
    ? ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']
    : [colours.chartLight1, colours.chartLight2, colours.chartLight3, colours.chartLight4, colours.chartLight5, colours.chartLight6, colours.chartLight7, colours.chartLight8];

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: isTest ? '#fff' : colours.primaryLight,
        },
        secondary: {
            main: isTest ? '#fff' : colours.secondaryLight,
        },
        success: {
            main: '#81c784',
        },
        info: {
            main: '#a4bfe2',
        },
        error: {
            main: '#ED9C9C',
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
