import { ActionIcon, Card, createStyles, Grid, Modal, ScrollArea, Text, Title } from '@mantine/core'
import { IconArrowLeft, IconBoxMultiple, IconUsers } from '@tabler/icons'
import { uniqueId } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useCommonStyles } from '../../../Utils/commonStyles'
import { SummaryHint, summaryHints } from '../../../Utils/summaryHintDB'
import { useFormStyles } from '../../forms/formstyles'

interface SummaryHintProps {
    open: boolean,
    onClose: () => any,
    onSelect: (summary: string) => any
}

const useStyles = createStyles(theme => ({
    hintsList: {
        maxHeight: 500,
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    mrmd:{

    }
}))

const SummaryHint = ({ open, onClose, onSelect=()=>{} }: SummaryHintProps) => {

    const { classes: formStyles } = useFormStyles();
    const { classes: common } = useCommonStyles();
    const [selectedGroup, setSelectedGroup] = useState<SummaryHint>();
    const { classes: styles } = useStyles();

    useEffect(()=>{
        setSelectedGroup(undefined);
    },[])


    const handleBackButtonClick = useCallback(() => {
        setSelectedGroup(undefined);
    }, []);

    const handleSummaryClick = useCallback((selectedSummary:string) => {
        onSelect(selectedSummary);
    }, []);
    

    return (
        <Modal opened={open} onClose={onClose} size='lg' centered withCloseButton >
            <div className={`${common.dflex} ${formStyles.mbmd}`}>
                {selectedGroup ? <ActionIcon mr='sm' className={common.primaryColor} onClick={handleBackButtonClick}><IconArrowLeft /></ActionIcon>:
                <ActionIcon mr='sm' className={common.primaryColor} disabled><IconUsers size={16} className={common.primaryColor}/></ActionIcon>}
                <div>
                    <Title size={16} className={common.primaryColor}>{selectedGroup ? selectedGroup.group : 'Select Group'}</Title>
                    <Text color='dimmed' size='sm'>{selectedGroup ? selectedGroup.description : 'Choose from any of the groups to get a list of potential summaries.'}</Text>
                </div>
            </div>

            <Grid className={styles.hintsList}>
                {
                    selectedGroup ?
                        selectedGroup.summaries.map(summ => (
                            <Grid.Col key={`summary-${uniqueId()}`}>
                                <Card withBorder className={common.selectable} onClick={()=>handleSummaryClick(summ)}>
                                    <Text color='dimmed' size='xs'>{summ}</Text>
                                </Card>
                            </Grid.Col>
                        ))
                        : summaryHints.map(hint => (
                            <Grid.Col key={`summary-${uniqueId()}`}>
                                <Card withBorder className={common.selectable} onClick={() => setSelectedGroup(hint)}>
                                    <Title size={14} className={formStyles.title}>{hint.group}</Title>
                                    <Text color='dimmed' size='xs'>{hint.description}</Text>
                                </Card>
                            </Grid.Col>
                        ))
                }
            </Grid>
        </Modal>
    )
}

export default SummaryHint