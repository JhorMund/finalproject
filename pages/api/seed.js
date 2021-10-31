import nc from "next-connect";
import Product from "../../models/Product";
import db from "../../utils/db";
import data from "../../utils/data";
import Product2 from "../../models/Product2";

const handler = nc ();

handler.get (async (req,res) => {
  await db.connect();
  await Product.deleteMany();
  await Product2.deleteMany();
  await Product.insertMany(data.products);
  await Product2.insertMany(data.products1);
  await db.disconnect();
  res.send({ message: 'seeded berhasil' });
});

export default handler;
