import { ActionIcon, Badge, Button, Kbd, Text, Textarea, Title } from '@mantine/core';
import { IconArrowRight, IconInfoCircle, IconX } from '@tabler/icons';
import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import { useAppContext } from '../../data/context/app-context';
import { useCommonStyles } from '../../Utils/commonStyles';
import { useFormStyles } from './formstyles';

const SkillsForm = () => {

  const { classes: formStyles } = useFormStyles();
  const { classes: common } = useCommonStyles();

  const { updateUser, currentUser } = useAppContext();

  const [skills, setskills] = useState(currentUser.skills || []);
  const [skillstring, setskillstring] = useState('');
  const [summaryError, setsummaryError] = useState('');
  const [changeDetected, setChangeDetected] = useState(false);

  useEffect(() => {
    setChangeDetected(skillstring.length>0);
  }, [skillstring]);

  useEffect(() => {
    setskills(currentUser.skills);
  }, [currentUser.skills])


  function processInput(input: string) {
    return input.split(',')
      .filter(item => item.length > 0)
      .map(item => item.trim())
  }

  function handleSave() {
    const skillValues = processInput(skillstring);
    updateUser({
      ...currentUser,
      skills: [...currentUser.skills, ...skillValues]
    })
    setChangeDetected(false);
    setskillstring('');
  }

  function handleRemoveSkill(skill: string) {
    updateUser({
      ...currentUser,
      skills: currentUser.skills.filter(item => item !== skill)
    })
  }


  return (
    <form className={formStyles.formContainer}>
      {/* Form Header Start*/}
      <div className={common.dflex}>
        <Title size='sm' className={formStyles.title}>Add your key skills.</Title>
        <ActionIcon><IconInfoCircle size={18} className={formStyles.title} /></ActionIcon>
      </div>
      <Text color='dimmed' size='sm' mb='xs'>List all your skills which are relevant to the position you are applying for. We recommend to not add more than 20.</Text>
      {/* Form Header End*/}

      {/* Form Body Start */}
      {
        skills.length > 0 &&
        <>
        <Text color='dimmed' size='xs' mb='xs' italic>Key Skills ({skills.length})</Text>
          <div className={`${common.dflex} ${formStyles.mbmd}`}>
            {
              skills.map((skl) => (<Badge mr='xs' variant='light' key={'skill_' + uniqueId()} rightSection={<ActionIcon color='red' size='xs' onClick={() => handleRemoveSkill(skl)} ><IconX size={12} /></ActionIcon>}>{skl}</Badge>))
            }
          </div>
        </>
      }
      <div className={`${formStyles.mbmd}`}>
        <Textarea maxRows={3} minRows={3} placeholder='Eg: Adobe Illustrator, Final Cut, Microsoft Word' value={skillstring} onChange={(e) => setskillstring(e.target.value || '')} />
        <Text color='dimmed' size='sm' ml='xs'>Type in your relevant skills seperated by COMMA {<Kbd py={0} m={0}>,</Kbd>}.</Text>
      </div>
      <div className={`${common.center}`}>
        <Button leftIcon={<IconArrowRight size={16} />} onClick={handleSave} disabled={!changeDetected}>Save</Button>
      </div>
      {/* Form Body End */}
    </form>
  )
}

export default SkillsForm