export default defineEventHandler(async () => {
  const res = await fetch("https://ctftime.org/api/v1/events/");
  const data = await res.json();
  return data;
});
