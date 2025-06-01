export interface OACSales {
  id: number;
  date: string;
  bill_no: string;
  implants_name: string;
  implants_type: "SS" | "TITANIUM";
  size: number;
  quantity: number;
  rate: string;
  total_price: string;
  assigned: "Santosh" | "Shiva" | "Neither";
  institute: string;
  surgeon: string;
  remarks: string;
}
