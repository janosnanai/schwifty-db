// compare 2 objects with SAME KEYS

export default function shallowCompare(obj1: object, obj2: object) {
  for (let k in obj1) {
    if (!(k in obj2) || obj1[k as keyof object] !== obj2[k as keyof object]) {
      return false;
    }
  }
  return true;
}
