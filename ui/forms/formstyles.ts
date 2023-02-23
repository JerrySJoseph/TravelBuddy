import { createStyles } from "@mantine/core";

export const useFormStyles = createStyles((theme) => ({
    formContainer: {
        padding: 0,
        margin: 0
    },
    inline: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    inlineInput: {
        width: '30%',
        [theme.fn.smallerThan('xl')]: {
            width: '100%'
        },
        border: '1px solid yellow'
    },
    title: {
        color: theme.colors.violet[5]
    },
    mbmd:{
        marginBottom:theme.spacing.md
    }
}))