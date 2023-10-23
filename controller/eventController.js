const multer = require("multer");
const path = require("path");
const { EndEvent } = require("../model/eventCreationSchema");

// console.log(`Hello: ${uploadPath}`);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..", "public", "uploads");
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`
    );
  },
});

const uploadToStorage = multer({ storage: storage });

//save image
async function handleUploadedFile(req, res) {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    // Create a new event with the title and thumbnail
    const {
      title,
      swagItems,
      eventType,
      eventDates,
      eventTimes,
      venue,
      speaker,
    } = req.body;

    const splitedSwagItems = swagItems.split(",");

    const event = new EndEvent({
      eventTitle: title,
      eventThumbnail: req.file.filename,
      eventType: eventType,
      swagItems: splitedSwagItems,
      dates: eventDates,
      times: eventTimes,
      venue: venue,
      speaker: speaker,
    });

    console.log(`newevent: ${event}`);

    // Save the event to the database
    await event.save();
    res.status(200).json({ message: "File uploaded successfully!" });
  } catch (error) {
    console.error(`Er: ${error}`);
    res.status(500).json({
      error: {
        message: "Internal server error",
      },
    });
  }
}

//find image + details
async function getEventDetails(req, res) {
  try {
    const events = await EndEvent.find();
    console.log(events);
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching events" });
  }
}

module.exports = {
  uploadToStorage,
  handleUploadedFile,
  getEventDetails,
};
