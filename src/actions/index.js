// Action Creator　Actionを定義してactionをreturn する関数
export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"

export const increment = () => ({
  type: "INCREMENT",
})

export const decrement = () => ({
  type: "DECREMENT",
})
