export default function toggleArrayItem(array, item) {
  let updatedArray = [...array];

  if (!updatedArray.includes(item)) {
    updatedArray.push(item);
  } else {
    updatedArray = updatedArray.filter((element) => element !== item);
  }

  return updatedArray;
}
