//******************************** VARIABLES / REQUIRE ********************************/
//*************************************************************************************/

const knexConfig      = require('../knexfile');
const ENV         		= process.env.ENV || "development";
const knex            = require('knex')(knexConfig[ENV]);
const express 				= require('express');
const router 					= express.Router();

//************************************** ROUTES ***************************************/
//*************************************************************************************/

// [GET] deals
router.get('/', function(req, res) {
  let currentTime = new Date();
  
  knex
    .select("deals.id as deal_id",
    "deals.name", 
    "deals.description", 
    "deals.quantity_available", 
    "deals.image_path", 
    "deals.current_price", 
    "deals.end_date", 
    "merchants.business_name", 
    "merchants.id as merchant_id")
    .from("deals")
    .innerJoin("merchants", "deals.merchant_id", "merchants.id")
    .where("deals.quantity_available", ">", 0)
    .where("deals.end_date", ">", currentTime)
    .orderBy("deals.end_date")
    .then((data) => {
      res.json(data);
    });

});

// [GET] specific deal
router.get('/:id', function(req, res) {
  knex
    .select("*")
    .from("deals")
    .where("deals.id", req.params.id)
    .then((data) => {
      res.json(data);
    });

});

// [CREATE] a new deal
router.post('/new', function(req, res) {
  let dateArr = (req.body.date).split('-');
  let timeArr = (req.body.time).split(':');
  let year= Number(dateArr[0]);
  let month= Number(dateArr[1])-1;
  let day= Number(dateArr[2]);
  let hour= Number(timeArr[0]);
  let min= Number(timeArr[1]);
  let dealObject = {};
  dealObject.merchant_id = req.body.merchant_id;
  dealObject.name = req.body.name;
  dealObject.description = req.body.description;
  dealObject.quantity_available = req.body.quantity_available;
  dealObject.image_path = req.body.image_path;
  dealObject.current_price = req.body.current_price;
  dealObject.end_date = new Date(year,month,day,hour,min);
  if(dealObject.merchant_id){
    knex
    .insert(dealObject)
    .into('deals')
    .then((data) => {
      let value = JSON.stringify(data)
      res.status(200).json({
        message: 'Deal created.',
        data: data
      });
    })
    .catch(() => {
      res.status(400).json({message: 'Invalid data.'})
    })
  }else{
    res.status(401).json({
      message: 'You need to login.'
    })
  }

});

// [UPDATE] a deal
router.post('/:deal_id/update', function(req, res) {

   const {name, description, quantity_available, current_price, image_path } = req.body;

  //  .where({ id: 2 })
  //  .update({ name: 'Homer' })

  knex
    .select('*')
    .from('deals')
    .where({id: req.params.deal_id})
    .update({ name, description, quantity_available, current_price, image_path } )
    .then( function() {
      res.status(200).json()
    }).catch(() => {
      res.status(400).json({
        message: 'opps try again'
      })
    })

});

// [DELETE] a deal
router.post('/:deal_id/delete', function(req, res) {
  
  knex
    .select('*')
    .from('deals')
    .where({id: req.params.deal_id})
    .del()
    .then( function() {
      res.redirect('/');
    });

});

module.exports = router;