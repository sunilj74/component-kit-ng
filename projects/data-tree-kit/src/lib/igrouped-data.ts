export interface IGroupedData {
  groupKey: string;
  subGroups?: IGroupedData[];
  data?: any[];
  isClosed?: boolean;
  extras?: any;
}
