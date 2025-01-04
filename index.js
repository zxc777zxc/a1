
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;


app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BMI Calculator</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          text-align: center;
        }
        form {
          display: inline-block;
          text-align: left;
        }
        input {
          margin-bottom: 10px;
          padding: 10px;
          font-size: 1em;
          width: 100%;
          box-sizing: border-box;
        }
        button {
          background-color: #007BFF;
          color: white;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
        .result {
          margin-top: 20px;
          font-size: 1.2em;
        }
        .underweight {
          color: blue;
        }
        .normal {
          color: green;
        }
        .overweight {
          color: yellow;
        }
        .obese {
          color: red;
        }
      </style>
    </head>
    <body>
      <h1>BMI Calculator</h1>
      <form action="/calculate-bmi" method="POST">
        <label for="weight">Weight (kg):</label><br>
        <input type="number" step="0.1" id="weight" name="weight" required><br>
        <label for="height">Height (m):</label><br>
        <input type="number" step="0.01" id="height" name="height" required><br>
        <button type="submit">Calculate BMI</button>
      </form>
      <div id="message"></div>
    </body>
    </html>
  `);
});




app.post('/calculate-bmi', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        return res.send('<h1>Invalid input! Please ensure weight and height are positive numbers.</h1>');
    }

    const bmi = (weight / (height * height)).toFixed(2);
    let category = '';
    let className = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        className = 'underweight';
    } else if (bmi < 24.9) {
        category = 'Normal weight';
        className = 'normal';
    } else if (bmi < 29.9) {
        category = 'Overweight';
        className = 'overweight';
    } else {
        category = 'Obese';
        className = 'obese';
    }

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BMI Result</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          margin: 20px;
        }
        .result {
          font-size: 1.5em;
        }
        .underweight {
          color: blue;
        }
        .normal {
          color: green;
        }
        .overweight {
          color: yellow;
        }
        .obese {
          color: red;
        }
      </style>
    </head>
    <body>
      <h1>Your BMI Result</h1>
      <p class="result ${className}">Your BMI is ${bmi}, which is considered <strong>${category}</strong>.</p>
      <a href="/">Back to BMI Calculator</a>
    </body>
    </html>
  `);
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
