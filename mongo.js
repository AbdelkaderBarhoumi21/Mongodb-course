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
