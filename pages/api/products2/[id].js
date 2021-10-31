import nc from "next-connect";
import Product2 from "../../../models/Product2";
import db from "../../../utils/db";

const handler = nc ();

handler.get (async ( req, res ) => {
  await db.connect();
  const product0 = await Product2.findById(req.query.id);
  await db.disconnect();
  res.send(product0);
});

export default handler;
