import { theme } from '@base/main';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import type { Decorator } from '@storybook/react-vite';
import { Provider } from 'jotai';

export const Theme: Decorator = (Story) => (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
            <Story />
        </ThemeProvider>
    </StyledEngineProvider>
);

export const Recoil: Decorator = (Story) => (
    <Provider>
        <Story />
    </Provider>
);
