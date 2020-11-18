// actions
const PAGE_NAME = "pageName";
const DESCRIPTION = "description";
const store = {};

store[PAGE_NAME] = '';
store[DESCRIPTION] = '';


export {
	store
}

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

function updatePageName(state, newPageName){
	state[PAGE_NAME] = newPageName;
	return state;
}

function updateDescription(state, newDesc){
	state[DESCRIPTION] = newDesc;
	return state;

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

