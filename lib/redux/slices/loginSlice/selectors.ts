/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOtp = (state : ReduxState) => state.login.otp
export const selectRegister = (state : ReduxState) => state.login.register
export const selectSupplementaryForm = (state : ReduxState) => state.login.supplementaryform
export const selectStoreLogo = (state : ReduxState) => state.login.store_logo
export const selectStoreAd = (state : ReduxState) => state.login.store_ad
export const selectNationalCard = (state : ReduxState) => state.login.national_card
export const selectDepartments = (state : ReduxState) => state.login.departments
export const selectPhoneNumber = (state : ReduxState) => state.login.phone_number
export const selectAccount = (state : ReduxState) => state.login.account
export const selectIsAdmin = (state : ReduxState) => state.login.isAdmin
export const selectIsLoggedIn = (state : ReduxState) => state.login.isLoggedIn
export const selectIsLoading = (state : ReduxState) => state.login.isLoading
