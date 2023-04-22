export interface ICheckBoxFilterItem {
  title: string;
  slug: string;
  count: number;
}

export interface IRadioButtonFilterItem {
  content: string | JSX.Element;
  slug: string;
  count: number;
}
