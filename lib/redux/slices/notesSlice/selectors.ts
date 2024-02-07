/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectnotesData = (state: ReduxState) => state.notes.notesData
export const selectnotesDeleteId = (state: ReduxState) => state.notes.deleteId
export const selectSelectedItems = (state: ReduxState) => state.notes.selectedItems
export const selectnotesSearchText = (state: ReduxState) => state.notes.searchText
export const selectnotesSearchedColumn = (state: ReduxState) => state.notes.searchedColumn
