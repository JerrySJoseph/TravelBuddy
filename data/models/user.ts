export interface WorkExperience{
    id:string,
    jobtitle:string,
    company:string,
    termstart:number,
    termend:number,
    responsibilities:string[]
}
export interface Education{
    id:string,
    course:string,
    university:string,
    termstart:number,
    termend:number,
}
export default interface User{
    id:string,
    firstname:string,
    middlename:string,
    lastname:string,
    phone:string,
    email:string,
    summary?:string,
    address:{
        addressline1:string,
        addressline2:string,
        addressline3:string,
        state:string,
        postcode:string,
        country:string,
    },
    workexperience:WorkExperience[],
    education:Education[],
    skills:string[]
}

export interface UserOverride{
    firstname?:string,
    middlename?:string,
    lastname?:string,
    phone?:string,
    email?:string,
    address?:{
        addressline1?:string,
        addressline2?:string,
        addressline3?:string,
        state?:string,
        postcode?:string,
        country?:string,
    },
}