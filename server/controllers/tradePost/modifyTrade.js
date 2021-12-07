const { tradePost } = require("../../models");

module.exports = async (req, res) => {
  const id = req.cookies.id;
  const postId = req.params.id;

  const postOne = await tradePost.findOne({
    where: { id: postId }
  });
  if (postOne.user_Id !== id) {
    return res.status(403).json({ message: "not correspond user" });
  }
  try {
    const { title, content } = req.body;
    //const img = req.files;
    const payload = { title, content }
    await tradePost.update(payload, { where: { id: postId } });
    const modification = await tradePost.findOne({
      where: { id: postId }
    });
    return res.status(200).json({ data: modification, message: "successful modification" });
  } catch (err) {
    return res.status(500).json({ message: "error" })
  }

}