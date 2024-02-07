/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSurveyDatum = (state: ReduxState) => state.Survey.SurveyDatum
export const selectSurveyData = (state: ReduxState) => state.Survey.SurveyData
export const selectEditingId = (state: ReduxState) => state.Survey.editingId
export const selectShowModalParticipants = (state: ReduxState) => state.Survey.showModalParticipants
export const selectSurveySearchText = (state: ReduxState) => state.Survey.searchText
export const selectSurveySearchedColumn = (state: ReduxState) => state.Survey.searchedColumn
