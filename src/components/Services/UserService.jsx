import Service from "./Service";

export default class UserService extends Service{
    static async create(entity) {
        return super.create(entity, "users");
      }
    
      static async read(id = "") {
        return super.read(id, "users");
      }
    
      static async update(id, entity)  {
        return super.update(id, entity,"users");
      }
    
      // static async delete(idArr) {
      //   return super.delete(idArr, "users");
      // }
    

      
      static async checkEmailExists(email) {
        const all_users = await super.read("", "users");
        let userExists = false;
        if(all_users){

          Object.values(all_users).forEach((x) => {
            if (x.email === email) {
              console.log(x.email,email)
              userExists = true;
              return; 
            }
          });
        }
        return userExists;
      }
}