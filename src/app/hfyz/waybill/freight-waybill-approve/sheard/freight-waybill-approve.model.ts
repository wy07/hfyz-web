export class FreightWaybillApprove {
    constructor(
        public id: string,
        public approveTime: string,
        public approveDesc: string,
        public approver: {id: '', name: ''}
    ) { }
}
