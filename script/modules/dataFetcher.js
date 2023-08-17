export const loadData = async () => {
  const result = await fetch('./date.json');
  const data = await result.json();

  return data;
};
