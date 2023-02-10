import { Dayjs } from "dayjs";

export interface TimeEntries{
    id:string
    targetDate:Dayjs
    description:string
    task:string
}

export interface Projects {
    projects:TimeEntries[]
}
