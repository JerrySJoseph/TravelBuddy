import { Burger, createStyles, Drawer, MediaQuery, Title, useMantineTheme } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { useState } from 'react';
import { DarkThemeToggleSwitch } from '../DarkThemeToggleSwitch/DarkThemeToggleSwitch';
import SectionSelection from '../SectionSelection/SectionSelection';

const useStyles = createStyles((theme) => ({
    navContainer: {
        height: '60px',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        padding: theme.spacing.md,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,

    },
    menuIcon: {
        display: 'none',
    },
    navShadow: {
        transition: '0.5s',
        boxShadow: theme.shadows.sm
    }

}))
const TopNavbar = () => {
    const { classes } = useStyles();
    const [menuOpen, setMenuOpen] = useState(false);
    const theme = useMantineTheme();

    const [scroll] = useWindowScroll();



    return (
        <nav className={`${classes.navContainer} ${scroll.y > 0 && classes.navShadow}`}>
            <Title size='md'>Resume King</Title>
            <DarkThemeToggleSwitch />
            <MediaQuery smallerThan='lg' styles={{display:'block'}}>
                <Burger opened={menuOpen} onClick={() => setMenuOpen(c => !c)} className={classes.menuIcon} />
                
            </MediaQuery>
            <MediaQuery smallerThan='lg' styles={{display:'block'}}>
            <Drawer
                    opened={menuOpen}
                    overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                    overlayOpacity={0.55}
                    overlayBlur={3}
                    padding='md'
                    size='xl'
                    className={classes.menuIcon}
                    onClose={() => setMenuOpen(false)}
                    position='right'>
                    <SectionSelection />
                </Drawer>
            </MediaQuery>
        </nav>
    )
}

export default TopNavbar