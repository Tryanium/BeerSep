class abstract DataAccess {
    private _database;

    protected constructor () {
        const admin = require("firebase-admin");
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
        this.database = admin.firestore();
    }


    get database() {
        return this._database;
    }

    set database(value) {
        this._database = value;
    }
}

module .exports = DataAccess;