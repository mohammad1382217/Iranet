/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLogin = (state : ReduxState) => state.login.login
export const selectSubmitInfo = (state : ReduxState) => state.login.submitInfo
export const selectSupplementaryForm = (state : ReduxState) => state.login.supplementaryform
