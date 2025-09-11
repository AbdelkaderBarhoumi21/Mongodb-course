db.users.insertMany([
    {
    name:"amani",
    gender:'female'},
{name:'wajdi',age:28},
{name:'alice',age:54,gender:'female'}
])
db.users.find()
db.users.findOne() // return the first doc 
db.users.find({gender:'male'}) // filter object =>{gender:'male'} =>doc :return all doc gender is male
db.users.findOne({gender:'male'}) 
db.users.find({gender:'male',age:28})
db.users.find({gender:'male'},{___id: false,age: 0})//exelcude fields using projecting field mecanisme by use 0 or false true or 1
//true mean include - false exclude 
db.users.find().pretty() // fetch result in pretty way only used in find not findOne
db.users.findOne({___id:100})
//update one will update alwast one doc or in case of multi doc it will update the first one 
db.users.updateOne({___id:100},{$set:{gender:'female',name:'alex'}}) // 1st arg is filter and 2nd arg is fields to update 
db.users.updateMany({name:'alex'},{$set:{age:25}}) // update many doc if match with name is alex
db.users.updateOne({name:'amani'},{$set:{age:25}}) // if field not exsits like age it will be created when use update 
db.users.updateMany({name:'alex'},{$set:{city:'Tunisia'}}) //  city not exsit in doc so it will be created
db.users.updateMany({name:'alex'},{city:'Tunisia'}) //without usig $set it will return error need atomic operator which is $set
//replace all doc inseated of update fields 
db.users.replaceOne({name:'alex'},{city:'Tunisia',counrty:'Africa'})//replace the 1st(ReplaceOne) exiting doc with new doc and object__id still the same 
db.users.deleteOne({___id:100}) // delete doc with __id 100 if there more then one doc with __id 100 it will delete the 1st doc
db.users.deleteOne({})//delete the very 1st doc when dont pass filter arg 
db.users.deleteOne()//filter object is mandatory if dont pass it will get error 
db.users.deleteMany({gender:'female'}) // delete all doc with gender is female 
db.users.deleteMany({})//without passig filter arg it will delete all doc from users collections 
//we have 46 doc and find() return a pointer to set of doc we call cursor 
//find dont return a list of doc but a set of doc for example 46 doc it will return a set of 20 doc 
//use it to return the next cursor and the same way 
//cursor pointer to set of doc -- default size of cursor is 20 doc 
it //return the next cursor 
//using toArray() method we dont have to call it to return next curosr
//using toArray() will auto request to next cursor and then make request to the next and it will iterate to all set doc at the end will have all doc 
//because in php or js we dont have it pointer 
//node js toArray()
//php to_array()
db.users.find().toArray()
//forEach work same as toArray() and we can transfrom each doc instead of return all doc 
//function applly transformation logic to each doc 
db.users.find().forEach(function(user){
    print('user name: '+ user.name)
})
db.users.find().pretty()//pretty method can only be called to a cursor but findOne return a single doc not a cursor 
//data tye in BSON
db.users.insertOne({   
    name :"John",
    age:28,
    isAdmin:true,
    dob: new Date(),
    createAt :new Timestamp(),
    address:null,
    gender:undefined
})
/*
[
  {
    _id: ObjectId('68bd978eebcc2c6fbf7351cb'),
    name: 'John',
    age: 28,
    isAdmin: true,
    dob: ISODate('2025-09-07T14:32:46.000Z'),
    createAt: Timestamp({ t: 1757255566, i: 1 }),
    address: null,
    gender: null
  }
]
*/
//embedded doc 
db.users.insertMany([{
    "name": "John Doe",
    "age": 32,
    "is_active": true,
    "subscription_type": {
      "type": "monthly",
      "renewal_date": { "day": 15, "month": 11, "year": 2024 }
    },
    "address": ["New York", "USA"],
    "purchases": [
      { "product_name": "iPhone 15", "brand": "Apple" },
      { "product_name": "MacBook Air", "brand": "Apple" }
    ]
  },
])
db.users.find({address :'USA'}) // mongo is smart it know that USA is an element in array 
db.users.updateOne({name: 'John Doe'},{$set :{address :['Tunisia','Africa']}})
db.users.find({"purchases.brand" : 'Apple'}) // " " is mandtory when access obejct using x.y 
db.users.find({address :{$in:["USA","UK"]}}) // filter all doc with USA or UK =>
db.users.find({address :{$nin:["USA","UK"]}}) // filter all doc doesnot contain with USA or UK => nin  :not in 
db.users.find({address :{$all:["London","UK"]}}) //search address which conatin USA and Uk in any doc 
//embedded doc = nested doc 
db.users.find({"subscription_type.type":"yearly"}) 
db.users.find({_id:ObjectId('68bd997aebcc2c6fbf7351cc')})
db.users.updateOne({_id:ObjectId('68bd997aebcc2c6fbf7351cc')
},{$set:{'subscription_type.type':'yearly'}})
db.users.updateOne({_id:ObjectId('68bd997aebcc2c6fbf7351cc')
},{$set:{'subscription_type.renewal_date.year':'2026'}})
//acces value of nested doc
db.users.findOne({_id:ObjectId('68bd997aebcc2c6fbf7351cc')}).subscription_type.renewal_date.year
//Data Modeling - collection Relation 
//--------Product collection and User Collection Relation embedded doc and ref apporach 
// we have user product and orders collection 
//order collection has field customer _id ref to user id 
//order collection has fields products array ref to products id 
db.orders.findOne({_id: ObjectId('68c00de2891f109767450e8a')})
//return 
/*
{
  _id: ObjectId('68c00de2891f109767450e8a'),
  order_date: '2023-11-15',
  customer_id: ObjectId('68bd997aebcc2c6fbf7351cc'),
  products: [
    ObjectId('68c00b23891f109767450e6c'),
    ObjectId('68c00b23891f109767450e6d'),
    ObjectId('68c00b23891f109767450e6f')
  ]
}
*/
//join 2 collection to query orders with users details 
db.orders.aggregate(
  {$lookup:
    {
      from:'users',
      'localField':'customer_id',
      'foreignField':'_id',
      as :'customer_info'
    }
  }
  )//return same collection + alisses named customer_info with array of users details 
