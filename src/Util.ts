export function deepCopy(objectToClone : any) : any {
    let copy : any = null;

    if (objectToClone === null || typeof objectToClone !== 'object') {
      return objectToClone;
    }

    if (objectToClone instanceof Date) {
      copy = new Date();
      copy.setTime(objectToClone.getTime());
      return copy;
    }

    if (objectToClone instanceof Map) {
    	return new Map(deepCopy(Array.from(objectToClone)));
    }

    if (objectToClone instanceof Array) {
      copy = [];
      for (let i = 0, len = objectToClone.length; i < len; i++) {
          copy[i] = deepCopy(objectToClone[i]);
      }
      return copy;
    }

    if (objectToClone instanceof Object) {
      copy = {};
      for (const attr in objectToClone) {
          if (objectToClone.hasOwnProperty(attr)) {
              copy[attr] = deepCopy(objectToClone[attr]);
          }
      }
      return copy;
    }
  }