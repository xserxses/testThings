const functions = require('firebase-functions');
const admin = require('firebase-admin');

const rp = require('request-promise');
const ApiAiApp = require('actions-on-google').ApiAiApp;

admin.initializeApp(functions.config().firebase);

exports.chuckNorris = functions.https.onRequest((request, response) => {
    const app = new ApiAiApp({request: request, response: response});
    let category;
    console.log("raw input" + app.getRawInput());


    if (!app.getArgument("Category")) {
        if (app.getContext("chucknorris-followup")) {
            console.log("parent context exists");
            category = app.getContextArgument("chucknorris-followup", "Category").value
        } else {
            app.ask(app.buildRichResponse()
                .addSimpleResponse("Please Select Category")
                .addBasicCard(app.buildBasicCard("Please Select Category")
                    .setImage("http://www.eastcottvets.co.uk/uploads/Animals/gingerkitten.jpg", "Kitten"))
                    .addSuggestions([
                        "explicit",
                        "dev",
                        "movie",
                        "food",
                        "celebrity",
                        "science",
                        "political",
                        "sport",
                        "religion",
                        "animal",
                        "music",
                        "history",
                        "travel",
                        "career",
                        "money",
                        "fashion"
                    ])
            )
        }
    } else {
        category = app.getArgument("Category")
    }
    console.log(`I found category: ${category}`);
    rp(`https://api.chucknorris.io/jokes/random?category=${category}`)
        .then(function ($) {
            app.ask(app.buildRichResponse()
                .addSimpleResponse(JSON.parse($).value)
                .addBasicCard(app.buildBasicCard(JSON.parse($).value)
                    .setImage("https://assets.chucknorris.host/img/chucknorris_logo_coloured_small.png", "Kitten"))
                .addSuggestions(['Next', "Exit"])
            )
        });
})
;
