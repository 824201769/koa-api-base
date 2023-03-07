
export const PAGE = (page=1, pageSize = 15) => {
  return (page - 1) * pageSize;
};
