const express = require("express");
const cors = require('cors')
require("dotenv").config();


const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static('build'))

const port = process.env.PORT || 3000

const uri = "mongodb+srv://tecnico:FPwJmqWvH8nAKB4X@cluster0.9uskf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

/**
 * ROUTES
 */
app.get("/api/teslasites", async function (req, res, next) {
    const uri = "mongodb+srv://tecnico:FPwJmqWvH8nAKB4X@cluster0.9uskf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db("tesla");
        const sites = database.collection("sites");

        const cursor = sites.find({});
        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }
        // replace console.dir with your callback to access individual elements
        // await cursor.forEach(console.dir);
        const data = await cursor.toArray();
        res.send(data);
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`)
});

const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://tecnico:FPwJmqWvH8nAKB4X@cluster0.9uskf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db("tesla");
        const sites = database.collection("sites");

        const cursor = sites.find({});
        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }
        // replace console.dir with your callback to access individual elements
        await cursor.forEach(console.dir);
    } finally {
        await client.close();
    }

}

main().catch(console.error);


// async function deleteListingByName(client, nameOfListing) {
//     const result = await client.db("sample_airbnb").collection("listingsAndReviews")
//         .deleteOne({ name: nameOfListing });
//     console.log(`${result.deletedCount} document(s) was/were deleted.`);
// }

