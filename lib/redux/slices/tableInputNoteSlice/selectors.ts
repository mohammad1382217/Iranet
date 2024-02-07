/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selecttableInputNotesData = (state: ReduxState) => state.tableInputNote.dataTable
export const selectEditingKeyTable = (state: ReduxState) => state.tableInputNote.editingKeyTable
export const selecttableInputNotesSearchText = (state: ReduxState) => state.tableInputNote.searchText
export const selecttableInputNotesSearchedColumn = (state: ReduxState) => state.tableInputNote.searchedColumn
export const selecttableInputNotesAddTitle = (state: ReduxState) => state.tableInputNote.add_title
export const selecttableInputNotesAddKind = (state: ReduxState) => state.tableInputNote.add_kind
export const selecttableInputNotesAddLimitCharacter = (state: ReduxState) => state.tableInputNote.add_limitcharacter
