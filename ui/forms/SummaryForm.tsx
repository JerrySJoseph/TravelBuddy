import { Title, ActionIcon, Grid, TextInput, Button, Text, Textarea, useMantineTheme } from '@mantine/core';
import { IconInfoCircle, IconLetterF, IconLetterM, IconLetterL, IconPhoneCall, IconAt, IconLetterA, IconLetterS, IconLocation, IconFlag, IconCheck, IconArrowRight, IconBulb } from '@tabler/icons';
import React, { useCallback, useEffect, useState } from 'react'
import { useAppContext } from '../../data/context/app-context';
import { useCommonStyles } from '../../Utils/commonStyles';
import SummaryHint from '../components/SummaryHint/SummaryHint';
import { useFormStyles } from './formstyles';

const SummaryForm = () => {

  const { classes: formStyles } = useFormStyles();
  const { classes: common } = useCommonStyles();

  const { updateUser, currentUser } = useAppContext();

  const [summary, setsummary] = useState(currentUser.summary || '');
  const [summaryError, setsummaryError] = useState('');
  const [hintsOpen,setHintsOpen]=useState(false);
  const [changeDetected,setChangeDetected]=useState(false);

  useEffect(()=>{
    setChangeDetected(true);
  },[summary])

  const handleSummarySelect=useCallback((newSummary:string)=>{
    setsummary(newSummary);
    setHintsOpen(false);
  },[])

  function handleSave(){
    updateUser({
      ...currentUser,
      summary
    });
    setChangeDetected(false);
  }


  return (
    <form className={formStyles.formContainer}>
      {/* Form Header Start*/}
      <div className={common.dflex}>
        <Title size='sm' className={formStyles.title}>Introduce yourself in not more than 50 words.</Title>
        <ActionIcon><IconInfoCircle size={18} className={formStyles.title} /></ActionIcon>
      </div>
      <Text color='dimmed' size='sm' mb='lg'>Make the best use of summary section to help the recruiter understand why you are the best candidate for this role.</Text>
      {/* Form Header End*/}

      {/* Form Body Start */}
      <div className={`${formStyles.mbmd}`}>
        <Textarea maxRows={10} minRows={6} placeholder='Introduce yourself in 50 words.' value={summary} onChange={(e) => setsummary(e.target.value || '')} />
        <Text color='dimmed' size='sm' ml='xs'>Higlight your skills, experience and why you are the best candidate for this role.</Text>
      </div>
      <div className={`${common.center} ${formStyles.mbmd}`}>
        <Text size='sm' mr='sm' color='violet'>Want help figuring out what should you write?</Text>
        <Button variant='outline' color='yellow' leftIcon={<IconBulb size={16} />} onClick={()=>setHintsOpen(true)}>Get Hints</Button>
      </div>
      <div className={`${common.center}`}>
        <Button leftIcon={<IconArrowRight size={16} />} onClick={handleSave} disabled={!changeDetected}>Save</Button>
      </div>
      {hintsOpen && <SummaryHint open={hintsOpen} onClose={()=>setHintsOpen(false)} onSelect={handleSummarySelect}/>}
      {/* Form Body End */}
    </form>
  )
}

export default SummaryForm