import s from './OverflowTabs.module.css';
import { useState } from 'react';
import ArrowIcon from '../../assets/arrow-up.svg?react';
import { createPortal } from 'react-dom';
import Tab from 'components/Tab';
import { useSelector } from 'react-redux';

const OverflowTabs = ({ items }) => {
	const pinnedTabs = useSelector(state => state.tabs.pinnedTabs);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className={`overflow_tabs ${s.box}`}>
				<button
					className={s.btn}
					type='button'
					onClick={() => setIsOpen(!isOpen)}
					aria-label={isOpen ? 'Hidden overflow tabs menu' : 'Show overflow tabs menu'}
					style={{
						backgroundColor: isOpen ? '#4690E2' : '#FFFFFF',
						color: isOpen ? '#FFFFFF' : '#343434',
					}}
				>
					<ArrowIcon
						style={{
							transform: isOpen ? 'rotate(0deg)' : 'rotate(-180deg)',
							transition: 'transform 0.3s linear',
						}}
					/>
				</button>
			</div>
			{isOpen &&
				createPortal(
					<div className={s.menu}>
						{items.map(item => {
							const isPinned = pinnedTabs.some(tab => tab.title === item.title);
							return (
								<Tab key={`overflow_${item.title}`} item={item} isPinned={isPinned} isOverflowTab />
							);
						})}
					</div>,
					document.body
				)}
		</>
	);
};

export default OverflowTabs;
