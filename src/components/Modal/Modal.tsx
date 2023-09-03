import React, { FC } from "react";
import Body from "./Body";
import Footer, { FooterProps } from "./Footer";
import Header, { HeaderProps } from "./Header";
import ModalOverlay from "./ModalOverlay";

const Modal: FC<{ children: React.ReactNode }> & {
	Header: FC<HeaderProps>;
	Body: FC<HeaderProps>;
	Footer: FC<FooterProps>;
} = ({ children }) => {
	const header = React.Children.map(children, (child) =>
		React.isValidElement(child) && typeof child.type !== "string" && child.type === Header ? child : null
	);
	const footer = React.Children.map(children, (child) =>
		React.isValidElement(child) && typeof child.type !== "string" && child.type === Footer ? child : null
	);
	const body = React.Children.map(children, (child) =>
		React.isValidElement(child) && typeof child.type !== "string" && child.type === Body ? child : null
	);
	return (
		<ModalOverlay>
			<div className="relative w-full max-w-2xl max-h-full mx-auto">
				{/* <!-- Modal content --> */}
				<div className="relative bg-white rounded-lg shadow dark:bg-zinc-700">
					{/* <!-- Modal header --> */}
					{header}
					{/* <!-- Modal body --> */}
					{body}
					{/* <!-- Modal footer --> */}
					{footer}
				</div>
			</div>
		</ModalOverlay>
	);
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
