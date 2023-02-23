import User from 'data/models/user'
import React from 'react'
import ClassicResumeTemplate from './classic'

interface ResumeTemplateTypeProps{
    themename:string,
    user:User,
    [key:string]:any
}

const ResumeTemplate = ({themename,user}:ResumeTemplateTypeProps) => {

    const theme=(name:string)=>{
        switch(name){
            case 'classic':return <ClassicResumeTemplate user={user}/>
            default:return <ClassicResumeTemplate user={user}/>
        }
    }

  return theme(themename);
}

export default ResumeTemplate