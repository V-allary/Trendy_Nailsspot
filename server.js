const express = require('express');
const app = express();
const path = require('path');

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Trendynailsspot server running at http://localhost:${PORT}`);
});
const bodyParser = require('body-parser');

// Parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Handle form submission
app.post('/submit-form', async (req, res) => {
    const { name, phone, service, date, time ,message } = req.body;
  
    const newBooking = new Booking({ name, phone, service, date, time,message });
  
    try {
      await newBooking.save();
  
      // Email
      const mailOptions = {
        from: 'vallarymitchelle1@gmail.com',
        to: 'vallarymitchelle4@gmail.com',
        subject: 'New Booking Received',
        text: `New booking:
  Name: ${name}
  Phone: ${phone}
  Service: ${service}
  Date: ${date}
  Time: ${time}
  Your Tech:${message}`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
      res.send(`<h1>Thanks, ${name}!</h1><p>Your booking for ${service} on ${date} at ${time}  Your Tech ${message}  has been saved.</p>`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error saving booking. Please try again.");
    }
  });
  const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Approved techs from Trendy Nail's Spot
const allowedTechs = [
  "iannail's",
  "Nailed by Mash",
  "nails by mashen",
  "Ricky claws",
  "Kev Nails",
  "Nail'sramoes",
  "Nails aite"
];

// Route to receive bookings
app.post('/book', (req, res) => {
  const { name, email, message, nailtech, time } = req.body;

  if (!allowedTechs.includes(nailtech)) {
    return res.status(403).send('Booking not allowed for this nail tech.');
  }

  // Email config
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'trendynailsspot@gmail.com',
      pass: 'your-app-password-here' // use App Password, not Gmail password
    }
  });

  const mailOptions = {
    from: email,
    to: 'vallarymitchelle4@gmail.com',
    subject: `New Booking from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Time: ${time}
      Nail Tech: ${nailtech}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
      return res.status(500).send('Failed to send booking.');
    }
    res.send('Booking successfully sent!');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});