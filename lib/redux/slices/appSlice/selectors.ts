/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectIsMenuOpen = (state: ReduxState) => state.app.isMenuOpen
export const selectShowModal = (state: ReduxState) => state.app.showModal
export const selectShowModalResultSurvey = (state: ReduxState) => state.app.showModalResultSurvey
export const selectShowModalSendReport = (state: ReduxState) => state.app.showModalSendReport
export const selectActiveStep = (state: ReduxState) => state.app.activeStep
export const selectActiveCheckBoxDirectPayment = (state: ReduxState) => state.app.activeCheckBoxDirectPayment
export const selectIsFirstStep = (state: ReduxState) => state.app.isFirstStep
export const selectIsLastStep = (state: ReduxState) => state.app.isLastStep
export const selectAccordionOpen = (state: ReduxState) => state.app.accordionOpen
export const selectOpenRight = (state: ReduxState) => state.app.openRight
export const selectOpenLeft = (state: ReduxState) => state.app.openLeft
export const selectNotePhone = (state: ReduxState) => state.app.NotePhone
export const selectSelectedTxtFile = (state: ReduxState) => state.app.selectedTxtFile
