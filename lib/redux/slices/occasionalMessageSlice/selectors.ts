/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectoccasionalmessageData = (state: ReduxState) => state.occasionalMessage.occasionalMessageData
export const selectOccasionalMessageOpations = (state: ReduxState) => state.occasionalMessage.selectoptions
export const selectedOccasionalMessageOpation = (state: ReduxState) => state.occasionalMessage.selectedoption
export const selectInputSenddateOccasionalMessage = (state: ReduxState) => state.occasionalMessage.senddate
export const selectInputTitileOccasionalMessage = (state: ReduxState) => state.occasionalMessage.titleMessage
export const selectInputTextMessageOccasionalMessage = (state: ReduxState) => state.occasionalMessage.textmessage
