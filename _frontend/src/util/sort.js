const sortDataById = (data) => {
  return data.sort((a, b) => a.id - b.id);
};

// ==============================================

export { sortDataById };