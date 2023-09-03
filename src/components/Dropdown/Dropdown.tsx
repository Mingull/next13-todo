"use client";
import React from "react";
import DropdownBody from "./DropdownBody";
import DropdownFooter from "./DropdownFooter";
import DropdownHeader from "./DropdownHeader";
import DropdownItems from "./DropdownItems";
import { Item } from ".";
import DropdownRoot from "./DropdownRoot";
import DropdownWrapper from "./DropdownWrapper";
import DropdownItem from "./DropdownItem";

export interface DropdownProps {
	items?: Item[];
	button?: React.ReactNode;
	position?: Position;
	children?: React.ReactNode;
	header?: React.ReactNode;
	footer?: React.ReactNode;
}

export type Position = "top" | "left" | "right" | "bottom";

const Dropdown = ({ children, items, button, header, footer, position = "bottom" }: DropdownProps) => {
	if (items && !button)
		return (
			<DropdownRoot items={items} position={position}>
				{position === "bottom" ? children : null}
				<DropdownWrapper id="dropdownInformation">
					{header ? <DropdownHeader>{header}</DropdownHeader> : null}
					<DropdownBody aria-labelledby="dropdownInformationButton">
						<DropdownItems />
					</DropdownBody>
					{footer ? <DropdownFooter>{footer}</DropdownFooter> : null}
				</DropdownWrapper>
				{position === "top" || position === "right" || position === "left" ? children : null}
			</DropdownRoot>
		);
	else if (!items && button)
		return (
			<DropdownRoot items={items} position={position}>
				{position === "bottom" ? button : null}
				<DropdownWrapper id="dropdownInformation">
					{header ? <DropdownHeader>{header}</DropdownHeader> : null}
					<DropdownBody aria-labelledby="dropdownInformationButton">{children}</DropdownBody>
					{footer ? <DropdownFooter>{footer}</DropdownFooter> : null}
				</DropdownWrapper>
				{position === "top" || position === "right" || position === "left" ? button : null}
			</DropdownRoot>
		);
	return (
		<DropdownRoot items={items} position={position}>
			{position === "bottom" ? button : null}
			<DropdownWrapper id="dropdownInformation">
				{header ? <DropdownHeader>{header}</DropdownHeader> : null}
				<DropdownBody aria-labelledby="dropdownInformationButton">
					<DropdownItems />
				</DropdownBody>
				{footer ? <DropdownFooter>{footer}</DropdownFooter> : null}
			</DropdownWrapper>
			{position === "top" || position === "right" || position === "left" ? button : null}
		</DropdownRoot>
	);
};

Dropdown.displayName = "DropdownBase";
Dropdown.Root = DropdownRoot;
Dropdown.Wrapper = DropdownWrapper;
Dropdown.Header = DropdownHeader;
Dropdown.Body = DropdownBody;
Dropdown.Items = DropdownItems;
Dropdown.Item = DropdownItem;
Dropdown.Footer = DropdownFooter;

export default Dropdown;
