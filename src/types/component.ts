export interface ITab {
  name: string;
  value?: string;
  component: React.ReactNode;
  subText?: string;
  count?: number;
  isShow?: boolean;
  key?: string;
}
