// Action Creator・・・Actionを定義してactionをreturnする関数
export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"

// Action・・・typeというkeyをもつオブジェクト
export const increment = () => ({
  type: "INCREMENT",
})

export const decrement = () => ({
  type: "DECREMENT",
})