// we have for product an array of product so in lookup we dont have single doc we have a list of doc 
//we passed array because products will return products details as list of product
db.orders.aggregate(
[  {$lookup:
    {
      from:'products',
      'localField':'products',
      'foreignField':'_id',
      as :'customer_products'
    }
  }
]
)
//schema approach
//already users collection has other doc with different field then this one 
db.users.insertOne({name:'John',age:28,gender:'male'})
db.users.insertOne({title:'Rust',price:2800,color:'Red'}) 
//we can insert info for users that doesnt match and 2 doc has different structure because we can insert doc with differnet data 
//thats why we need schema in our collection 

//we can define of collection when creater a collection newer
//2end arg in optional like create 
//insert in collection a doc which is an object type of schema 'object'
//required :['name','email','address'] required field for each doc in this colection
//proprites specifiy what type of data this field will store
db.createCollection('users',{validator:{
  $jsonSchema:{
    bsonType:'object',
    required :['name','email','address'],
    properites:{
      name:{ 
      bsonType:'string',      
      //show error msg if store other type then string
      description:'Name is a required text field with string value'
      },
      email:{ 
      bsonType:'string',      
      //show error msg if store other type then string
      description:'email is a required text field with string value'
      },
      //address store an embedded doc an object (doc)
      address:{ 
      bsonType:'object',      
      //show error msg if store other type then string
      description:'address is a required text field with string value',
      //specifiy what field type in embedded doc 
      properites:{
        street:{
            bsonType:'string',      
           //show error msg if store other type then string
           description:'street is a required text field with string value'
        },
        city:{
            bsonType:'string',      
           //show error msg if store other type then string
           description:'city is a required text field with string value'
        },
        counrty:{
            bsonType:'string',      
           //show error msg if store other type then string
           description:'counrty is a required text field with string value'
        },
      }
      },
      //gender field will not be required 
      gender:{
          bsonType:'string'

      }
    },
    

  }
}
}
)

//check if schema is respected we dont insert required filed which address
db.users.insertOne({name:'abdelkader',email:'mail@gmail.com',gender:'male'})
//we add address field required but type of name which must be string we change to int 
db.users.insertOne({name:23,email:'mail@gmail.com',address:{street:'tunis',city:'Ariana',counrty:'africa'},gender:'male'})
//without an error know it will be success
db.users.insertOne({name:'abdelkader',email:'mail@gmail.com',address:{street:'tunis',city:'Ariana',counrty:'africa'},gender:'male'})
//insert field that not defined it will be created that mean we can insert field that its not in the schema 
db.users.insertOne({name:'abdelkader',email:'mail@gmail.com',address:{street:'tunis',city:'Ariana',counrty:'africa'},gender:'male',age:28})
//make sure that only field in schema must be added additionalproprites : false 
db.createCollection('users',{validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'address'],
      properties: {
        name: { 
          bsonType: 'string',
          description: 'Name is a required text field with string value'
        },
        email: { 
          bsonType: 'string',
          description: 'Email is a required text field with string value'
        },
        address: { 
          bsonType: 'object',
          description: 'Address is a required object with string fields',
          properties: {
            street: {
              bsonType: 'string',
              description: 'Street is a required text field with string value'
            },
            city: {
              bsonType: 'string',
              description: 'City is a required text field with string value'
            },
            country: {
              bsonType: 'string',
              description: 'Country is a required text field with string value'
            }
          }
        },
        gender: {
          bsonType: 'string'
        }
      },
          additionalProperties:false

    }
  }
}
)

