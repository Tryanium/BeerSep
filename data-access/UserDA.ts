import * as admin from "firebase-admin";

const database = admin.firestore();


export class UserDA {

    constructor() {
    }

    getUser() {
        return database.collection("user").doc();
    }


    /**
     *
     * @param {String} id
     * @param user
     * @returns {any}
     */
    // TODO type le user
    addUser(id: String, user: any){
        return database.collection("users").doc(id).set(user);
    }
}

