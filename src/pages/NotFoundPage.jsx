import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<>
			<h2 >Nothing to see here!</h2>
			<Link to='/' style={{ fontSize: '20px', marginTop: '20px'  }}>
				GO HOME
			</Link>
		</>
	);
};

export default NotFoundPage;
