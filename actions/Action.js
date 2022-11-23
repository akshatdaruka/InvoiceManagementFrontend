import { Sales_SELECTED } from "./actionTypes";

export function salesselected(data) {
  return {
    type: Sales_SELECTED,
    data,
  };
}