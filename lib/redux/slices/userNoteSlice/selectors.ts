/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectuserNoteData = (state: ReduxState) => state.userNote.userNoteData
export const selectEditingKey = (state: ReduxState) => state.userNote.editingKey
export const selectuserNoteSearchText = (state: ReduxState) => state.userNote.searchText
export const selectuserNoteSearchedColumn = (state: ReduxState) => state.userNote.searchedColumn
