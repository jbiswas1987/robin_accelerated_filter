export class protocolDetailRes {
  details: string;
  protocolName: string;
  x: number;
  y: number;
  hasDetails: number;
}
export class siteDetailRes {
  details: string;
  siteName: string;
  x: number;
  y: number;
  hasDetails: number;
}

export class protocolDetailScatterRes {
  details: string;
  protocolName: string;
  'Variance': any;
  'TotalKitsInORKitsOut': number;
  hasDetails: number;
  sponsor : any;
  // scatterForecast : any;
}
