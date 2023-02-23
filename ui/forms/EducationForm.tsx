import { ActionIcon, Box, Button, Card, Grid, List, Modal, Select, SelectItem, Text, Textarea, TextInput, Title } from '@mantine/core';
import { IconArrowRight, IconBriefcase, IconCalendar, IconCircle, IconInfoCircle, IconPlus, IconUser, IconX } from '@tabler/icons';
import { uniqueId } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppContext } from '../../data/context/app-context';
import useForm from '../../data/hooks/useform';
import { Education, WorkExperience } from '../../data/models/user';
import { useCommonStyles } from '../../Utils/commonStyles';
import generateDummyWorkExperience from '../../Utils/generateWorkExperience';
import { useFormStyles } from './formstyles';

const EducationForm = () => {

  const { classes: formStyles } = useFormStyles();
  const { classes: common } = useCommonStyles();

  const { updateUser, currentUser } = useAppContext();

  const [changeDetected, setChangeDetected] = useState(false);
  const [educations, setEducations] = useState(currentUser.education);
  const [selectedEducation, setSelectedEducation] = useState<Education>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setChangeDetected(true);
  }, []);

  useEffect(() => {
    setEducations(currentUser.education);
    setSelectedEducation(undefined);
    setOpen(false);
  }, [currentUser.education]);


  function removeSelectedEducation(e:Education){
    updateUser({
      ...currentUser,
      education:currentUser.education.filter(item=>item.id!==e.id)
    })
  }


  return (
    <form className={formStyles.formContainer}>
      {/* Form Header Start*/}
      <div className={common.dflex}>
        <Title size='sm' className={formStyles.title}>Add your educational qualification.</Title>
        <ActionIcon><IconInfoCircle size={18} className={formStyles.title} /></ActionIcon>
      </div>
      <Text color='dimmed' size='sm' mb='lg'>List all your educational qualification in reverse chronological order.</Text>
      {/* Form Header End*/}

      {/* Form Body Start */}
      <Grid>
        {educations.map((ed) => (
          <Grid.Col key={'experience_item_' + uniqueId()} lg={6}>
            <EducationShowComponentt education={ed} 
            onClick={setSelectedEducation}
            onDelete={removeSelectedEducation} /></Grid.Col>
        ))}
      </Grid>
      <div className={common.center}>
        <Button my='sm' leftIcon={<IconPlus size={16} />} onClick={() => setOpen(true)}>New Education</Button>
      </div>

      {(open || !!selectedEducation) && <EducationEditModal open={open || !!selectedEducation} onClose={() => {
        setSelectedEducation(undefined)
        setOpen(false)
      }} education={selectedEducation} />}

      {/* Form Body End */}
    </form>
  )
}

interface EducationEditModalProps {
  open: boolean,
  onClose: () => any,
  education?: Education,

}

const EducationEditModal = ({ open, onClose, education }: EducationEditModalProps) => {

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

  const [ed, setEd] = useState(education);

  //input states
  const [course, setcourse] = useState(ed?.course || '');
  const [university, setuniversity] = useState(ed?.university || '');
  const [termstart, settermstart] = useState(ed?.termstart || 2010);
  const [termend, settermend] = useState(ed?.termend || new Date().getFullYear());

  //change detection state
  const [changeDetected, setChangeDetected] = useState(false);

  //error states
  const [courseError, setcourseError] = useState('');
  const [universityError, setuniversityError] = useState('');
  const [termstartError, settermstartError] = useState('');
  const [termendError, settermendError] = useState('');


  //set data changes to true when user changes anything on the form
  useEffect(() => {
    setChangeDetected(true);
    setcourseError('');
    setuniversityError('');
    settermstartError('');
    settermendError('');
  }, [course, university, termstart, termend]);



  const validateInputs = (): boolean => {
    if (!course) {
      setcourseError('This field cannot be empty');
      return false;
    }
    if (!university) {
      setuniversityError('This field cannot be empty');
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
    if (ed)
      updateUser({
        ...currentUser,
        education: currentUser.education.map(item => item.id === ed.id ? {
          id: ed.id,
          course,
          university,
          termstart,
          termend
        } : item)
      })
  }
  function updateNewUser() {
    updateUser({
      ...currentUser,
      education: [
        ...currentUser.education,
        {
          id: 'workexp_' + uniqueId(),
          course,
          university,
          termstart,
          termend
        }
      ]
    });
  }

  function handleSave() {
    if (!validateInputs())
      return;
    if (!ed)
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
        <Title size='sm' className={formStyles.title}>{!ed ? 'Add new' : 'Edit'} educational qualification.</Title>
        <ActionIcon><IconInfoCircle size={18} className={formStyles.title} /></ActionIcon>
      </div>
      <Text color='dimmed' size='sm' mb='lg'>List all your educational qualification in reverse chronological order.</Text>
      <Grid>
        <Grid.Col>
          <Text color='dimmed' size='sm' >Course name *</Text>
          <TextInput placeholder='Course Name' value={course} icon={<IconUser size={18} />} onChange={(v) => setcourse(v.target.value || '')} error={courseError} />
        </Grid.Col>

        <Grid.Col>
          <Text color='dimmed' size='sm' >University/Institution*</Text>
          <TextInput placeholder='University/Institutionn' value={university} icon={<IconBriefcase size={18} />} onChange={(v) => setuniversity(v.target.value || '')} error={universityError} />
        </Grid.Col>

        <Grid.Col md={6}>
          <Text color='dimmed' size='sm'>Term Start*</Text>
          <Select icon={<IconCalendar />} data={termYears} value={`${termstart}`} onChange={(e) => settermstart(e ? parseInt(e) : 2010)} error={termstartError} />
        </Grid.Col>
        <Grid.Col md={6} mb='xs'>
          <Text color='dimmed' size='sm' >Term End*</Text>
          <Select icon={<IconCalendar />} data={termYears} value={`${termend}`} onChange={(e) => settermend(e ? parseInt(e) : new Date().getFullYear())} />
        </Grid.Col>
      </Grid>
      <div className={common.center}>
        <Button leftIcon={<IconArrowRight size={16} />} disabled={!changeDetected} onClick={handleSave}>Save</Button>
      </div>
    </form>
  </Modal >
}


interface EducationShowComponenttProps {
  education: Education,
  onClick: (ed: Education) => any,
  onDelete:(ed:Education)=>any
}


const EducationShowComponentt = ({ education, onClick = () => { },onDelete = () => { }, }: EducationShowComponenttProps) => {
  
  const { classes: formStyles } = useFormStyles();
  const { classes: common } = useCommonStyles();

  function handleOnDelete(e:React.MouseEvent<HTMLButtonElement>){
    e.stopPropagation();
    onDelete(education);
  }
  return (
    <Card withBorder className={common.selectable} onClick={() => onClick(education)}>
      <div className={`${common.dflex} ${common.spaceBetween}`}>
        <div>
          <div className={common.dflex}>
            <Title size={14} mr='xs' className={`${common.capitalize} ${common.primaryColor}`}>{education.course}</Title>
            <Text color='dimmed' size='sm'>({education.termstart}</Text>
            <Text color='dimmed' size='sm'>-</Text>
            <Text color='dimmed' size='sm'>{education.termend})</Text>

          </div>
          <Text color='dimmed' size='sm'>{education.university}</Text>

        </div>
        <ActionIcon color='red' onClick={handleOnDelete} ><IconX size={16} /></ActionIcon>
      </div>
    </Card>
  )
}

export default EducationForm