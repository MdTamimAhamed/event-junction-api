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
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }
    const {
      title,
      swagItems,
      eventType,
      eventDates,
      eventTimes,
      venue,
      speaker,
      authorId,
    } = req.body;

    const splitedSwagItems = swagItems.split(",");
    const splitedDates = eventDates.split(",");
    const splitedTimes = eventTimes.split(",");
    const splitedSpeakers = speaker.split(",");

    const event = new EndEvent({
      eventTitle: title,
      eventThumbnail: req.file.filename,
      eventType: eventType,
      swagItems: splitedSwagItems,
      dates: splitedDates,
      times: splitedTimes,
      venue: venue,
      speaker: splitedSpeakers,
      author: authorId,
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

//find details
async function getEventDetails(req, res) {
  const { authorId, eventId } = req.query;
  try {
    if (authorId) {
      const events = await EndEvent.find({ author: authorId });
      res.status(200).json(events);
    }
    if (eventId) {
      const events = await EndEvent.findById(eventId);
      console.log(events);
      res.status(200).json(events);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching events" });
  }
}

//edit event
async function updateEvents(req, res) {
  try {
  } catch (err) {}
}

module.exports = {
  uploadToStorage,
  handleUploadedFile,
  getEventDetails,
  updateEvents,
};
