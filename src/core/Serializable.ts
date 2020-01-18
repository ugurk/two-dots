export interface Serializable<T> {
  serialize(): SerializedObject;

  deserialize(refElement: SerializedObject): T;
}

export interface SerializedObject {
  [key: string]: number | string | boolean;
}
