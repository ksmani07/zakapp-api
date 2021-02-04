var express = require('express');
var router = express.Router();

/* GET auto title listing. */
router.get('/', function(req, res, next) {
  const query = "select * from table_autotitle";
  db.query(query,(err,result)=>{
    if(err){
      res.status(500).json({
        message: "Unable to get the auto title",
        result: err
      });
    }
    res.status(201).json({
      message: "Auto title details",
      result: result
    });
  })
});

// create a new autotitle
router.post("/create", (req,res,next)=>{

  const autoId = req.body.autoId;
  const autoTitle = JSON.stringify(req.body.autoTitle);

  let query = "INSERT INTO `table_autotitle` (autoId, options) VALUES ('" +
  autoId + "', '" + autoTitle + "')";
  
  db.query(query, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    }

    res.status(201).json({
      message: "Auto title created!",
      result: result
    });
  });
  
});


/** Update the autotile data based on id{A001} */
router.patch("/:id", (req,res,next) => {
  const query = "update table_autotitle set options =? where autoId=?";

  const autoId = req.body.autoId;
  const autoTitle = JSON.stringify(req.body.autoTitle);

  db.query(query,[autoTitle, req.params.id],(err,result)=>{
    if(err){
      res.status(500).json({
        message: "Auto title not updated",
        result: err
      });
    }
    res.status(201).json({
      message: "Auto title options updated",
      result: result
    });
  })
});

module.exports = router;