export default function handler(req, res) {
  const { pw } = req.query;

  res.setHeader("Content-Type", "text/plain");

  if (pw === "frconzole24") {
    res.status(200).send("true");
  } else {
    res.status(200).send("false");
  }
}
