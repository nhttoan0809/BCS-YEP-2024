const STORAGE_KEY = "bcs-yep-name";
const STORAGE_EXP = "bcs-yep-enrol-exp";

const setExpiryTime = () => {
  const currentTime = new Date().getTime(); // Lấy thời gian hiện tại (tính bằng ms)
  localStorage.setItem(STORAGE_EXP, currentTime.toString()); // Lưu vào localStorage
};
const hasExpired = () => {
  const expiryTimeStr = localStorage.getItem(STORAGE_EXP);
  if (!expiryTimeStr) return true; // Không có giá trị trong localStorage => Hết hạn

  const expiryTime = parseInt(expiryTimeStr, 10); // Chuyển đổi về số
  const currentTime = new Date().getTime(); // Lấy thời gian hiện tại
  const halfHourInMs = 30 * 60 * 1000; // 30 phút tính bằng ms

  return currentTime - expiryTime > halfHourInMs; // Kiểm tra thời gian chênh lệch
};

export const getLocalName = () => {
  const isExpired = hasExpired();
  const name = localStorage.getItem(STORAGE_KEY);
  return !isExpired && name ? name : undefined;
};
export const setLocalName = (name) => {
  localStorage.setItem(STORAGE_KEY, name);
  setExpiryTime();
};
