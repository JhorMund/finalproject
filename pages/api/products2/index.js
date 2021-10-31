import nc from "next-connect";
import Product2 from "../../../models/Product2";
import db from "../../../utils/db";

const handler = nc ();

handler.get (async ( req, res ) => {
  await db.connect();
  const products1 = await Product2.find({});
  await db.disconnect();
  res.send(products1);
});

export default handler;
