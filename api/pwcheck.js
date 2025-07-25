export default function handler(req, res) {
  const { pw } = req.query;

  // TADY MĚŇ HESLO, NE JINDE
  const heslo = "frconzole24";

  res.setHeader("Content-Type", "text/plain");

  if (pw === heslo) {
    res.status(200).send("true");
  } else {
    res.status(200).send("false");
  }
}
