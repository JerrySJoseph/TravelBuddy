import { createStyles, TextInput, Text, Title, ActionIcon, Grid, Button } from '@mantine/core'
import { IconArrowRight, IconAt, IconCheck, IconCurrency, IconFlag, IconHelp, IconInfoCircle, IconLetterA, IconLetterF, IconLetterL, IconLetterM, IconLetterS, IconLocation, IconPhoneCall } from '@tabler/icons';
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../data/context/app-context';
import { useCommonStyles } from '../../Utils/commonStyles';
import { useFormStyles } from './formstyles';


const PersonalDetailForm = () => {

    const { classes: formStyles } = useFormStyles();
    const { classes: common } = useCommonStyles();

    const { updateUser, currentUser } = useAppContext();

    const [changeDetected, setChangeDetected] = useState(false);

   

    //input states
    const [firstname, setfirstname] = useState(currentUser.firstname);
    const [lastname, setlastname] = useState(currentUser.lastname);
    const [middlename, setmiddlename] = useState(currentUser.middlename);
    const [email, setemail] = useState(currentUser.email);
    const [phone, setphone] = useState(currentUser.phone);
    const [addressline1, setaddress1] = useState(currentUser.address.addressline1);
    const [addressline2, setaddress2] = useState(currentUser.address.addressline2);
    const [addressline3, setaddress3] = useState(currentUser.address.addressline3);
    const [state, setState] = useState(currentUser.address.state);
    const [country, setCountry] = useState(currentUser.address.country)
    const [postcode, setpostcode] = useState(currentUser.address.postcode);

    useEffect(() => {
        setChangeDetected(true);
        setfirstnameError('')
        setlastnameError('');
        setphoneError('');
        setemailError('');
        setaddress1Error('');
        setaddress2Error('');
        setStateError('');
        setCountryError('');
        setpostcodeError('');
    }, [firstname,lastname,middlename,email,phone,addressline1,addressline2,addressline3,state,country,postcode]);


    //error states
    const [firstnameError, setfirstnameError] = useState('');
    const [lastnameError, setlastnameError] = useState('');
    const [emailError, setemailError] = useState('');
    const [phoneError, setphoneError] = useState('');
    const [address1Error, setaddress1Error] = useState('');
    const [address2Error, setaddress2Error] = useState('');
    const [address3Error, setaddress3Error] = useState('');
    const [stateError, setStateError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [postcodeError, setpostcodeError] = useState('');


    const validateInputs = (): boolean => {
        //contact input validation
        if(!firstname){
            setfirstnameError('This field cannot be empty');
            return false;
        }
        if(!lastname){
            setlastnameError('This field cannot be empty');
            return false;
        }
        if(!phone){
            setphoneError('This field cannot be empty');
            return false;
        }
        if(!email){
            setemailError('This field cannot be empty');
            return false;
        }
        if(!addressline1){
            setaddress1Error('This field cannot be empty');
            return false;
        }
        if(!addressline2){
            setaddress2Error('This field cannot be empty');
            return false;
        }
        if(!state){
            setStateError('This field cannot be empty');
            return false;
        }
        if(!country){
            setCountryError('This field cannot be empty');
            return false;
        }
        if(!postcode){
            setpostcodeError('This field cannot be empty');
            return false;
        }

        return true;
    }

    const handleSave = () => {
        if (!validateInputs()) return;

        updateUser({
            ...currentUser,
            firstname,
            middlename,
            lastname,
            phone,
            email,
            address: {
                addressline1,
                addressline2,
                addressline3,
                state,
                postcode,
                country
            }
        });
        setChangeDetected(false);

    }

    return (
        <form className={formStyles.formContainer}>
            {/* Form Header Start*/}
            <div className={common.dflex}>
                <Title size='sm' className={formStyles.title}>Enter your contact details in the form below.</Title>
                <ActionIcon><IconInfoCircle size={18} className={formStyles.title}/></ActionIcon>
            </div>
            <Text color='dimmed' size='sm' mb='lg'>We would like to gather some of your contact information inorder to make your customized resume.</Text>
            {/* Form Header End*/}

            {/* Form Body Start */}
            <Grid>
                <Grid.Col lg={4}>
                    <TextInput placeholder='First Name' value={firstname} icon={<IconLetterF size={18} />} onChange={(v) => setfirstname(v.target.value || '')} error={firstnameError} />
                    <Text color='dimmed' size='sm' ml='sm' >First Name *</Text>
                </Grid.Col>
                <Grid.Col lg={4}>
                    <TextInput placeholder='Middle Name' value={middlename} icon={<IconLetterM size={18} />} onChange={(v) => setmiddlename(v.target.value || '')} />
                    <Text color='dimmed' size='sm' ml='sm'>Middle Name (optional)</Text>
                </Grid.Col>
                <Grid.Col lg={4}>
                    <TextInput placeholder='Last Name' value={lastname} icon={<IconLetterL size={18} />} onChange={(v) => setlastname(v.target.value || '')} error={lastnameError} />
                    <Text color='dimmed' size='sm' ml='sm'>Last Name *</Text>
                </Grid.Col>

                <Grid.Col lg={4}>
                    <TextInput placeholder='Phone Number' type='tel' icon={<IconPhoneCall size={18} />} value={phone} onChange={(v) => setphone(v.target.value || '')} error={phoneError} />
                    <Text color='dimmed' size='sm' ml='sm' >Phone Number*</Text>
                </Grid.Col>
                <Grid.Col lg={8}>
                    <TextInput placeholder='Email' type='email' icon={<IconAt size={18} />} value={email} onChange={(v) => setemail(v.target.value || '')} error={emailError} />
                    <Text color='dimmed' size='sm' ml='sm' >Email *</Text>
                </Grid.Col>

            </Grid>

            <div className={common.dflex}>
                <Title size='sm' mt='lg' className={formStyles.title}>Enter your location details in the form below.</Title>
                <ActionIcon mt='lg'><IconInfoCircle size={18} className={formStyles.title} /></ActionIcon>
            </div>
            <Text color='dimmed' size='sm' mb='lg'>Your location information is required by employers to find the right job for you.</Text>
            <Grid>
                <Grid.Col lg={6}>
                    <TextInput placeholder='Address Line 1' value={addressline1} icon={<IconLetterA size={18} />} onChange={(v) => setaddress1(v.target.value || '')} error={address1Error} />
                    <Text color='dimmed' size='sm' ml='sm' >Address Line 1*</Text>
                </Grid.Col>
                <Grid.Col lg={6}>
                    <TextInput placeholder='Address Line 2' value={addressline2} icon={<IconLetterA size={18} />} onChange={(v) => setaddress2(v.target.value || '')} error={address2Error} />
                    <Text color='dimmed' size='sm' ml='sm'>Address Line 2</Text>
                </Grid.Col>

                <Grid.Col lg={12}>
                    <TextInput placeholder='Address Line 3' type='text' icon={<IconLetterA size={18} />} value={addressline3} onChange={(v) => setaddress3(v.target.value || '')} error={address3Error} />
                    <Text color='dimmed' size='sm' ml='sm' >Address Line 3</Text>
                </Grid.Col>
                <Grid.Col lg={4}>
                    <TextInput placeholder='State/County' type='text' icon={<IconLetterS size={18} />} value={state} onChange={(v) => setState(v.target.value || '')} error={stateError} />
                    <Text color='dimmed' size='sm' ml='sm' >State/County</Text>
                </Grid.Col>
                <Grid.Col lg={4}>
                    <TextInput placeholder='Post Code' icon={<IconLocation size={18} />} value={postcode} onChange={(v) => setpostcode(v.target.value || '')} error={postcodeError} />
                    <Text color='dimmed' size='sm' ml='sm' >Post Code</Text>
                </Grid.Col>
                <Grid.Col lg={4}>
                    <TextInput placeholder='Country' type='text' icon={<IconFlag size={18} />} value={country} onChange={(v) => setCountry(v.target.value || '')} error={countryError} />
                    <Text color='dimmed' size='sm' ml='sm' >Country</Text>
                </Grid.Col>


                <Grid.Col>
                    <div className={common.center}>
                        <Button onClick={handleSave} leftIcon={<IconArrowRight size={16} />} disabled={!changeDetected}>Save</Button>
                    </div>
                </Grid.Col>
            </Grid>
            {/* Form Body End */}
        </form>
    )
}

export default PersonalDetailForm