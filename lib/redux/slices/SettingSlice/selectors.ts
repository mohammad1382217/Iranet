/* Instruments */
import { ReduxState } from "../../store"

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectShowModalDeleteDepartment = (state: ReduxState) => state.Setting.showModalDeleteDepartment
export const selectShowModalDeleteAccountAdmin = (state: ReduxState) => state.Setting.showModalDeleteAccountAdmin
export const selectShowModalDisablePayment = (state: ReduxState) => state.Setting.showModalDisablePayment
export const selectShowModalAddAccountAdmin = (state: ReduxState) => state.Setting.showModalAddAccountAdmin
export const selectShowModalEditAccountAdmin = (state: ReduxState) => state.Setting.showModalEditAccountAdmin
export const selectDisableId = (state: ReduxState) => state.Setting.disableId
