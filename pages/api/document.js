const postMethod = async (json) => {
  try {
    console.log(json);

    // azure'a dosyanın gönderileceği yer
    return true;
  } catch {
    return false;
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const postResult = await postMethod(req.body);
      if (postResult) {
        res
          .status(200)
          .json({ message: "Success post method", data: postResult });
      } else {
        res.status(400).json({ message: "Error" });
      }
      break;
    

    default:
      res.status(400).json({ name: "error" });
      break;
  }
}
