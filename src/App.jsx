import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const AccountingPage = lazy(() => import('./pages/AccountingPage'));
const AdministrationPage = lazy(() => import('./pages/AdministrationPage'));
const AuswahllistenPage = lazy(() => import('./pages/AuswahllistenPage'));
const BankingPage = lazy(() => import('./pages/BankingPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const EinkaufPage = lazy(() => import('./pages/EinkaufPage'));
const HelpPage = lazy(() => import('./pages/HelpPage'));
const PostOfficePage = lazy(() => import('./pages/PostOfficePage'));
const StatistikPage = lazy(() => import('./pages/StatistikPage'));
const TelefoniePage = lazy(() => import('./pages/TelefoniePage'));
const VerkaufPage = lazy(() => import('./pages/VerkaufPage'));
const WarenbestandPage = lazy(() => import('./pages/WarenbestandPage'));
const LagerverwaltungPage = lazy(() => import('./pages/LagerverwaltungPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
// import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					index: true,
					element: <HomePage />,
				},
				{
					path: 'dashboard',
					element: <DashboardPage />,
				},
				{
					path: 'accounting',
					element: <AccountingPage />,
				},
				{
					path: 'administration',
					element: <AdministrationPage />,
				},
				{
					path: 'auswahllisten',
					element: <AuswahllistenPage />,
				},
				{
					path: 'banking',
					element: <BankingPage />,
				},
				{
					path: 'einkauf',
					element: <EinkaufPage />,
				},
				{
					path: 'help',
					element: <HelpPage />,
				},
				{
					path: 'post-office',
					element: <PostOfficePage />,
				},
				{
					path: 'statistik',
					element: <StatistikPage />,
				},
				{
					path: 'telefonie',
					element: <TelefoniePage />,
				},
				{
					path: 'verkauf',
					element: <VerkaufPage />,
				},
				{
					path: 'warenbestand',
					element: <WarenbestandPage />,
				},
				{
					path: 'lagerverwaltung',
					element: <LagerverwaltungPage />,
				},
				{
					path: '*',
					element: <NotFoundPage />,
				},
			],
		},
	],
	{
		basename: '/exonn-test-task/',
	}
);

function App() {
	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer autoClose={3000} hideProgressBar theme='colored' transition={Zoom} />
		</>
	);
}

export default App;
