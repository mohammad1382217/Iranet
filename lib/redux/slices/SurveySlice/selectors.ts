/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSurveyDatum = (state: ReduxState) => state.Survey.SurveyDatum
export const selectSurveyDataAdmin = (state: ReduxState) => state.Survey.SurveyDataAdmin
export const selectActiveStep = (state: ReduxState) => state.Survey.activeStep
export const selectSurveyMembers = (state: ReduxState) => state.Survey.surveyMembers
export const selectSurveyResults = (state: ReduxState) => state.Survey.surveyResults
export const selectSurveyData = (state: ReduxState) => state.Survey.SurveyData
export const selectUpdateSurveyData = (state: ReduxState) => state.Survey.updateSurveyData
export const selectSurveyOptions = (state: ReduxState) => state.Survey.survey_options
export const selectEditingId = (state: ReduxState) => state.Survey.editingId
export const selectShowModalParticipants = (state: ReduxState) => state.Survey.showModalParticipants
export const selectUuid = (state: ReduxState) => state.Survey.uuid
export const selectIsEdit = (state: ReduxState) => state.Survey.isEdit
export const selectSurveyTitle = (state: ReduxState) => state.Survey.survayTitle
export const selectIsStatusSurvey = (state: ReduxState) => state.Survey.status
