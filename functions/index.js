/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin
        .auth()
        .getUserByEmail(data.email)
        .then((user) => {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true,
            });
        })
        .then(() => {
            return {
                message: `Success! ${data.email} has been made an admin!`,
            };
        }).catch(err => {
            console.log(err);
        });
});

// const {onRequest} = require("firebase-functions/v2/https");
// const cors = require('cors')({origin: true});
// const logger = require("firebase-functions/logger");
// const admin = require("firebase-admin");
// admin.initializeApp();

// exports.addAdminRole = onRequest((req, res) => {
//     cors(req, res, async () => {
//         // Codul funcției tale continuă aici
//         if (req.method !== 'POST') {
//             return res.status(405).send('Method not allowed');
//         }

//         const data = req.body;
//         const email = data.email;

//         if (!email) {
//             return res.status(400).send('Email address is missing');
//         }

//         try {
//             const user = await admin.auth().getUserByEmail(email);
//             await admin.auth().setCustomUserClaims(user.uid, { admin: true });
//             res.send(`Succes! ${email} has been made an admin!`);
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('An error occurred while processing the request');
//         }
//     });
// });
