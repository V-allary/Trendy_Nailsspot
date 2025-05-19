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