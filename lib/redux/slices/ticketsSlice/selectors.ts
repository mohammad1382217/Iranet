/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectticketsData = (state: ReduxState) => state.tickets.ticketsData
export const selectticketsSearchText = (state: ReduxState) => state.tickets.searchText
export const selectticketsSearchedColumn = (state: ReduxState) => state.tickets.searchedColumn
export const selectticketsOpations = (state: ReduxState) => state.tickets.selectoptions
export const selectedticketsOpation = (state: ReduxState) => state.tickets.selectedoption
export const selectedTicketform = (state: ReduxState) => state.tickets.ticketform
export const selectInputSubjectTicket = (state: ReduxState) => state.tickets.subjectTicket
export const selectInputdescriptionTicket = (state: ReduxState) => state.tickets.description