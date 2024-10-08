import s from './Navigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import DragList from 'components/DragList';
import { useEffect, useMemo, useRef, useState } from 'react';
import OverflowTabs from 'components/OverflowTabs';
import { DragDropContext } from '@hello-pangea/dnd';
import { updateCommonTabs, updatePinnedTabs } from 'redux/tabs/tabs-slice';
import { reorderTabs } from 'helpers/reorderTabs';

const Navigation = () => {
	const { pinnedTabs, commonTabs } = useSelector(state => state.tabs);
	const [overflowItems, setOverflowItems] = useState([]);
	const [currentDroppableId, setCurrentDroppableId] = useState(null);
	const [isPinnedSticky, setIsPinnedSticky] = useState(true);
	const boxRef = useRef(null);
	const pinnedTabsRef = useRef(null);

	const dispatch = useDispatch();

	const onDragStart = result => {
		const { source } = result;
		setCurrentDroppableId(source.droppableId);
	};

	const onDragEnd = result => {
		const { source, destination } = result;
		setCurrentDroppableId(null);
		// Если элемент перетащен за границы, прерываем
		if (!destination) return;
		// Если элемент остался на том же месте, ничего не делаем
		if (source.droppableId === destination.droppableId && source.index === destination.index) {
			return;
		}
		// Если перемещение произошло в пределах списка pinnedTabs
		if (source.droppableId === 'pinned_tabs' && destination.droppableId === 'pinned_tabs') {
			const updatedTabs = reorderTabs(pinnedTabs, source.index, destination.index);
			dispatch(updatePinnedTabs(updatedTabs));
			return;
		}

		// Если перемещение произошло в пределах списка commonTabs
		if (source.droppableId === 'common_tabs' && destination.droppableId === 'common_tabs') {
			const updatedTabs = reorderTabs(commonTabs, source.index, destination.index);
			dispatch(updateCommonTabs(updatedTabs));
		}
	};

	useEffect(() => {
		const navContainer = boxRef?.current;
		const updateOverflowItems = () => {
			const items = navContainer.querySelectorAll('.tab-item');
			const navContainerRect = navContainer?.getBoundingClientRect();
			const pinnedContainerRect = pinnedTabsRef?.current?.getBoundingClientRect();
			const overflowContainerRect = navContainer
				.querySelector('.overflow_tabs')
				?.getBoundingClientRect();

			const isPinnedStickyValue =
				pinnedContainerRect && navContainerRect.width - pinnedContainerRect.width >= 250;
			setIsPinnedSticky(isPinnedStickyValue);
			const itemsData = Array.from(items).map((item, i) => {
				const tabToCheck = item.getBoundingClientRect();
				// нужно ли делать корректировку если pinnedBlock имеет шанс перекрыть commonTab
				const needCheckPinnedBlock =
					pinnedContainerRect && isPinnedStickyValue && !item.classList.contains('pinned-tab');
				const updatedContainer = {
					left: needCheckPinnedBlock ? pinnedContainerRect.right : navContainerRect.left,

					right: overflowContainerRect ? overflowContainerRect.left : navContainerRect.right,
				};
				const visible =
					tabToCheck.left >= updatedContainer.left && tabToCheck.right <= updatedContainer.right;
				return {
					visible,
					title: item.dataset.title,
				};
			});
			setOverflowItems(itemsData.filter(item => !item.visible));
		};

		const resizeObserver = new ResizeObserver(updateOverflowItems);

		if (navContainer) {
			resizeObserver.observe(navContainer);
		}

		navContainer.addEventListener('scroll', updateOverflowItems);

		updateOverflowItems();

		return () => {
			if (navContainer) {
				resizeObserver.unobserve(navContainer);
			}
			resizeObserver.disconnect();
			navContainer.removeEventListener('scroll', updateOverflowItems);
		};
	}, [pinnedTabs, commonTabs, overflowItems?.length]);

	const isNotScrollable = isPinnedSticky && currentDroppableId === 'pinned_tabs';

	const isPinnedTabsLeftShadow = useMemo(
		() => isPinnedSticky && overflowItems.some(el => el.title === commonTabs[0].title),
		[overflowItems, pinnedTabs, commonTabs, isPinnedSticky]
	);

	return (
		<nav className={`${s.box} ${isNotScrollable ? s.noScroll : ''} `} ref={boxRef}>
			<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
				{pinnedTabs?.length > 0 && (
					<div
						ref={pinnedTabsRef}
						className={`${isPinnedSticky ? s.sticky : ''} ${
							isPinnedTabsLeftShadow ? s.pinned_shadow : ''
						}`}
					>
						<DragList
							items={pinnedTabs}
							isPinned={true}
							currentDroppableId={currentDroppableId}
							isPinnedSticky={isPinnedSticky}
						/>
					</div>
				)}
				{commonTabs?.length > 0 && (
					<DragList
						items={commonTabs}
						isPinned={false}
						currentDroppableId={currentDroppableId}
						isNotScrollable={isNotScrollable}
					/>
				)}
			</DragDropContext>
			{overflowItems.length > 0 && <OverflowTabs items={overflowItems} />}
		</nav>
	);
};

export default Navigation;
