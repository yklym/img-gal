import { Dayjs } from "dayjs";

export enum UnitType {
  BM_21 = "bm-21",
  BMD_2 = "bmd-2",
  BMP_1 = "bmp-1",
  BMP_2 = "bmp-2",
  BTR_70 = "btr-70",
  BTR_80 = "btr-80",
  MT_LB = "mt-lb",
  T_64 = "t-64",
  T_72 = "t-72",
  T_80 = "t-80",
}

export interface ICaption {
  boxCords: {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
  };
  unitType: UnitType;
}

export interface IImage {
  id: string;
  createdAt: Dayjs;
  url: string;

  caption: ICaption | null;
}

export enum FilterSortKey {
  CREATED_ASC = "CREATED_ASC",
  CREATED_DESC = "CREATED_DESC",
}
export interface IImageFilters {
  sort: FilterSortKey | null;
  unitTypes: UnitType[] | null;
  date: {
    startDate: Dayjs;
    endDate: Dayjs;
  } | null;
}
