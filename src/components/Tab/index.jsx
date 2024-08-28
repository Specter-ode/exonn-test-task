import s from './Tab.module.css';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from 'assets/dashboard.svg?react';
import AccountingIcon from 'assets/accounting.svg?react';
import AdministrationIcon from 'assets/administration.svg?react';
import AuswahllistenIcon from 'assets/auswahllisten.svg?react';
import BankingIcon from 'assets/banking.svg?react';
import EinkaufIcon from 'assets/einkauf.svg?react';
import HelpIcon from 'assets/help.svg?react';
import PostOfficeIcon from 'assets/post-office.svg?react';
import StatistikIcon from 'assets/statistik.svg?react';
import TelefonieIcon from 'assets/telefonie.svg?react';
import VerkaufIcon from 'assets/verkauf.svg?react';
import WarenbestandIcon from 'assets/warenbestand.svg?react';
import LagerverwaltungIcon from 'assets/lagerverwaltung.svg?react';
import CancelIcon from 'assets/cancel.svg?react';
import PinIcon from 'assets/pin.svg?react';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useEffect, useRef, useState } from 'react';
import useWindowDimensions from 'helpers/useWindowDimensions';
import { addToPinned, removeFromPinned } from 'redux/tabs/tabs-slice';
import { toast } from 'react-toastify';

const iconMap = {
	dashboard: DashboardIcon,
	accounting: AccountingIcon,
	administration: AdministrationIcon,
	auswahllisten: AuswahllistenIcon,
	banking: BankingIcon,
	einkauf: EinkaufIcon,
	help: HelpIcon,
	'post-office': PostOfficeIcon,
	statistik: StatistikIcon,
	telefonie: TelefonieIcon,
	verkauf: VerkaufIcon,
	warenbestand: WarenbestandIcon,
	lagerverwaltung: LagerverwaltungIcon,
};

const Tab = ({
	item,
	isPinned,
	isDragging = false,
	isOverflowTab = false,
	currentDroppableId = null,
	isPinnedSticky = false,
}) => {
	const { width: windowWidth } = useWindowDimensions();
	const pinnedTabs = useSelector(state => state.tabs.pinnedTabs);
	const dispatch = useDispatch();
	const [isHovered, setIsHovered] = useState(false);
	const [tooltipWidth, setTooltipWidth] = useState(0);
	const [tooltipStyle, setTooltipStyle] = useState({});
	const tabRef = useRef(null);
	const hoverTimeoutRef = useRef(null);
	const { title } = item;

	const to = `/${title}`;
	const location = useLocation();
	const isActive = location.pathname === to;
	const IconComponent = iconMap[title];
	const showTitle = isOverflowTab || !isPinned;
	const normalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
	const canShowTooltip = !isOverflowTab && !currentDroppableId;
	const isTooltip = canShowTooltip && isHovered;

	useEffect(() => {
		// Создаем временный tooltip для измерения ширины
		const temporaryTooltip = document.createElement('div');
		temporaryTooltip.style.position = 'absolute';
		temporaryTooltip.style.visibility = 'hidden';
		temporaryTooltip.style.whiteSpace = 'nowrap';
		temporaryTooltip.style.fontSize = '14px';
		temporaryTooltip.style.fontWeight = 500;
		temporaryTooltip.style.letterSpacing = '0.025em';
		temporaryTooltip.innerText = isPinned ? normalizedTitle : 'Tab anpinnen';
		document.body.appendChild(temporaryTooltip);
		const temporaryWidth = temporaryTooltip.getBoundingClientRect().width;
		setTooltipWidth(temporaryWidth + 54);
		document.body.removeChild(temporaryTooltip);
	}, [isPinned, normalizedTitle]);

	useEffect(() => {
		if (isTooltip && tooltipWidth && tabRef.current) {
			const rect = tabRef.current.getBoundingClientRect();
			let left = rect.left + rect.width / 2 - tooltipWidth / 2;
			let transform = 'translateX(0)';

			if (left < 0) {
				left = 0;
			} else if (left + tooltipWidth > windowWidth) {
				left = windowWidth - tooltipWidth;
			} else {
				transform = 'translateX(-50%)';
				left = rect.left + rect.width / 2;
			}

			setTooltipStyle({
				position: isPinnedSticky ? 'fixed' : 'absolute',
				zIndex: 10,
				left: `${left}px`,
				top: `${rect.bottom}px`,
				transform,
				opacity: 1,
			});
		} else if (!isTooltip) {
			setTooltipStyle({});
		}
	}, [isTooltip, normalizedTitle, isPinned, isPinnedSticky]);
	pinnedTabs?.length;
	const handleAddToPinned = () => {
		if (pinnedTabs?.length >= 5) {
			toast.warning('You cannot pin more than 5 tabs.');
		} else {
			dispatch(addToPinned(item));
		}
	};
	const handleRemoveFromPinned = () => {
		dispatch(removeFromPinned(item));
	};

	const handleMouseEnter = () => {
		if (windowWidth > 767) {
			hoverTimeoutRef.current = setTimeout(() => {
				setIsHovered(true);
			}, 700);
		}
	};

	const handleMouseLeave = () => {
		if (isHovered && windowWidth > 767) {
			setIsHovered(false);
		}
		hoverTimeoutRef?.current && clearTimeout(hoverTimeoutRef.current);
	};

	const getLinkAdditionalClassName = () => {
		if (isDragging) return s.link_dragged;
		if (isActive && isPinned && !isOverflowTab) return s.link_active_pinned;
		if (isActive) return s.link_active;
		if (isOverflowTab) return s.link_overflow;
		if (isPinned) return s.link_pinned;
		return s.link;
	};

	return (
		<div className={s.wrapper} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<Link
				to={to}
				className={` ${s.link} ${getLinkAdditionalClassName()}`}
				ref={tabRef}
				style={{
					paddingRight: showTitle ? 0 : '20px',
					position: canShowTooltip ? 'relative' : 'static',
				}}
			>
				{IconComponent ? <IconComponent /> : null}
				{showTitle && (
					<p className={isOverflowTab ? s.title_overflow : s.title}>{normalizedTitle}</p>
				)}
			</Link>
			{isTooltip && (
				<>
					{isPinned ? (
						<div className={s.tooltip} style={tooltipStyle}>
							{IconComponent ? <IconComponent /> : null}
							<p>{normalizedTitle}</p>
							<button
								className={s.removeBtn}
								type='button'
								onClick={handleRemoveFromPinned}
								aria-label='remove form pinned'
							>
								<CancelIcon />
							</button>
						</div>
					) : (
						<button
							type='button'
							className={s.tooltip}
							style={tooltipStyle}
							onClick={handleAddToPinned}
						>
							<PinIcon />
							<p>Tab anpinnen</p>
						</button>
					)}
				</>
			)}
		</div>
	);
};
export default memo(Tab);
