var express = require('express');
var moment = require('moment');
var Request = require("request");
var dateFormat = require('dateformat');
var router = express.Router();
var result,rr,jj=0;
var count = [],count1=0;
var mychoice;
var Itineary = require('../Database/models/Itineary')

var obj={ "TripType": "O", "NoOfAdults": 0, "NoOfChilds": 0, "NoOfInfants": 0, "ClassType": "Economy", "OriginDestination": [ { "Origin": "", "Destination": "", "TravelDate": "" } ], "Currency": "USD" };


router.post('/adding', function(req,res){
    req.session.traveld=req.body.ddate;
    var adl=(Number)(req.body.adultplus)+(Number)(req.body.adultminus);
    console.log(adl);
    if(adl>0){
        req.session.adlt=adl;
    }
    else{
        req.session.adlt=0;
    }
    var chl=(Number)(req.body.childplus)+(Number)(req.body.childminus);
    if(chl>0)
          req.session.chid=chl;
    else  
       req.session.chid=0;
console.log(chl);
    req.session.traveljstart=req.body.Destination;
   res.redirect('/flight');
});

router.get('/flight', function(req,res){

    Itineary.find({}, (err, itineary) => {
        mychoice=itineary;
        console.log('ye aaya database se data'+mychoice);
     
    obj.OriginDestination[0].TravelDate=dateFormat(req.session.traveld, "mm/dd/yyyy");
    obj.NoOfAdults=req.session.adlt;
    obj.NoOfChilds=req.session.chid;
    obj.OriginDestination[0].Origin=req.session.traveljstart;
    console.log('origin OF FIRST DAY'+obj.OriginDestination[0].Origin);
    obj.OriginDestination[0].Destination=mychoice[0].flights.day1[1];
    console.log('destination OF FIRST DAY'+obj.OriginDestination[0].Destination);
    rr = mychoice[0].flights;

    for(var i=0;i<Object.keys(rr).length;i++){
        if(rr['day'+(i+1)]== null){
          jj=jj+1;
         }
         if(rr['day'+(i+1)]!= null){
          count[i-jj]=i+1;
          console.log(count[i-jj]);
          }
          }


        
if( obj.NoOfChilds>0 || obj.NoOfAdults>0){
    Request.post({
        "headers": { "mode":"sandbox","content-type": "application/json","apikey":"7e75db03-9b7d-4" },
        "url": "https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.3/search",
        "body": JSON.stringify(obj)
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        result=JSON.parse(body);
        console.dir(result);
      console.log('NOW RENEDERING THE PAGE 111111111111111111111111111111111111111111111111111111111111111111111111111111')
    res.render('ItinearyFlight',{ moment: moment ,
        tripdet: mychoice,
        allf: result.OneWayAvailabilityResponse.ItinearyDetails[0].Items
    });
 });
}
});    
});


router.get('/flightother', function (req, res) {
    var tomorrow = new Date(req.session.traveld);
    let a=(Number)(req.param('param'));
    console.log('value of para'+a);
    tomorrow.setDate(tomorrow.getDate() + a);
    obj.OriginDestination[0].TravelDate = dateFormat(tomorrow, "mm/dd/yyyy");
    console.log(obj.OriginDestination[0].TravelDate);
    obj.NoOfAdults = req.session.adlt;
    obj.NoOfChilds = req.session.chid;
  
    obj.OriginDestination.Origin=mychoice[0].flights['day'+a][0];
    console.log('origin OF OTHER DAYS'+obj.OriginDestination.Origin);
    if(a==5){
        obj.OriginDestination.Destination=req.session.traveljstart;
    }
    else{
    obj.OriginDestination.Destination=mychoice[0].flights['day'+a][1];
    }
    console.log('destination OF OTHER DAYS'+obj.OriginDestination.Destination);
    Request.post({
        "headers": { "mode": "sandbox", "content-type": "application/json", "apikey": "7e75db03-9b7d-4" },
        "url": "https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.3/search",
        "body": JSON.stringify(obj)
    }, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        result = JSON.parse(body);
        console.dir(result);

        res.render('ItinearyFlight', {
            moment: moment,
            tripdet: mychoice,
            allf: result.OneWayAvailabilityResponse.ItinearyDetails[0].Items
        });
    });
});

