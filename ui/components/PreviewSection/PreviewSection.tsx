import { Card } from '@mantine/core'
import React from 'react'
import ResumePreview from '../ResumePreview/ResumePreview'
import ThemeSelection from '../ThemeSelection/ThemeSelection'

const PreviewSection = () => {
    return (
        <Card withBorder>
            <ResumePreview/>
            <ThemeSelection/>
        </Card>
    )
}

export default PreviewSection