//update a schema for example add additionalProperties to collection that doesnt have already
//update a schema for exsiting collection
//collMod => collection modifier
//additionalProperties = false mean not abble to add fields not allowed in schema

db.runCommand({collMod:'users',  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'address'],
      properties: {
        name: { 
          bsonType: 'string',
          description: 'Name is a required text field with string value'
        },
        email: { 
          bsonType: 'string',
          description: 'Email is a required text field with string value'
        },
        address: { 
          bsonType: 'object',
          description: 'Address is a required object with string fields',
          properties: {
            street: {
              bsonType: 'string',
              description: 'Street is a required text field with string value'
            },
            city: {
              bsonType: 'string',
              description: 'City is a required text field with string value'
            },
            country: {
              bsonType: 'string',
              description: 'Country is a required text field with string value'
            }
          }
        },
        gender: {
          bsonType: 'string'
        }
      },
          additionalProperties:false

    }
  }

})

//insert which field price age title not allowed in schema => error because additionalProperties:false but alsow in the error _id its not allowed 
db.users.insertOne({name:'gad',email:'maiggl@gmail.com',address:{street:'tunis',city:'Ariana',counrty:'africa'},gender:'male',age:28,title:"js",price:'299'})
// error because _id alsow its not allowed so specifiy _id in schema 
db.users.insertOne({name:'gad',email:'maiggl@gmail.com',address:{street:'tunis',city:'Ariana',counrty:'africa'},gender:'male'})
//add _id to schema as objectId
db.runCommand({collMod:'users',  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'address'],
      properties: {
        _id:{bsonType:'objectId'},
        name: { 
          bsonType: 'string',
          description: 'Name is a required text field with string value'
        },
        email: { 
          bsonType: 'string',
          description: 'Email is a required text field with string value'
        },
        address: { 
          bsonType: 'object',
          description: 'Address is a required object with string fields',
          properties: {
            street: {
              bsonType: 'string',
              description: 'Street is a required text field with string value'
            },
            city: {
              bsonType: 'string',
              description: 'City is a required text field with string value'
            },
            country: {
              bsonType: 'string',
              description: 'Country is a required text field with string value'
            }
          }
        },
        gender: {
          bsonType: 'string'
        }
      },
          additionalProperties:false,

    }
  }
  ,   
  // validationLevel:'moderate',
  // validationAction:'warn',

})
//now it success after add _id to shcema as objectid
db.users.insertOne({name:'gad',email:'maiggl@gmail.com',address:{street:'tunis',city:'Ariana',counrty:'africa'},gender:'male'})
//set validation level and validation action 
//even data invalid warn will only show warn 
//if error it will threw error and insert update will not happen


db.runCommand({collMod:'users',  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'address'],
      properties: {
        _id:{bsonType:'objectId'},
        name: { 
          bsonType: 'string',
          description: 'Name is a required text field with string value'
        },
        email: { 
          bsonType: 'string',
          description: 'Email is a required text field with string value'
        },
        address: { 
          bsonType: 'object',
          description: 'Address is a required object with string fields',
          properties: {
            street: {
              bsonType: 'string',
              description: 'Street is a required text field with string value'
            },
            city: {
              bsonType: 'string',
              description: 'City is a required text field with string value'
            },
            country: {
              bsonType: 'string',
              description: 'Country is a required text field with string value'
            }
          }
        },
        gender: {
          bsonType: 'string'
        }
      },
          additionalProperties:false

    }
  },
   validationLevel:'moderate',
  validationAction:'warn',

})
//only update action level and action becasue we havent modifiy our fields 
//data will inserted and warn msg will be stored in log file 
db.runCommand
(
{
  collMod:'users',  
   validationLevel:'strict',
  validationAction:'warn',
}
)
//if error insert-update will not happen
db.runCommand
(
{
  collMod:'users',  
   validationLevel:'strict',
  validationAction:'error',
}
)
//ordre insertion 
db.countries.insertMany(
  [{_id:'TN',name:'Tunisia'},
  {_id:'ALG',name:'Algeria'},
  {_id:'LBY',name:'LIBIYA'}]
)
//it will return this 
/*
  acknowledged: true,
  insertedIds: {
    '0': 'TN',
    '1': 'ALG',
    '2': 'LBY'
  }
}
*/
//we already have doc with same id value will not allowed because id use to identifiyt each doc 
//error duplicate key in collection 
//but other doc Pk  will be inserted even return error and QR will not inserted b
//at TN line will throw error and panic because before QR there is an error in TN duplcaited key
db.countries.insertMany(
  [,
  {_id:'PK',name:'Päkistan'},
   {_id:'TN',name:'Tunisia'},
  {_id:'QR',name:'QATAR'}]
)
//only doc have error shouldnt be inserted pass 2nd arg ordered : false it will not do ordre insertion inorderd insertion
//only TN will not inserted because => duplacited key error 
db.countries.insertMany(
  [
  {_id:'BAN',name:'Bangladesh'},
   {_id:'TN',name:'Tunisia'},
  {_id:'IN',name:'INDIA'},],{ordered:false}
)
//write concern primary and secondary server 
//pass 2nd optional arg write concern => majority : all server or a number 0 1 2 ...

