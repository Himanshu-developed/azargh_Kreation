export interface IcreateUser{
    phone:number,
    image?:string,
    firstName:string,
    lastName:string
}

export interface IupdateUser{
    userId:number,
    fieldsToUpdate: string[],
    oldValues:string[],
    newValues:string[],
    userDetailId:number,
}