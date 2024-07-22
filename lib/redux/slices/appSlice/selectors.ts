/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsMenuOpen = (state: ReduxState) => state.app.isMenuOpen
export const selectShowModals = (state: ReduxState) => state.app.showModals
export const selectActiveCheckBoxDirectPayment = (state: ReduxState) => state.app.activeCheckBoxDirectPayment
export const selectIsFirstStep = (state: ReduxState) => state.app.isFirstStep
export const selectIsLastStep = (state: ReduxState) => state.app.isLastStep
export const selectAccordionOpen = (state: ReduxState) => state.app.accordionOpen
export const selectUnderAccordionOpen = (state: ReduxState) => state.app.underAccordionOpen
export const selectOpenRight = (state: ReduxState) => state.app.openRight
export const selectOpenLeft = (state: ReduxState) => state.app.openLeft
export const selectSelectedItems = (state: ReduxState) => state.app.selectedItems
export const selectNotePhone = (state: ReduxState) => state.app.NotePhone
export const selectSelectedTxtFile = (state: ReduxState) => state.app.selectedTxtFile
export const selectEditingKey = (state: ReduxState) => state.app.editingKeyTable
export const selectSearchTableText = (state: ReduxState) => state.app.searchTableText
export const selectSearchedAppTableColumn = (state: ReduxState) => state.app.searchedTableColumn
export const selectStartDate = (state: ReduxState) => state.app.startDate
export const selectEndDate = (state: ReduxState) => state.app.endDate
export const selectStore = (state: ReduxState) => state.app.store
export const selectStoreAccount = (state: ReduxState) => state.app.storeAccount
export const selectIsLoadingStore = (state: ReduxState) => state.app.isLoadingStore
