export default interface Serializable {
  serialize(): any;

  deserialize(refElement: any): any;
}
