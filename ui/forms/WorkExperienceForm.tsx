import { ActionIcon, Box, Button, Card, Grid, List, Modal, Select, SelectItem, Text, Textarea, TextInput, Title } from '@mantine/core';
import { IconArrowRight, IconBriefcase, IconCalendar, IconCircle, IconInfoCircle, IconPlus, IconUser, IconX } from '@tabler/icons';
import { uniqueId } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppContext } from '../../data/context/app-context';
import useForm from '../../data/hooks/useform';
import { WorkExperience } from '../../data/models/user';
import { useCommonStyles } from '../../Utils/commonStyles';
import generateDummyWorkExperience from '../../Utils/generateWorkExperience';
import { useFormStyles } from './formstyles';

const WorkExperienceForm = () => {

  const { classes: formStyles } = useFormStyles();
  const { classes: common } = useCommonStyles();

  const { updateUser, currentUser } = useAppContext();

  const [changeDetected, setChangeDetected] = useState(false);
  const [workExperiences, setWorkExperiences] = useState(currentUser.workexperience);
  const [selectedWorkExperience, setSelectedWorkExperience] = useState<WorkExperience>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setChangeDetected(true);
  }, []);

  useEffect(() => {
    setWorkExperiences(currentUser.workexperience);
    setSelectedWorkExperience(undefined);
    //setOpen(false);
  }, [currentUser.workexperience]);


  function removeSelectedExperience(e:WorkExperience){
    updateUser({
      ...currentUser,
      workexperience:currentUser.workexperience.filter(item=>item.id!==e.id)
    })
  }


  return (
    <form className={formStyles.formContainer}>
      {/* Form Header Start*/}
      <div className={common.dflex}>
        <Title size='sm' className={formStyles.title}>Add your work experience.</Title>
        <ActionIcon><IconInfoCircle size={18} className={formStyles.title} /></ActionIcon>
      </div>
      <Text color='dimmed' size='sm' mb='lg'>List all your previous work experience in reverse chronological order.</Text>
      {/* Form Header End*/}

      {/* Form Body Start */}
      <Grid>
        {workExperiences.map((exp) => (
          <Grid.Col key={'experience_item_' + uniqueId()} lg={6}>
            <WorkExperienceShowComponent experience={exp} 
            onClick={setSelectedWorkExperience}
            onDelete={removeSelectedExperience} /></Grid.Col>
        ))}
      </Grid>
      <div className={common.center}>
        <Button my='sm' leftIcon={<IconPlus size={16} />} onClick={() => setOpen(true)}>New Experience</Button>
      </div>

      {(open || !!selectedWorkExperience) && <WorkExperienceEditModal open={open || !!selectedWorkExperience} onClose={() => {
        setSelectedWorkExperience(undefined)
        setOpen(false)
      }} experience={selectedWorkExperience} />}

      {/* Form Body End */}
    </form>
  )
}

interface WorkExperienceEditModalProps {
  open: boolean,
  onClose: () => any,
  experience?: WorkExperience,

}

