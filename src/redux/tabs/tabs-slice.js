import { createSlice } from '@reduxjs/toolkit';
import { updatePosition } from '../../helpers/updatePosition';
import initialPinnedTabs from '../../helpers/initialPinnedTabs.json';
import initialCommonTabs from '../../helpers/initialCommonTabs.json';
const initialState = {
	pinnedTabs: initialPinnedTabs,
	commonTabs:initialCommonTabs,
};

export const tabsSlice = createSlice({
	name: 'tabs',
	initialState,
	reducers: {
		addToPinned: (state, { payload }) => {
			state.pinnedTabs = updatePosition([...state.pinnedTabs, payload]);
			state.commonTabs = updatePosition(state.commonTabs.filter(el => el.id !== payload.id));
		},
		removeFromPinned: (state, { payload }) => {
			state.commonTabs = updatePosition([...state.commonTabs, payload]);
			state.pinnedTabs = updatePosition(state.pinnedTabs.filter(el => el.id !== payload.id));
		},
		updatePinnedTabs: (state, { payload }) => {
			state.pinnedTabs = payload;
		},
		updateCommonTabs: (state, { payload }) => {
			state.commonTabs = payload;
		},
	},
});

export const { addToPinned, removeFromPinned, updatePinnedTabs, updateCommonTabs } = tabsSlice.actions;
export default tabsSlice.reducer;
