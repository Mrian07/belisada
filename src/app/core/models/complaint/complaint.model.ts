export class ListIssu {
    status: string;
    statusCode: string;
    statusId: number;
}

export class ListIssuReq {
    orderComplainIssue: string;
    orderComplainIssueSolution: string;
    orderNumber: string;
    orderRecieved: true;
    reasonOrderComplainIssueSolution: string;
}


export class ListRes {
    status: number;
    message: string;
}
