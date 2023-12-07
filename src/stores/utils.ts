/** 获取用户信息 */
export const getUserInfo = () =>
  JSON.parse(localStorage.getItem("user_info") || "{}") || {};
