export const updateOrPush = (id: string, newItem: any, array: any[]) => {
  const index = array.findIndex((item) => item.id === id)

  if (index !== -1) {
    // If the item with the same ID exists, replace it
    array[index] = newItem
  } else {
    // If the item with the same ID doesn't exist, push the new item
    array.push(newItem)
  }

  // Return the updated array
  return array
}
