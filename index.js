import { MongoClient } from "mongodb";
import { readFile } from "node:fs";

const url = "mongodb://127.0.0.1:27017";

// const options = { useNewUrlParser: true, useUnifiedTopology: true };

// const connectDB = async () => {
//   const client = await MongoClient.connect(url);
//   const db = await client.db("training");
//   const collection = await db.collection("demo");
//   // const data = await collection.find({}).toArray();
//   console.log(data);
// };

// readFile("./data.json", async (err, data) => {
//   const client = await MongoClient.connect(url);
//   const db = await client.db("training");
//   const collection = await db.collection("demo");
//   if (err) console.log(err);
//   const datas = data.toString();
//   const { name, age, jjj } = JSON.parse(datas);
//   // console.log(jsonData);
//   const insertData = await collection.insertOne({
//     name: name,
//     age: age,
//     jjj: jjj,
//   });
//   console.log(insertData);
// });

// const client = new MongoClient(url, options);
const connectDB = async () => {
  const client = await MongoClient.connect(url);

  const db = await client.db("Music");

  console.log("DB Connected Successfully");

  // const collections = await db.listCollections().toArray();
  // console.log(collections);

  // if (collections[0]?.name === "Songs") {
  //   console.log("Collection exists!");
  // } else {
  //   db.createCollection("Songs", function (err, res) {
  //     if (err) throw err;
  //     console.log("Collection created!");
  //   });
  // }

  const collection = await db.collection("Songs");
  // const inn = await collection.find({}).toArray();
  // console.log(inn);
  let count = 0;
  readFile("./fixed.json", { encoding: "utf-8" }, async (err, data) => {
    if (err) console.log(err);
    const datas = data.toString();
    // console.log(datas);
    const ReadData = JSON.parse(datas);
    // const oneData = ReadData[0];
    // console.log(ReadData);
    // collection.insertOne(item, function (err, result) {
    //   if (err) throw err;
    //   console.log("Inserted item:", item);
    // });
    // console.log(ReadData);
    // function nodeListToArray(elem) {
    //   return [].slice().call(elem);
    // }
    // const trArr = nodeListToArray(ReadData);
    // console.log(trArr);
    // const arrData = Array.from(ReadData);
    // console.log(arrData);
    const insertData = ReadData.forEach(async (item) => {
      count = count + 1;
      // console.log(count);
      const name = item.name;
      const year = item.year;
      const artistsCount = item.artists.length;
      const genere = item.genres.map((item) => item.name);
      const cpysID = item.copyrights[0]?.id;
      // console.log(item[0]);
      // console.log("Item =->", item.name);
      // console.log("Year =->", item.year);
      // console.log("artistsCount =->", item.artists.length);

      // console.log("genres =->", genere);
      // console.log("copyrights_song_id =->", item.copyrights[0]?.id);

      const insertData = await collection.insertOne({
        name: name,
        year: year,
        artistsCount: artistsCount,
        genres: genere,
        copyrights_song_id: cpysID,
      });
    });

    console.log("Inserted Documents Count === >", count);

    // console.log(insertData);
    setTimeout(() => {
      client.close();
    }, 9000);
  });
};

connectDB();
