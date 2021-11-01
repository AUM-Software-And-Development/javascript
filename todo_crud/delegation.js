// Dynamic variability for events passed from an upper level class
// module should be used to keep the reference
class EventDelegation {
  static InitializeClick(domItem, functionIn, module) {
    domItem.onclick = () => {
      functionIn(module);
    };
  }
  static DestructureClick(domItem) {
    domItem.onclick = undefined;
  }
  static InitializeKeyUp(domItem, functionIn, module) {
    domItem.onkeyup = () => {
      functionIn(module);
    };
  }
  static DestructureKeyUp(domItem) {
    domItem.onkeyup = undefined;
  }
  static InitializeGroupClicks(domItem, functionIn, module) {
    domItem.forEach((item, index) => {
      item.onclick = () => {
        functionIn(index, module);
      };
    });
  }
  static DestructureGroupClicks(domItem) {
    domItem.forEach((item) => {
      item.onclick = () => {
        undefined;
      };
    });
  }
}
