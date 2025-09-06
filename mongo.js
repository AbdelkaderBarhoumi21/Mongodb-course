db.users.insertMany([
    {
    name:"amani",
    gender:'female'},
{name:'wajdi',age:28},
{name:'aljia',age:54,gender:'female'}
])
db.users.find()
db.users.findOne() // return the first doc 
db.users.find({gender:'male'}) // filter object =>{gender:'male'} =>doc :return all doc gender is male
db.users.findOne({gender:'male'}) 
db.users.find({gender:'male',age:28})
db.users.find({gender:'male'},{_id: false,age: 0})//exelcude fields using projecting field mecanisme by use 0 or false true or 1
//true mean include - false exclude 
db.users.find().pretty() // fetch result in pretty way only used in find not findOne
