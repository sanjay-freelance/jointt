// actions
const PAGE_NAME = "pageName";
const DESCRIPTION = "description";
const store = {};

store[PAGE_NAME] = '';
store[DESCRIPTION] = '';



// action creators // these are dispatched by sending the return type of action creators
function setPageName(data){
	return {
		type: PAGE_NAME,
		data: data
	}
}

function setDescription(data){
	return {
		type: DESCRIPTION,
		data: data
	}
}

// React does object level comparison to trigger changes update
// hence we have to spread the state to create new state object
function updatePageName(currentGlobalState, newPageName){
	const newState = {};
	newState[PAGE_NAME] = newPageName;
	return Object.assign({}, currentGlobalState, newState)
}

function updateDescription(currentGlobalState, newDesc){
	const newState = {};
	newState[DESCRIPTION] = newDesc;
	return Object.assign({}, currentGlobalState, newState)

}

// reducer
export default function reducer(state, action){
	const {type, data} = action;
	switch (type) {
		case PAGE_NAME:
			return updatePageName(state, data);
		case DESCRIPTION:
			return updateDescription(state, data);
	}
}


const actionCreators = {
	setPageName,
	setDescription,
};

export {
	actionCreators,
	store
};

