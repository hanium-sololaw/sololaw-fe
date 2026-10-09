export const digitsOnly = (value: string) => value.replace(/[^0-9]/g, "");

export const formatNumber = (value: string | number) => (value ? Number(value).toLocaleString("ko-KR") : "");
