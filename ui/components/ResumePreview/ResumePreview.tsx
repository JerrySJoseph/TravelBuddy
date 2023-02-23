import { Card, createStyles } from '@mantine/core';
import { useAppContext } from 'data/context/app-context';
import React from 'react'
import ResumeTemplate from 'ui/resume-templates';
import { useCommonStyles } from '../../../Utils/commonStyles'

const useTemplateStyles=createStyles((theme)=>({
  main:{
    width:'400px',
    height:'566px'
    
  },
}))

const ResumePreview = () => {
    const {classes:common} =useCommonStyles();
    const {classes:templateStyles}=useTemplateStyles();
    const {currentUser}=useAppContext();
  return (
    <div className={common.center}>
        <Card withBorder radius={0} p={0} className={templateStyles.main}>
          <ResumeTemplate themename='classic' user={currentUser}/>
        </Card>
    </div>
  )
}

export default ResumePreview