import {
	type ErrorResponse,
	isRouteErrorResponse,
	useRouteError,
} from "react-router-dom";
import { Txt } from "@contexts/text.context";

export default function ErrorBoundary() {
	const error = useRouteError() as ErrorResponse;

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return (
				<div className="flex items-center h-full w-full">
					<Txt txtKey="error.404" />
				</div>
			);
		}

		if (error.status === 401) {
			return (
				<div className="flex items-center h-full w-full">
					<Txt txtKey="error.401" />
				</div>
			);
		}

		if (error.status === 503) {
			return (
				<div className="flex items-center h-full w-full">
					<Txt txtKey="error.503" />
				</div>
			);
		}
	}

	return (
		<div className="flex items-center h-full w-full">
			<Txt txtKey="error.default" />
		</div>
	);
}
