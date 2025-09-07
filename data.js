db.users.insertMany([
  {
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
  {
    "name": "Alice Martin",
    "age": 27,
    "is_active": false,
    "subscription_type": {
      "type": "yearly",
      "renewal_date": { "day": 1, "month": 1, "year": 2025 }
    },
    "address": ["Paris", "France"],
    "purchases": [
      { "product_name": "Galaxy S23", "brand": "Samsung" }
    ]
  },
  {
    "name": "Mohamed Ali",
    "age": 40,
    "is_active": true,
    "subscription_type": {
      "type": "monthly",
      "renewal_date": { "day": 10, "month": 12, "year": 2024 }
    },
    "address": ["Cairo", "Egypt"],
    "purchases": [
      { "product_name": "Dell XPS 13", "brand": "Dell" }
    ]
  },
  {
    "name": "Emma Johnson",
    "age": 29,
    "is_active": true,
    "subscription_type": {
      "type": "weekly",
      "renewal_date": { "day": 7, "month": 9, "year": 2024 }
    },
    "address": ["London", "UK"],
    "purchases": [
      { "product_name": "PlayStation 5", "brand": "Sony" }
    ]
  },
  {
    "name": "Carlos Lopez",
    "age": 36,
    "is_active": false,
    "subscription_type": {
      "type": "yearly",
      "renewal_date": { "day": 20, "month": 8, "year": 2025 }
    },
    "address": ["Madrid", "Spain"],
    "purchases": [
      { "product_name": "iPad Pro", "brand": "Apple" }
    ]
  },
  {
    "name": "Sara Ahmed",
    "age": 22,
    "is_active": true,
    "subscription_type": {
      "type": "monthly",
      "renewal_date": { "day": 5, "month": 10, "year": 2024 }
    },
    "address": ["Dubai", "UAE"],
    "purchases": [
      { "product_name": "Surface Pro", "brand": "Microsoft" }
    ]
  },
  {
    "name": "David Brown",
    "age": 31,
    "is_active": false,
    "subscription_type": {
      "type": "yearly",
      "renewal_date": { "day": 18, "month": 3, "year": 2025 }
    },
    "address": ["Toronto", "Canada"],
    "purchases": [
      { "product_name": "Kindle Paperwhite", "brand": "Amazon" }
    ]
  },
  {
    "name": "Sophia Chen",
    "age": 26,
    "is_active": true,
    "subscription_type": {
      "type": "monthly",
      "renewal_date": { "day": 25, "month": 9, "year": 2024 }
    },
    "address": ["Beijing", "China"],
    "purchases": [
      { "product_name": "Mi 13 Ultra", "brand": "Xiaomi" }
    ]
  },
  {
    "name": "Lucas Rossi",
    "age": 34,
    "is_active": true,
    "subscription_type": {
      "type": "weekly",
      "renewal_date": { "day": 12, "month": 7, "year": 2024 }
    },
    "address": ["Rome", "Italy"],
    "purchases": [
      { "product_name": "Galaxy Watch 6", "brand": "Samsung" }
    ]
  },
  {
    "name": "Mia Wilson",
    "age": 28,
    "is_active": false,
    "subscription_type": {
      "type": "yearly",
      "renewal_date": { "day": 30, "month": 6, "year": 2025 }
    },
    "address": ["Sydney", "Australia"],
    "purchases": [
      { "product_name": "AirPods Pro", "brand": "Apple" }
    ]
  }
  // … Continue jusqu'à 25 docs
])
