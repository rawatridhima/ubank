import Service from "./Service";

export default class TransactionService extends Service{
    static async create(entity) {
        return super.create(entity, "transactions");
      }
    
    static async read(id = "") {
        return super.read(id, "transactions");
      }


}