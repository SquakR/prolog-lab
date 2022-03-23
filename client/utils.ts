export function equal(object1: { _id: string }, object2: { _id: string }) {
  return object1._id === object2._id
}

export function difference<T extends object>(
  array1: T[],
  array2: T[],
  comparator: (object1: object, object2: object) => boolean = equal
) {
  return array1.filter(
    (object1) => !array2.find((object2) => comparator(object1, object2))
  )
}
