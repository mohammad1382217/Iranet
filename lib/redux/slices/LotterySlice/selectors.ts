/* Instruments */
import { ReduxState } from "../../store"

export const selectLotteryGroups = (state : ReduxState) => state.lottery.lotteryGroups
export const selectLotterySurvey = (state : ReduxState) => state.lottery.lotterySurvey
export const selectIsLotteryLoading = (state : ReduxState) => state.lottery.isLotteryLoading