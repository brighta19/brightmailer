require("dotenv").config();
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

const { EMAIL_SERVICE, EMAIL_USER, EMAIL_PASS } = process.env;

// initialize nodemailer
let transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve("./views/"),
        defaultLayout: false,
    },
    viewPath: path.resolve("./views/")
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

let mailOptions = {
    from: `"BrightMailer" <${EMAIL_USER}>`, // sender address
    to: `${EMAIL_USER}`, // list of receiveers
    subject: "Welcome!",
    template: "email", // the name of the template file i.e email.handlebars
    context: {
        name: "Random Person",
        company: "BrightMailer"
    },
    attachments: [{ filename: "windows_anniversary.jpg", path: "./attachments/windows_anniversary.jpg" }],
    // cc: "an_email@address.com",
    // bcc: "another_email@address.com"
};

// trigger the sending of the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }

    console.log("Message sent: " + info.response);
});
