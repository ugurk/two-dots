export default interface Serializable<T> {
  serialize(): any;

  deserialize(refElement: any): T;
}
