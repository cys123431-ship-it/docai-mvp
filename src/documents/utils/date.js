export const formatDateKor = (dateString) => {
  if (!dateString) {
    return "";
  }

  const [year, month, day] = dateString.split("-").map((item) => Number(item));
  if (!year || !month || !day) {
    return dateString;
  }
  return `${year}년 ${month}월 ${day}일`;
};

export const getTodayKor = () => {
  const now = new Date();
  return `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
};
