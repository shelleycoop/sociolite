import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    try {
      await client.connect();

      const database = client.db("your_database_name");
      
      const collection = database.collection("subscribers");

      const existingSubscriber = await collection.findOne({ email });
      if (existingSubscriber) {
        return res.status(409).json({ error: "Email already subscribed" });
      }

      const result = await collection.insertOne({ email, subscribedAt: new Date() });
      res.status(201).json({ message: "Subscribed successfully", id: result.insertedId });
    } catch (error) {
      console.error("Error saving email:", error);
      res.status(500).json({ error: "Failed to save email" });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
