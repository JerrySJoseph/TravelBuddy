import { createStyles, Divider } from '@mantine/core'
import { IconMail, IconPhone } from '@tabler/icons'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useCommonStyles } from 'Utils/commonStyles'
import { ResumeThemeProps } from './resumethemeProps'

const useTemplateStyles = createStyles((theme) => ({
  main: {
    padding: 0,
    fontFamily: 'sans-serif'
  },
  header: {
    width: '100%',
    padding: theme.spacing.xs,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.colors.gray[1]
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  titleText: {
    fontSize: '1rem',
    fontWeight: 500,
    letterSpacing: 4,
  },
  name: {
    display: 'flex',
    justifyContent: 'center',
  },
  details: {
    fontSize: '0.7rem',
    margin: 0,
    padding: 0
  },
  textColorDark: {
    color: 'black'
  },
  textColorLight: {
    color: theme.colors.gray[6]
  },
  icon: {
    margin: 0,
    //border:'1px solid black',
    fontSize: 14
  }
}))

const ClassicResumeTemplate = ({ user }: ResumeThemeProps) => {

  const { classes: templateStyles } = useTemplateStyles();
  const [font, setFont] = useState('sans-serif')

  const fontUrl = 'https://fonts.googleapis.com/css2?family=Lobster&display=swap';

  useEffect(() => {
    const fetchFont = async (url: string) => {
      const res = await axios(url);
      setFont(res.data.family);
      //console.log(JSON.parse(res.data));
    };
    fetchFont(fontUrl);
  }, [fontUrl]);


  return (
    <div className={templateStyles.main} >
      <div className={templateStyles.header}>
        <div className={`${templateStyles.titleText} ${templateStyles.textColorDark}`}>
          {user.firstname}{'  '}{user.lastname}
        </div>
      </div>
      <Divider style={{ width: '100%' }} color='black' />
      <div className={`${templateStyles.center} ${templateStyles.details} ${templateStyles.textColorLight}`}>
        <span><IconPhone size={14} className={`${templateStyles.icon}`} /> {user.phone}{'  |  '} <IconMail size={10} />{user.email}</span>
      </div>
      <Divider style={{ width: '100%' }} color='black' />
    </div>
  )
}

export default ClassicResumeTemplate