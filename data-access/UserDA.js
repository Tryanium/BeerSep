var admin = require("firebase-admin");
var UserDA = /** @class */ (function () {
    function UserDA() {
        require('dotenv').config();
        admin.initializeApp({
            credential: admin.credential.cert({
                "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                "client_email": process.env.FIREBASE_CLIENT_EMAIL,
                "project_id": process.env.FIREBASE_PROJECT_ID,
                "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID
            }),
            databaseURL: "https://beersep-cf1ad.firebaseio.com"
        });
    }
    UserDA.prototype.getUser = function (id) {
        var database = admin.firestore();
        database.collection("users").doc(id).get()
            .then(function (doc) {
            if (doc.exists) {
                return doc;
            }
            else {
                console.log("No such document!");
                return null;
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    };
    /**
     *
     * @param {String} id
     * @param user
     * @returns {any}
     */
    // TODO type le user
    UserDA.prototype.addUser = function (id, user) {
        var database = admin.firestore();
        var data = {
            ID: id,
            "Display Name": user
        };
        database.collection("users").doc(id).set(data);
        return true;
    };
    return UserDA;
}());
module.exports = UserDA;
