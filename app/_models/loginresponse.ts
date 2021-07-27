export class LoginResponse {
  JSessionId: string;
  XSRFToken: string;
  UserName: string;
  EmailAddress: string;
  Client: Client;
  Features: Feature[];
  Modules: Module[];
  permissions: Permission[];
  IsAuthenticated: boolean;
}

export interface Client {
  Id: string;
  ClientName: string;
  UpdatedBy: string;
}

export interface Feature {
  Id: string;
  Module: string;
  ModuleId: string;
  Description: string;
  FeatureId: string;
  UpdatedBy: any;
}

export interface Module {
  ModuleId: string;
  ModuleName: string;
  UpdatedBy: string;
}

export interface Permission {
  Name: string;
  CustomerId: string;
  Status: string;
  Path: string;
  Route: string;
}
