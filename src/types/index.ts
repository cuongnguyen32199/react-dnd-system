export interface IColumn {
  id: number;
  name: string;
  ticketIDs: number[];
}

export interface IColumns {
  [key: string]: IColumn;
}

export interface ITicket {
  id: number;
  name: string;
  image: string;
}
