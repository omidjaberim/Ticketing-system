import { IAnswer, ITicket } from "../dto/ticket"

export const getAllTickets = ()=>{
    const tickets =  localStorage.getItem("ticket")
    if(tickets?.length)
        return  JSON.parse(tickets)
    return []    
}



export const getAllAnswers = ()=>{
    const answers =  localStorage.getItem("answer")
    if(answers?.length)
        return  JSON.parse(answers)
    return []    
}


export const setTicket = (ticket:ITicket)=>{
    const tickets = localStorage.getItem("ticket")        
    localStorage.setItem("ticket",tickets?.length
     ? 
     tickets.split("]")[0]+","+JSON.stringify(ticket)+"]": 
        
        "["+JSON.stringify(ticket)+"]"
    )
}

export const setAnswer = (answer:IAnswer)=>{
    const answers = localStorage.getItem("answer")        
    localStorage.setItem("answer",answers?.length
     ? 
     answers.split("]")[0]+","+JSON.stringify(answer)+"]": 
        
        "["+JSON.stringify(answer)+"]"
    )
}

export const closeTicket = (ticketId:number)=>{
    const tickets = localStorage.getItem("ticket")
    if(tickets !== null) {
        const  ticketsObj =  JSON.parse(tickets);           
        let index = ticketsObj.findIndex((ticket:ITicket)=>ticket.id === ticketId)
        ticketsObj[index].isClose = true
        localStorage.setItem("ticket",JSON.stringify(ticketsObj))
    }
}
export const searchTicket = (searchedTxt:string)=>{
    const tickets = localStorage.getItem("ticket")
    if(tickets !== null) {
        const  ticketsObj =  JSON.parse(tickets); 
        let newArr = ticketsObj.filter((ticket:ITicket)=>ticket.title.includes(searchedTxt))                
        return newArr
    }
}