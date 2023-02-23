import { Container, createStyles, Grid } from '@mantine/core';
import AppContextProvider from '../../data/context/app-context';
import PreviewSection from '../../ui/components/PreviewSection/PreviewSection';
import SectionSelection from '../../ui/components/SectionSelection/SectionSelection';
import Applayout from '../../ui/layout/AppLayout/Applayout';
import { useCommonStyles } from '../../Utils/commonStyles';

const useStyles = createStyles((theme) => ({
    mainGrid: {
        marginTop: '60px',
        [theme.fn.smallerThan('lg')]: {
            flexDirection: 'column-reverse'
        },
        minHeight: '100%',
    },
    selectionSectionContainer: {
        height: '100%',
        // backgroundColor:'blue',
        [theme.fn.smallerThan('lg')]: {
            display: 'none'
        }
    }
}))

const App = () => {

    const { classes } = useStyles();
    const { classes: common } = useCommonStyles();
    return (
        <AppContextProvider>
            <Applayout>
                <Container fluid p='md' className={common.h100}>
                    <Grid className={classes.mainGrid}>
                        <Grid.Col lg={6} className={classes.selectionSectionContainer}>
                            <SectionSelection />
                        </Grid.Col>
                        <Grid.Col lg={6} >
                            <PreviewSection />
                        </Grid.Col>

                    </Grid>
                </Container>
            </Applayout>
        </AppContextProvider>
    )
}

export default App