const express = require("express");

const projects_db = require("../data/helpers/projectModel.js");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  // read the message from the Environment
  const message = process.env.MESSAGE || "hello world";

  // return the message as part of the response
  res.status(200).json({ api: "up", message });

  // visit your-app-url-on-heroku/api/
});

router.get("/projects", (req, res, next) => {
  projects_db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => next(error));
});

router.post("/projects", (req, res, next) => {
  projects_db.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => next(error));
});

router.delete("/projects/:id", (req, res) => {
  projects_db.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(error => next(error));
});

    router.put('/projects/:id', (req, res)=>{
        const changes = req.body;
        projects_db.update(req.params.id, changes)
        .then(post =>{
            if (post){
                res.status(200).json(post);
            } else {
                res.status(404).json({message: `The post could not found `});
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: `Error adding post`});
        });
    });
    
    router.get("/projects/:id/actions", (req, res, next) => {
        projects_db.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => next(error));
    });
  

router.use(errorHandler);

function errorHandler(error, req, res, next) {
  // do something with error before responding
  // like saving it to a database, sending a mail to the admin
  // or using an external logging service
  res.status(500).json(error.message);
}

module.exports = router;
