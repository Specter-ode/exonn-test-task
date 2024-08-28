import s from './Layout.module.css';
import { Link, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Navigation from 'components/Navigation';
import logo from '../../assets/logo.svg';
const Layout = () => {
	return (
		<div className={s.container}>
			<aside>SIDE BAR</aside>
			<div className={s.box}>
				<header>
					<Link to='/'>
						<img className={s.logo} src={logo} alt='Logo' width={40} height={40} />
					</Link>
				</header>
				<Navigation />
				<main className={s.wrapper}>
					<div className={s.content}>
						<Suspense>
							<Outlet />
						</Suspense>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Layout;
