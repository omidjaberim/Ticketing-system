export interface ITicket {
        id : number;
        received : number;
        title :string;
        message : string;
        status : "pending"|"seen"|"answered";
        isClose : boolean;     
}
export interface IAnswer {
        id : number;
        message : string;
        parentId : number;
}