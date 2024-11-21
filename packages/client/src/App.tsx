import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
// import { CssBaseline } from "@mui/material";
// import GlobalStyles from "./assets/styles/global.styles";
import ErrorBoundary from "./components/error-boundary";
// import Layout from "./components/layout/Layout";
import { TextsProvider } from "./contexts/text.context";
import { QueryProvider } from "./contexts/query-client.context";
// import { ToastProvider } from "./contexts/toast.context";
import Dashboard from "./pages/dashboard/dashboard";

import "./index.css";

const router = createBrowserRouter([
	{
		id: "root",
		path: "/",
		element: <Dashboard />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: "/*",
				element: <Navigate to="/" />,
			},
		],
	},
]);

function App() {
	return (
		<TextsProvider>
			<QueryProvider>
				{/* // 	<ToastProvider>
		// 		<GlobalStyles />
		// 		<CssBaseline enableColorScheme /> */}
				<RouterProvider router={router} />
				{/* // 	</ToastProvider> */}
			</QueryProvider>
		</TextsProvider>
	);
}

export default App;
