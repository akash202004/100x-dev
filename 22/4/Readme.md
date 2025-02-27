# **Normalization**

Normalization is the process of removing redundancy in your database.

## Redundancy

Redundant data means data that already exists elsewhere and we’re duplicating it in two places

For example, if you have two tables

1. users
2. user_metadata

where you do the following -

![img](./one.webp)

If you notice, we’ve stored the name on the order in the Orders table, when it is already present in the Users table. This is what is `redundant` data.

Notice this schema is still `full proof`. We can get all the orders given a user id. We can tell the users details (username, name) given an order id.

## Non full proof data

![img](./two.webp)

This data doesn’t have any relationship b/w Orders and users. This is just plain wrong. You can never tell the orders for a user (esp if 2 users can have the same name)

Normalisation is done on tables that are full proof to remove redundancy.
