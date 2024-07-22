/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTicketsDataUsers = (state: ReduxState) => state.tickets.ticketsUsersData
export const selectviewTicketsUsersChat = (state: ReduxState) => state.tickets.viewTicketsUsersChat
export const selectStatusTicketsDataUsers = (state: ReduxState) => state.tickets.status

// export const selectticketsData = (state: ReduxState) => state.tickets.ticketsUsersData
