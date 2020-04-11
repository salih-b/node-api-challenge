const express = require('express');
const projectsAction_db = require("../data/helpers/actionModel.js");

const theRouter = express.Router();

theRouter.use(express.json());

theRouter.post("/actions", (req, res, next) => {
  projectsAction_db.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => next(error));
});

theRouter.delete("/projects/:id/actions/:theId", (req, res) => {
    projectsAction_db.remove(req.params.theId)
      .then(count => {
        if (count) {
          res.status(204).end();
        } else {
          res.status(404).json({ message: "not found" });
        }
      })
      .catch(error => next(error));
  });
  
    theRouter.put('/actions/:theId', (req, res)=>{
        const changes = req.body;
        projectsAction_db.update(req.params.theId, changes)
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

theRouter.use(errorHandler);

function errorHandler(error, req, res, next) {
  // do something with error before responding
  // like saving it to a database, sending a mail to the admin
  // or using an external logging service
  res.status(500).json(error.message);
}

module.exports = theRouter;
