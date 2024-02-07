/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectoccasionalmessageData = (state: ReduxState) => state.occasionalmessage.occasionalmessageData
export const selectoccasionalmessageSearchText = (state: ReduxState) => state.occasionalmessage.searchText
export const selectoccasionalmessageSearchedColumn = (state: ReduxState) => state.occasionalmessage.searchedColumn
export const selectOccasionalMessageOpations = (state: ReduxState) => state.occasionalmessage.selectoptions
export const selectedOccasionalMessageOpation = (state: ReduxState) => state.occasionalmessage.selectedoption
export const selectInputSenddateOccasionalMessage = (state: ReduxState) => state.occasionalmessage.senddate
export const selectInputTitileOccasionalMessage = (state: ReduxState) => state.occasionalmessage.titleMessage
export const selectInputTextMessageOccasionalMessage = (state: ReduxState) => state.occasionalmessage.textmessage
export const selectLenghtTextArea = (state: ReduxState) => state.occasionalmessage.lenghtTextArea
