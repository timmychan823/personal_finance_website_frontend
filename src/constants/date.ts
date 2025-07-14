export const monthList = Array.from({ length: 12 }).map(
  (item: any, index: number) => {
    const val = ("00" + (index + 1)).slice(-2);
    return { option: val, key: String(index) };
  },
);

export const dateList = Array.from({ length: 31 }).map(
  (item: any, index: number) => {
    const val = ("00" + (index + 1)).slice(-2);
    return { option: val, key: val };
  },
);

export const YYYYMMDD = "YYYY-MM-DD";
export const YYYYMMDDHHmm = `${YYYYMMDD} HH:mm`;
export const YYYYMMDDHHmmss = `${YYYYMMDDHHmm}:ss`;
export const YYYYMMDDHHmmssSSS = `${YYYYMMDDHHmmss}.SSS`;

export const DATE_PICKER_MIN_DATE = "2023-01-01";
