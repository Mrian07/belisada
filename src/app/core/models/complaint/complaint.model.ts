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

export class Complaint {
    content: ListComplaint[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    first: boolean;
    size: number;
    number: number;
}

export class ListComplaint {
    orderNumber: number;
    orderComplainIssue: string;
    orderComplainIssueCode: number;
    orderComplainIssueSolution: string;
    orderComplainIssueSolutionCode: number;
    reasonOrderComplainIssueSolution: string;
    orderRecieved: boolean;
    image: string;
    items: [];
    status: string;
    statusCode: number;
}


export class ListRes {
    status: number;
    message: string;
}
