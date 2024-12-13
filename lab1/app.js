const express = require("express");
const app = express();

// app.use(express.static("publidc"));
const myLogger = (req, res, next) => {
    console.log("LOGGED");
    next();
  };
  app.use(myLogger);
  //app.use((req, res, next) => {
    // res.status(404).send("Sorry cant find that!");
    // });
 app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  })

  app.use('/static', express.static(__dirname + '/public'));
   
 
  const requestTime = (req, res, next) => {
        req.requestTime = Date.now();
        next();
      };
     app.use(requestTime);
      app.use( (req, res, next) =>{
        console.log('Time:', Date.now());
        next();
        });

        app.use('/contact/:id', (req, res, next)=> {
          console.log('Request Type:', req.method);
          next();
          });


    app.get("/", (req, res) => {
      res.render("index", {
      title: "Hey",
      message: "Hello there!",
      });
      });
      
        
        
     

app.use((req, res, next) => {
    res.status(404).send("Sorry cant find that!");
  });

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/", (req, res) => {
    res.send("Got a POST request");
  });
  app.put("/user", (req, res) => {
    res.send("Got a PUT request at /contact ");
    });
  app.use("/contact", function (request, response) {
    response.render("contact", {
    title: "Мои контакты",
    emailsVisible: true,
    emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
    phone: "+1234567890",
    });
    });
    

  app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});