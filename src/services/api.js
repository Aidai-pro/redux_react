export const fetchData = async () => {
  const response = await fetch('/api/data.json');
  if (!response.ok) {
    throw new Error('Ошибка загрузки данных');
  }
  const data = await response.json();
  return data;
};
// Имитация загрузки деталей с задержкой
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const fetchRideDetails = async (rideId) => {
  await delay(2000);
  const response = await fetch('/api/data.json');
  const data = await response.json();
  const ride = data.rides.find(r => r.id === rideId);
  return ride;
};