import { MantineThemeOverride } from '@mantine/core';


export default function getDefaultTheme(): MantineThemeOverride {
    return {
        colorScheme: 'light',
        defaultRadius: 'lg',
        primaryColor: 'violet',
        primaryShade: 5,
        colors: {
            primarycolor: ['#5cDB95', '#5cDB95', '#5cDB95', '#5cDB95', '#5cDB95', '#5cDB95', '#5cDB95', '#5cDB95', '#5cDB95', '#5cDB95'],
            highlightcolor: ['#8EE4AF', '#8EE4AF', '#8EE4AF', '#8EE4AF', '#8EE4AF', '#8EE4AF', '#8EE4AF', '#8EE4AF', '#8EE4AF', '#8EE4AF'],
            secondarycolor: ['#05386B', '#05386B', '#05386B', '#05386B', '#05386B', '#05386B', '#05386B', '#05386B', '#05386B', '#05386B',]
        }
    }
}