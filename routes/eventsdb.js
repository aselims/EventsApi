/**
 * Created by aselims on 1/14/14.
 */

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var DbName = 'EventsDb';

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db(DbName, server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to " + DbName + " database");
        db.collection(['events', 'users'], {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'events' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.addOneEvent = function(req, res) {
    var OneEvent = req.body;
    console.log('Adding Event: ' + JSON.stringify(OneEvent));
    db.collection('events', function(err, collection) {
        collection.insert(OneEvent, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.findAll = function(req, res) {
    db.collection('events', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findOneEvent = function(req, res){
    var id = req.params.id;
    db.collection('events', function(err, collection){
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });

};

exports.updateEvent = function(req, res) {
    var id = req.params.id;
    var event = req.body;
    delete event._id;
    console.log('Updating event: ' + id);
    console.log(JSON.stringify(event));
    db.collection('events', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, event, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating event: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(event);
            }
        });
    });
}

exports.deleteEvent = function(req, res) {
    var id = req.params.id;
    console.log('Deleting event: ' + id);
    db.collection('events', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var events = [
        {
            Title: "youcon",
            Description: "A conference for young people",
            Date: '10.2.15',
            Address: 'Osloerstr. 121, Berlin',
            TimeOfCreation: new Date(),
            User: "Selim"
        },
        {
            name: "CHATEAU DE SAINT COSME",
            year: "2009",
            grapes: "Grenache / Syrah",
            country: "France",
            region: "Southern Rhone",
            description: "The aromas of fruit and spice give one a hint of the light drinkability of this lovely event, which makes an excellent complement to fish dishes.",
            picture: "saint_cosme.jpg"
        },
        {
            name: "LAN RIOJA CRIANZA",
            year: "2006",
            grapes: "Tempranillo",
            country: "Spain",
            region: "Rioja",
            description: "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert event market. Light and bouncy, with a hint of black truffle, this event will not fail to tickle the taste buds.",
            picture: "lan_rioja.jpg"
        },
        {
            name: "MARGERUM SYBARITE",
            year: "2010",
            grapes: "Sauvignon Blanc",
            country: "USA",
            region: "California Central Cosat",
            description: "The cache of a fine Cabernet in ones event cellar can now be replaced with a childishly playful event bubbling over with tempting tastes of black cherry and licorice. This is a taste sure to transport you back in time.",
            picture: "margerum.jpg"
        },
        {
            name: "OWEN ROE \"EX UMBRIS\"",
            year: "2009",
            grapes: "Syrah",
            country: "USA",
            region: "Washington",
            description: "A one-two punch of black pepper and jalapeno will send your senses reeling, as the orange essence snaps you back to reality. Don't miss this award-winning taste sensation.",
            picture: "ex_umbris.jpg"
        },
        {
            name: "REX HILL",
            year: "2009",
            grapes: "Pinot Noir",
            country: "USA",
            region: "Oregon",
            description: "One cannot doubt that this will be the event served at the Hollywood award shows, because it has undeniable star power. Be the first to catch the debut that everyone will be talking about tomorrow.",
            picture: "rex_hill.jpg"
        },
        {
            name: "VITICCIO CLASSICO RISERVA",
            year: "2007",
            grapes: "Sangiovese Merlot",
            country: "Italy",
            region: "Tuscany",
            description: "Though soft and rounded in texture, the body of this event is full and rich and oh-so-appealing. This delivery is even more impressive when one takes note of the tender tannins that leave the taste buds wholly satisfied.",
            picture: "viticcio.jpg"
        },
        {
            name: "CHATEAU LE DOYENNE",
            year: "2005",
            grapes: "Merlot",
            country: "France",
            region: "Bordeaux",
            description: "Though dense and chewy, this event does not overpower with its finely balanced depth and structure. It is a truly luxurious experience for the senses.",
            picture: "le_doyenne.jpg"
        },
        {
            name: "DOMAINE DU BOUSCAT",
            year: "2009",
            grapes: "Merlot",
            country: "France",
            region: "Bordeaux",
            description: "The light golden color of this event belies the bright flavor it holds. A true summer event, it begs for a picnic lunch in a sun-soaked vineyard.",
            picture: "bouscat.jpg"
        }
   ];

    db.collection('events', function(err, collection) {
        collection.insert(events, {safe:true}, function(err, result) {});
    });

};


