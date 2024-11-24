import { child, get, ref, remove, set, update } from "firebase/database";
import { db } from "../../Firebase";
import { uid } from "uid";

export default class Service {
  //create only one record
  static async create(entity, modelName) {
    try {
      const id = uid();
      const data = await set(ref(db, `${modelName}/${id}`), {
        ...entity,
        id,
        timeStamp: Date.now(),
      });
      return data;
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
  //read one or all records
  static async read(id = "", modelName) {
    try {
      const snapshot = await get(child(ref(db), `${modelName}/${id}`));
      if (snapshot.exists()) return snapshot.val();
      return null;
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
  //update only one record.
  static async update(id, entity, modelName) {
    try {
      const data = await update(ref(db, `${modelName}/${id}`), entity);
      return data;
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
  //delete one or all records
  static async delete(idArray, modelName) {
    try {
      const returnArray = [];
      await idArray.forEach(async (id) => {
        const data = await remove(ref(db, `${modelName}/${id}`));
        returnArray.push(data);
      });
      return returnArray;
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
}