db.products.insertOne(
  {name:"redmi",price:899},
  {writeConcern:
    { w:1}
}
)
//w:0 we dont wait for acknowledged 
db.products.insertOne(
  {name:"redmi",price:899},
  {writeConcern:
    { w:0}
}
)
/*
That add tools for mongo db like import export json file 
But first add to environment path
Move to path where you have your json file in cmd cd path 
Then use -> mongo import filename.json -d database name -c collection name –jsonArray because our json file not single object but an array of json –drop => if that collection exists with other doc delete this collection and create again this collection with data in json file 
C:\Users\abdel\OneDrive\Documents\mongoDB Project>mongoimport products.json -d eShopping -c products --jsonArray --drop
*/
//comparsion operator 
db.products.find({ratings:8.2})
//$eq eqaul operator 
db.products.find({ratings: {$eq:8.2}})
//$ne=> all doc not eqaul to 8.2 ----- count() to get count of number of doc with this filtering
db.products.find({ratings: {$ne:8.2}}).count()
//$gt all doc greater then 8.2
db.products.find({ratings: {$gt:8.2}})
//$gte=> greather then equal to 8.2
db.products.find({ratings: {$gte:8.2}})
//$lt less then 8.2
db.products.find({ratings: {$lt:8.2}})
//$lt less then eqaul to 8.2
db.products.find({ratings: {$lte:8.2}})
//$in all prorducts is cateogry is mobile or laptop
db.products.find({category: {$in:['laptop','mobile']}})
//$nin all prorducts is cateogry is not contain mobile or laptop
db.products.find({category: {$nin:['laptop','mobile']}})
db.products.find({category: {$nin:['laptop','mobile']}}).count() // 15 doc doesnt contains laptop or mobile

///logical operator and nor xor not 
//or operator 
db.products.find({ $or:[{ratings:{$gte:9}},{category:'laptop'}]})
//nor operator 
db.products.find({ $nor:[{ratings:{$gte:9}},{category:'laptop'}]})
//not operator =>reverse result
db.products.find({price:{ $not:{$gte:199}}})
//and operator 
//and operator == db.products.find({ratings:{$gte:9}},{category:'laptop'})
db.products.find({ $and:[{ratings:{$gte:9}},{category:'laptop'}]})
//using 2 logical operator and 1 comparison operator
db.products.find({$and:[{price:{$gt:1500}},{$or:[{category :'mobile'},{category:'laptop'}]}]})
//element operator check doc fields
//check if price field exists in doc and return all doc with price field exists 
db.products.find({price:{$exists:true}}) //exits =>true
db.products.find({price:{$exists:false}}) //not exists  => false 
//$type operator => check if a field store a bson type then return doc match with this conditon
db.products.find({price:{$type:'number'}}) 
db.products.find({available:{$type:'string'}}) 
//Evaluation operator 
//$mod price/5=0 => all doc that price that divied by 5 reminder will be 0 
db.products.find({price:{$mod:[5,0]}}) 
//$regex all doc that name contains xbox 
db.products.find({name:{$regex:/Xbox/}})
//$regex all doc that name contains xbox /i make case insensitive uppercase or lowercase 
db.products.find({name:{$regex:/xbox/i}})
//$regex all doc that name start with xbox 
db.products.find({name:{$regex:/^xbox/i}})
//$regex all doc that name ends with xbox 
db.products.find({name:{$regex:/xbox$/i}})
//$expr
//if result subtraction is greater then 100 if return doc filter all doc match result >100
db.products.find({$expr:{
  $gt:
  [
    {$subtract:["$price","$discount"]},
    1000
  ]
}})