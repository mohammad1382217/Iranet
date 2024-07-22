/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selecttableInputNotesData = (state: ReduxState) => state.tableInputNotes.dataTable
export const selectEditingKeyTable = (state: ReduxState) => state.tableInputNotes.editingKeyTable
export const selecttableInputNotesAddTitle = (state: ReduxState) => state.tableInputNotes.add_title
export const selecttableInputNotesAddKind = (state: ReduxState) => state.tableInputNotes.add_kind
export const selecttableInputNotesAddLimitCharacter = (state: ReduxState) => state.tableInputNotes.add_limitcharacter
