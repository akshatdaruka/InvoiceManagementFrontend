const mystate={
  selecteddata:[]
}
export default function myReducer(state = mystate, action) {
  switch (action.type) {
    case "Sales_SELECTED":
      return {...state,selecteddata:[...action.data]};
  default:
      return state;
  }
}
