export class Common {}

export class MyColors {
  public color: string[] = [
    "#1f78b4",
    "#5E9EBC",
    "#b2df8a",
    "#33a02c",
    "#fb9a99",
    "#e31a1c",
    "#fdbf6f",
    "#ff7f00",
    "#cab2d6",
    "#a6cee3",
  ];
}
export class Country {
  name: string;
  value: number;
}
export class Phase {
  name: string;
  children: Country[];
}
export class Indication {
  name: string;
  color = MyColors.prototype.color;
  children: Phase[];
}
export class TA {
  name: string;
  color = MyColors.prototype.color;
  children: Indication[];
}
export class GroupData {
  name: string = "All";
  id: string = "All";
  colorSaturation: number[] = [0.3, 1];
  color = MyColors.prototype.color;
  children: TA[];
}
export class Protocol {
  Details: string;
  ProtocolId: string;
  protocolId: string;
  protocolNumber: string;
  theraputicArea: string;
  clinicalIndication: string;
  phase: string;
  CountryCount: number;
  SiteCount: number;
  PlannedSiteCount: number;
  EnrollmentCount: number;
  ScreenCount: number;
  PlannedEnrollmentCount: number;
  ProtocolFinalDate: Date;
  protocolFinalizationDate: Date;
  numberOfSites: number;
  nCTID: string;
  NumberOfArms: string;
  BlindingProcedure: string;
  StudyType: string;
  PrimaryEndPointCount: string;
  SecondaryEndPointCount: string;
  AdaptiveAssesment: string;
  CrossBasic: string;
  ParallelBasic: string;
  Status: string;
  Countries: string;
  numberofPatientsEnrolled: number;
}

export class SiteDetails {
  invId: string;
  name: string;
  siteName: string;
  department: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  fks: Date;
  firstPatientEnroll: Date;
  firstPatientScreen: Date;
  screenCount: number;
  enrollmentCount: number;
}

export class ProtocolInfo extends Protocol {
  enrollmentVisitCode: string[];
  screeningVisitCode: string[];
}

export class MapSiteDetails {
  SiteDetails: SiteDetails[];
}


export class Breakdown {
  name: string;
  value: string;
}

export class BreakdownInt {
  name: string;
  value: number;
}
export class VisitBreakdown {
  visitName: string[];
  count: number[];
}

export class SunDetails {
  sponsorNon: number = 0;
  comparatorNon: number = 0;
  sponsorHigh: number = 0;
  comparatorHigh: number = 0;
  sponsorMedium: number = 0;
  comparatorMedium: number = 0;
  sponsorLow: number = 0;
  comparatorLow: number = 0;
}

export class ProtocolSite {
  protocolNumber: string;
  covanceInternalId: string;
  ProjectNumber: string;
  siteid: string;
  SiteNumber: string;
  name: string;
  siteName: string;
  department: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  actualPatients: number;
  invID: string;
  cycleTime: number;
  enrollmentRate: number;
}

export class ProtocolPerformanceDetails {
  sponsor: number;
  fks: number;
  lks: number;
  fpi: number;
  lpi: number;
  fpilpi: number;
}
export class ProtocolPerformanceLevelData {
  percentile: number;
  protocol: number;
  q1: number;
  q2: number;
  q3: number;
}
export class EchartLang {
  public aria: any = {
    general: {
      withTitle: 'This is a chart about "{title}"',
      withoutTitle: "This is a chart",
    },
    series: {
      single: {
        prefix: "",
        withName: " with type {seriesType} named {seriesName}.",
        withoutName: " with type {seriesType}.",
      },
      multiple: {
        prefix: ". It consists of {seriesCount} series count.",
        withName:
          " The {seriesId} series is a {seriesType} representing {seriesName}.",
        withoutName: " The {seriesId} series is a {seriesType}.",
        separator: {
          middle: "",
          end: "",
        },
      },
    },
    data: {
      allData: "The data is as follows: ",
      partialData: "The first {displayCnt} items are: ",
      withName: "the data for {name} is {value}",
      withoutName: "{value}",
      separator: {
        middle: ",",
        end: ".",
      },
    },
  };
}

export class ScatterData {
  x: number;
  y: number;
  name: string;
}


export class siteDetails{
  
}
export class MccDetail {
  public mccPortfolio: any = [
    {
      id: "CL-04aT-P",
      name: "Samples within 2 days",
      desc: "% of samples received within 2 calendar days of visit",
      xlabel: "% within 2 days",
      ylabel: "Total",
      xAxis: "% samples within 2 days",
      yAxis: "Total Samples",
      xformatter: "{value} %",
      yformatter: "{value}",
    },
    {
      id: "CL-05aQ-P",
      name: "Lab Queries",
      desc: "% of requisition that generate lab queries",
      xlabel: "% Lab Queries",
      ylabel: "Total",
      xAxis: "% Lab Queries",
      yAxis: "Total Requisition",
      xformatter: "{value} %",
      yformatter: "{value}",
    },
    {
      id: "CL-05eT-P",
      name: "Queries Resolved within 7 days",
      desc: "% of queries resolved within 7 calendar days",
      xlabel: "% Queries resolved within 7 days",
      ylabel: "Total",
      xAxis: "% Queries resolved within 7 days",
      yAxis: "Total Queries",
      xformatter: "{value} %",
      yformatter: "{value}",
    },
    {
      id: "CL-06aQ-P",
      name: "Sample Reportable",
      desc: "% of sample reportable for all required tests",
      xlabel: "% reportable",
      ylabel: "Total",
      xAxis: "% reportable",
      yAxis: "Total Samples",
      xformatter: "{value} %",
      yformatter: "{value}",
    },
    {
      id: "CL-08cT-P",
      name: "Tests within turnaround time",
      desc:
        "% lab tests reported within expected turnaround time across studies",
      xlabel: "% within turnaround time",
      ylabel: "Total",
      xAxis: "% within turnaround time",
      yAxis: "Total Lab Tests",
      xformatter: "{value} %",
      yformatter: "{value}",
    },
  ];
}