const WorkExperienceEditModal = ({ open, onClose, experience }: WorkExperienceEditModalProps) => {

  const { classes: formStyles } = useFormStyles();
  const { classes: common } = useCommonStyles();

  const { updateUser, currentUser } = useAppContext();

  const generateDataForTerm = useCallback((start: number, end: number) => {
    const data: SelectItem[] = [];
    for (let i = start; i <= end; i++) {
      data.push({
        value: `${i}`,
        label: `${i}`
      })
    }
    return data;
  }, []);

  const [termYears, setTermYears] = useState(generateDataForTerm(1950, new Date().getFullYear()))

  const [exp, setExp] = useState(experience);

  //input states
  const [jobtitle, setjobtitle] = useState(exp?.jobtitle || '');
  const [company, setcompany] = useState(exp?.company || '');
  const [termstart, settermstart] = useState(exp?.termstart || 2010);
  const [termend, settermend] = useState(exp?.termend || new Date().getFullYear());
  const [responsibilities, setresponsibilities] = useState<string[]>([])
  const [responsibilityText, setresponsibilityText] = useState<string>('');

  //change detection state
  const [changeDetected, setChangeDetected] = useState(false);

  //error states
  const [jobtitleError, setjobtitleError] = useState('');
  const [companyError, setcompanyError] = useState('');
  const [termstartError, settermstartError] = useState('');
  const [termendError, settermendError] = useState('');
  const [responsibilityTextError, setresponsibilityTextError] = useState<string>('');


  //set data changes to true when user changes anything on the form
  useEffect(() => {
    setChangeDetected(true);
    setjobtitleError('');
    setcompanyError('');
    settermstartError('');
    settermendError('');
  }, [jobtitle, company, termstart, termend, responsibilities]);

  //reset error when change in input text
  useEffect(() => {
    setresponsibilityTextError('');
  }, [responsibilityText])


  const handleAddResponsiblity = () => {
    if (!responsibilityText) {
      setresponsibilityTextError('This field cannot be empty.');
      return;
    }
    setresponsibilities(prev => ([
      ...prev,
      responsibilityText
    ]));
    setresponsibilityText('');
  };


  const validateInputs = (): boolean => {
    if (!jobtitle) {
      setjobtitleError('This field cannot be empty');
      return false;
    }
    if (!company) {
      setcompanyError('This field cannot be empty');
      return false;
    }
    if (!termstart || termstart > termend) {
      settermstartError('Start and end dates are incorrect');
      return false;
    }
    if (!termend || termend < termstart) {
      settermendError('Start and end dates are incorrect');
      return false;
    }

    return true;
  }

  function updateExistingExperience() {
    if (exp)
      updateUser({
        ...currentUser,
        workexperience: currentUser.workexperience.map(item => item.id === exp.id ? {
          id: exp.id,
          jobtitle,
          company,
          termstart,
          termend,
          responsibilities
        } : item)
      })
  }
  function updateNewUser() {
    updateUser({
      ...currentUser,
      workexperience: [
        ...currentUser.workexperience,
        {
          id: 'workexp_' + uniqueId(),
          jobtitle,
          company,
          termstart,
          termend,
          responsibilities
        }
      ]
    });
  }

  function handleSave() {
    if (!validateInputs())
      return;
    if (!exp)
      updateNewUser()
    else
      updateExistingExperience();
    setChangeDetected(false);
    onClose();
  }


  return <Modal centered withCloseButton opened={open} size='lg' onClose={onClose}>
    <form className={formStyles.formContainer}>
      {/* Form Header Start*/}
      <div className={common.dflex}>
        <Title size='sm' className={formStyles.title}>{!exp ? 'Add new' : 'Edit'} work experience.</Title>
        <ActionIcon><IconInfoCircle size={18} className={formStyles.title} /></ActionIcon>
      </div>
      <Text color='dimmed' size='sm' mb='lg'>List all your previous work experience in reverse chronological order.</Text>
      <Grid>
        <Grid.Col>
          <Text color='dimmed' size='sm'  >Job Title *</Text>
          <TextInput placeholder='Job Title' value={jobtitle} icon={<IconUser size={18} />} onChange={(v) => setjobtitle(v.target.value || '')} error={jobtitleError} />
        </Grid.Col>

        <Grid.Col>
          <Text color='dimmed' size='sm' >Company/Organization*</Text>
          <TextInput placeholder='Company/Organization' value={company} icon={<IconBriefcase size={18} />} onChange={(v) => setcompany(v.target.value || '')} error={companyError} />
        </Grid.Col>

        <Grid.Col md={6}>
          <Text color='dimmed' size='sm'>Term Start*</Text>
          <Select icon={<IconCalendar />} data={termYears} value={`${termstart}`} onChange={(e) => settermstart(e ? parseInt(e) : 2010)} error={termstartError} />
        </Grid.Col>
        <Grid.Col md={6}>
          <Text color='dimmed' size='sm' >Term End*</Text>
          <Select icon={<IconCalendar />} data={termYears} value={`${termend}`} onChange={(e) => settermend(e ? parseInt(e) : new Date().getFullYear())} />
        </Grid.Col>
        <Grid.Col>
          <Text size='sm' className={common.primaryColor}>Key responsibilities ({responsibilities.length} items)</Text>
          <Box my='xs'>
            {
              responsibilities.map((res) => (<ResponsibilityItem key={uniqueId()} res={res} onDelete={() => setresponsibilities(prev => prev.filter(item => item !== res))} />))
            }
          </Box>

          {
            responsibilities.length < 3 &&
            <Box className={`${common.dflex} ${common.spaceBetween}`} mb='xs'>
              <Textarea rows={2} my='sm' sx={{ flex: 1 }} placeholder='Type in to add responsibility' value={responsibilityText} onChange={(e) => setresponsibilityText(e.target.value)} error={responsibilityTextError} />
              <ActionIcon ml='sm' variant='filled' color='green' onClick={handleAddResponsiblity}><IconPlus size={14} /></ActionIcon>
            </Box>
          }
        </Grid.Col>
      </Grid>
      <div className={common.center}>
        <Button leftIcon={<IconArrowRight size={16} />} disabled={!changeDetected} onClick={handleSave}>Save</Button>
      </div>
    </form>
  </Modal >
}

