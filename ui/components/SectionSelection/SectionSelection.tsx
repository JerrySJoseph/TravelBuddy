import { ActionIcon, Button, Card, createStyles, Divider, Grid, ScrollArea, Text, Title, Transition } from '@mantine/core'
import { IconBoxMultiple, IconNewSection, IconUserExclamation, IconNotes, IconBriefcase, IconBook, IconTools, IconCertificate, IconArrowBack, IconArrowLeft, IconWorld, IconLanguage, IconStars } from '@tabler/icons';
import React, { useCallback, useState } from 'react'
import { useCommonStyles } from '../../../Utils/commonStyles';
import { uniqueId } from 'lodash'
import NewSectionForm from '../../forms/NewSectionForm';
import PersonalDetailForm from '../../forms/PersonalDetailForm';
import SummaryForm from '../../forms/SummaryForm';
import WorkExperienceForm from '../../forms/WorkExperienceForm';
import EducationForm from '../../forms/EducationForm';
import SkillsForm from '../../forms/SkillsForm';
import CertificationsForm from '../../forms/CertificationsForm';
import LanguageForm from '../../forms/LanguageForm';
import AchievementsForms from '../../forms/AchievementsForms';


const useStyles = createStyles((theme) => ({
    sectionItem: {
        height: '100%',
    },
    sectionHeader: {
        padding: theme.spacing.sm,
        color: theme.colors.violet[5]
    },
    sectionBody: {
        padding: theme.spacing.sm,
        overflow: 'auto',
        height:'100%',
        [theme.fn.smallerThan('lg')]: {
            height: '80%',
        },

    },
    sectionFooter: {
        padding: theme.spacing.sm
    },
    
    selectedSection: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.violet[0]
    },
    newSectionContainer: {
        textAlign: 'center',
        color: theme.colors.violet[5],
    },
    headerText: {
        marginLeft: theme.spacing.xs
    }
}));

interface Section {
    title: string,
    description: string,
    icon: React.ReactNode,
    smallIcon: React.ReactNode,
    key: string
}

const DEFAULT_SECTIONS: { [key: string]: Section } = {
    personalDetails: {
        title: 'Personal Details',
        description: 'Name, Email, Phone, address, etc.',
        icon: <IconUserExclamation size={60} />,
        smallIcon: <IconUserExclamation size={30} />,
        key: 'personalDetails'
    },
    summary: {
        title: 'Summary',
        description: 'A small but good introduction about yourself.',
        icon: <IconNotes size={60} />,
        smallIcon: <IconNotes size={30} />,
        key: 'summary'
    },
    workExperience: {
        title: 'Work Experience',
        description: 'Professional or voluntary work experience',
        icon: <IconBriefcase size={60} />,
        smallIcon: <IconBriefcase size={30} />,
        key: 'workExperience'
    },
    education: {
        title: 'Education',
        description: 'Your Educational qualifications',
        icon: <IconBook size={60} />,
        smallIcon: <IconBook size={30} />,
        key: 'education'
    },
    skills: {
        title: 'Key Skills',
        description: 'List all your relevant skills for the job.',
        icon: <IconTools size={60} />,
        smallIcon: <IconTools size={30} />,
        key: 'skills'
    },
    certifications: {
        title: 'Certifications',
        description: 'List all the certifications you have.',
        icon: <IconCertificate size={60} />,
        smallIcon: <IconCertificate size={30} />,
        key: 'certifications'
    },
    languages: {
        title: 'Languages',
        description: 'List all the languages you speak, read and write.',
        icon: <IconLanguage size={60} />,
        smallIcon: <IconLanguage size={30} />,
        key: 'languages'
    },
    achievements: {
        title: 'Achievements',
        description: 'List all your achievements.',
        icon: <IconStars size={60} />,
        smallIcon: <IconStars size={30} />,
        key: 'achievements'
    },
}

const SectionSelection = () => {
    const { classes: common } = useCommonStyles();
    const { classes: styles } = useStyles();
    const [selectedSection, setSelectedSection] = useState<Section>();
    const [sections, setSections] = useState<Section[]>(Object.values(DEFAULT_SECTIONS).map(r => r));

    const handleBackButtonClick = useCallback(() => {
        setSelectedSection(undefined);
    }, []);

    const handleAddSection = useCallback(() => {
        const id = uniqueId();
        setSections(old => [...old, {
            title: 'New Section_' + id,
            description: 'This is a new Section',
            icon: <IconNewSection size={60} />,
            smallIcon: <IconNewSection size={30} />,
            key: 'new_section_' + id
        }])
    }, []);

    const getForm = (section: Section): React.ReactNode => {
        if (!section)
            return <></>

        switch (section.key) {
            case 'personalDetails': return <PersonalDetailForm />
            case 'summary': return <SummaryForm />
            case 'workExperience': return <WorkExperienceForm />
            case 'education': return <EducationForm />
            case 'skills': return <SkillsForm />
            case 'certifications': return <CertificationsForm />
            case 'languages': return <LanguageForm />
            case 'achievements': return <AchievementsForms />
            default: return <NewSectionForm />;
        }
    }

    return (
        <section style={{ height: '100%' }}>
            <Card withBorder p={0} sx={{ height: '100%', }}>
                <div className={styles.sectionHeader}>
                    <div className={common.dflex}>
                        {selectedSection && <ActionIcon mr='sm' className={common.primaryColor} onClick={handleBackButtonClick}><IconArrowLeft /></ActionIcon>}
                        <div className={common.dflex}>
                            {selectedSection ? selectedSection.smallIcon : <IconBoxMultiple size={30} />}
                            <div className={`${styles.headerText}`}>
                                <div className={`${common.dflex}`}>
                                    <Title size={20} mr='xs'>{selectedSection ? selectedSection.title : 'Select Sections'}</Title>

                                </div>
                                <Text color='dimmed' size='sm'>{selectedSection ? selectedSection.description : 'You can select section from below on which you want to work on.'}</Text>
                            </div>
                        </div>
                    </div>

                </div>

                <Divider mb='xs' />
                {/** Personal Details */}
                {
                    selectedSection ?
                        <div className={styles.sectionBody} >
                            {getForm(selectedSection)}
                        </div> :
                        <Grid className={styles.sectionBody}>
                            {
                                sections && Object.values(sections).map(sec => (
                                    <Grid.Col key={sec.key} sm={4}>
                                        <Card withBorder className={`${styles.sectionItem} ${common.selectable}`}
                                            onClick={() => setSelectedSection(sec)}>
                                            <div className={`${common.center} ${common.primaryColor}`}>
                                                {sec.icon}
                                            </div>
                                            <div className={`${common.textCenter} ${common.primaryColor}`}>
                                                <Title size={17} mt='xs'>{sec.title}</Title>
                                                <Text color='dimmed' size='sm'>{sec.description}</Text>
                                            </div>
                                        </Card>
                                    </Grid.Col>
                                ))
                            }
                            <Grid.Col>
                                <div className={styles.newSectionContainer}>
                                    <Text size='md' mt='sm' mb='xs'>How about adding your custom section?</Text>
                                    <Button mb='sm' leftIcon={<IconNewSection />} onClick={handleAddSection}>New Section</Button>
                                </div>
                            </Grid.Col>

                        </Grid>

                }


            </Card>
        </section>
    )
};



export default SectionSelection