export { default } from "./Dropdown";

type HrefItem = {
	href?: string;
	onClick?: undefined;
};

type OnClickItem = {
	href?: undefined;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export type Item = (HrefItem | OnClickItem) & { title: string; type?: "item" | "divider"; icon?: React.ReactNode };