interface ResponsibilityItemProps {
  res: string,
  onDelete: () => any,
  [key: string]: any
}
const ResponsibilityItem = ({ res, onDelete, ...props }: ResponsibilityItemProps) => {
  const { classes: common } = useCommonStyles();

  return (
    <Card className={`${common.dflex} ${common.spaceBetween}`} mb='xs' withBorder {...props}>
      <Text color='dimmed' sx={{ flex: 1 }}>{res}</Text>
      <ActionIcon ml='sm' size='sm' color='red' onClick={onDelete}><IconX size={16} /></ActionIcon>
    </Card>)
}

interface WorkExperienceShowComponentProps {
  experience: WorkExperience,
  onClick: (exp: WorkExperience) => any,
  onDelete:(exp:WorkExperience)=>any
}


const WorkExperienceShowComponent = ({ experience, onClick = () => { },onDelete = () => { }, }: WorkExperienceShowComponentProps) => {
  
  const { classes: formStyles } = useFormStyles();
  const { classes: common } = useCommonStyles();

  function handleOnDelete(e:React.MouseEvent<HTMLButtonElement>){
    e.stopPropagation();
    onDelete(experience);
  }
  return (
    <Card withBorder className={common.selectable} onClick={() => onClick(experience)}>
      <div className={`${common.dflex} ${common.spaceBetween}`}>
        <div>
          <div className={common.dflex}>
            <Title size={14} mr='xs' className={`${common.capitalize} ${common.primaryColor}`}>{experience.jobtitle}</Title>
            <Text color='dimmed' size='sm'>({experience.termstart}</Text>
            <Text color='dimmed' size='sm'>-</Text>
            <Text color='dimmed' size='sm'>{experience.termend})</Text>

          </div>
          <Text color='dimmed' size='sm'>{experience.company}</Text>
          {experience.responsibilities && experience.responsibilities.length > 0 &&
            <Text color='dimmed' size='xs' italic>Key Responsiblities</Text>}

          <List icon={
            <IconCircle size={10} />
          }>
            {
              experience.responsibilities && experience.responsibilities.length > 0 &&
              experience.responsibilities.map(res => (
                <List.Item key={'list_item_' + uniqueId()}><Text color='dimmed' size='sm' >{res}</Text></List.Item>
              ))
            }
          </List>

        </div>
        <ActionIcon color='red' p={0} onClick={handleOnDelete} ><IconX size={16} /></ActionIcon>
      </div>
    </Card>
  )
}

export default WorkExperienceForm