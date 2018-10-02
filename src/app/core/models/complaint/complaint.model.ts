export class ListIssu {
    status: string;
    statusCode: string;
    statusId: number;
}

export class ListIssuReq {
    image: string;
    orderComplainIssue: string;
    orderComplainIssueSolution: string;
    orderNumber: string;
    orderRecieved: boolean;
    reasonOrderComplainIssueSolution: string;
}


export class ListRes {
    status: number;
    message: string;
}
