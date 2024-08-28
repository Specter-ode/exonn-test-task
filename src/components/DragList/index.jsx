import s from './DragList.module.css';
import Tab from 'components/Tab';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { memo } from 'react';

const DragList = ({ items, isPinned, currentDroppableId, isNotScrollable, isPinnedSticky }) => {
	const droppableId = isPinned ? 'pinned_tabs' : 'common_tabs';
	return (
		<Droppable
			droppableId={droppableId}
			isDropDisabled={droppableId !== currentDroppableId}
			direction='horizontal'
		>
			{provided => (
				<div
					className={isPinned ? `pinned_tabs ${s.list}` : s.list}
					style={{ overflow: isNotScrollable ? 'hidden' : 'initial' }}
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					{items.map((item, index) => {
						return (
							<Draggable draggableId={item.id} key={item.id} index={index}>
								{(provided, snapshot) => {
									const isDragging = snapshot.isDragging;
									return (
										<div
											data-title={item.title}
											className={`${isPinned ? 'tab-item pinned-tab' : 'tab-item'}`}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<Tab
												item={item}
												isPinned={isPinned}
												isDragging={isDragging}
												isPinnedSticky={isPinnedSticky}
											/>
										</div>
									);
								}}
							</Draggable>
						);
					})}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default memo(DragList);
