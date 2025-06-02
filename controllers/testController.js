const testingController = (req, res) => {
  res.status(200).send({ message: "Testing Controller" });
};

module.exports = { testingController };
