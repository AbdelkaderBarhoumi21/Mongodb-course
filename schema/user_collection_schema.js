db.createCollection('users', {
  validator: {
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
      }
    }
  }
})
