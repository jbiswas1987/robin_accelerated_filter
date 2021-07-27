export class Investigator {
  firstname: string;
  lastname: string;
  specialty: string;
  institution: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  email: string;
  phone: string;
  fax: string;
  source: string;
  latitude: string;
  longitude: string;
}

export class ProtocolSite {
  invID: string;
  protocolid: string;
  investigatorsiteid: string;
  externalid: string;
  phase: string;
  screenCount: number;
  screenRate: number;
  screenCycleTime: number;
  enrollCount: number;
  enrollmentCycleTime: number;
  enrollmentRate: number;
  diseases: string;
}
