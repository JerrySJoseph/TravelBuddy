import { uniqueId } from "lodash";
import User from "../data/models/user";

export function generateDummyUser():User{
    return {
        id:'user_'+uniqueId(),
        firstname:'John',
        middlename:'',
        lastname:"Doe",
        phone:'+1-8888888888',
        email:'john.doe@johnmail.com',
        address:{
            addressline1:'Flat 0, Random Street',
            addressline2:'Random Lane',
            addressline3:'',
            state:'Random state',
            postcode:'BX0 9JI',
            country:'United States'
        },
        summary:'',
        workexperience:[],
        education:[],
        skills:[]
    }
}