var look = { "TrackId": "$0c689a70-4210-4$xjAG2", "ItinearyDetails": { "Segments": [{ "ValidatingCarrier": "AA", "Price": "77", "item": [{ "FlightID": "6013", "FlightNum": "6013", "CarrierId": "AA", "AircraftType": "", "Origin": "SFO", "Destination": "LAX", "DepartureDateTime": "2018-04-23T14:30:00", "ArrivalDateTime": "2018-04-23T16:12:00", "ClassCode": "N", "EquipmentType": "E75", "OperatingCarrierId": "AA", "Meal": null, "OrgTerminal": "2", "DestTerminal": "5", "MajorClassCode": "Economy", "Baggage": " ", "Duration": "102", "ApiProvider": "SB", "MarriageGroup": "O", "IsStopAirport": false }] }] } };
router.get('/flightdetails', function (request, res) {
    const fruit = request.param('param1');
    var z = request.param('param2');
    console.log(z);

    look.TrackId = result.OneWayAvailabilityResponse.TrackId;
    console.log(look.TrackId);

    look.ItinearyDetails.Segments[0].ValidatingCarrier = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].ValidatingCarrier;
    look.ItinearyDetails.Segments[0].Price = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FareDescription.PaxFareDetails[0].OtherInfo.GrossAmount;
    look.ItinearyDetails.Segments[0].item[0].FlightID = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].FlightID;
    look.ItinearyDetails.Segments[0].item[0].FlightNum = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].FlightNum;
    look.ItinearyDetails.Segments[0].item[0].CarrierId = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].CarrierCode;
    look.ItinearyDetails.Segments[0].item[0].Origin = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].Origin;
    look.ItinearyDetails.Segments[0].item[0].Destination = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].Destination;
    look.ItinearyDetails.Segments[0].item[0].DepartureDateTime = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].DepartureDateTime;
    look.ItinearyDetails.Segments[0].item[0].ArrivalDateTime = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].ArrivalDateTime;
    look.ItinearyDetails.Segments[0].item[0].ClassCode = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].ClassCode;
    look.ItinearyDetails.Segments[0].item[0].EquipmentType = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].AirEquipType;
    look.ItinearyDetails.Segments[0].item[0].OperatingCarrierId = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].CarrierCode;
    look.ItinearyDetails.Segments[0].item[0].OrgTerminal = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].OrgTerminal;
    look.ItinearyDetails.Segments[0].item[0].DestTerminal = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].DestTerminal;
    look.ItinearyDetails.Segments[0].item[0].Duration = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].Duration;
    look.ItinearyDetails.Segments[0].item[0].ApiProvider = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].ApiProvider;
    look.ItinearyDetails.Segments[0].item[0].MarriageGroup = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].MarriageGroup;
    look.ItinearyDetails.Segments[0].item[0].IsStopAirport = result.OneWayAvailabilityResponse.ItinearyDetails[0].Items[z].FlightDetails[0].IsStopAirport;
    if (look.TrackId != null && look.ItinearyDetails.Segments[0].item[0].ApiProvider != null) {
        Request.post({
            "headers": { "mode": "sandbox", "content-type": "application/json", "apikey": "7e75db03-9b7d-4" },
            "url": " https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.1/look",
            "body": JSON.stringify(look)
        }, (error, response, body) => {
            if (error) {
                return console.dir(error);
            }
            result = JSON.parse(body);
            console.dir(result);
            
            switch (count1) {
                case 0 : request.session.data1 = result;
                    break;
                case 1 : request.session.data2 = result;
                    break;
                case 3 : request.session.data3 = result;
                break;
            }
             
            console.log(request.session.data1);
            count1++;
            var val='/flightother?param='+count[count1];
              console.log('yeh value thi be'+count[count1]);
             res.redirect(val)
        });
    }
    
});
module.exports=router;