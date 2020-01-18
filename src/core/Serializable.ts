export interface Serializable<T> {
  serialize(): object;

  deserialize(refElement: object): T;
}
