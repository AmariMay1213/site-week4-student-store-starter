## Unit Assignment: Student Store

Submitted by: Amari May

### Application Features

#### CORE FEATURES

- [X] **Database Creation**: Set up a Postgres database to store information about products and orders.
  - [X]  Use Prisma to define models for `products`, `orders`, and `order_items`.
  - [X]  **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of your `products`, `orders`, and `order_items` tables. 
- [X] **Products Model**
  - [X] Develop a products model to represent individual items available in the store. 
  - [X] This model should at minimum include the attributes:
    - [X] `id`
    - [X] `name`
    - [X] `description`
    - [X] `price` 
    - [X] `image_url`
    - [X] `category`
  - [X] Implement methods for CRUD operations on products.
  - [X] Ensure transaction handling such that when an product is deleted, any `order_items` that reference that product are also deleted. 
  - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of all attributes (table columns) in your Products Model.
- [X] **Orders Model**
  - [X] Develop a model to manage orders. 
  - [X] This model should at minimum include the attributes:
    - [X] `order_id`
    - [X] `customer_id`
    - [X] `total_price`
    - [X] `status`
    - [X] `created_at`
  - [X] Implement methods for CRUD operations on orders.
  - [X] Ensure transaction handling such that when an order is deleted, any `order_items` that reference that order are also deleted. 
  - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of all attributes (table columns) in your Order Model.

- [X] **Order Items Model**
  - [X] Develop a model to represent the items within an order. 
  - [X] This model should at minimum include the attributes:
    - [X] `order_item_id`
    - [X] `order_id`
    - [X] `product_id`
    - [X] `quantity`
    - [X] `price`
  - [X] Implement methods for fetching and creating order items.  
  - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Prisma Studio to demonstrate the creation of all attributes (table columns) in your Order Items Model.
- [X] **API Endpoints**
  - [X] Application supports the following **Product Endpoints**:
    - [X] `GET /products`: Fetch a list of all products.
    - [X] `GET /products/:id`: Fetch details of a specific product by its ID.
    - [X] `POST /products`: Add a new product to the database.
    - [X] `PUT /products/:id`: Update the details of an existing product.
    - [X] `DELETE /products/:id`: Remove a product from the database.
  - [X] Application supports the following **Order Endpoints**:
    - [X] `GET /orders`: Fetch a list of all orders.
    - [X] `GET /orders/:order_id`: Fetch details of a specific order by its ID, including the order items.
    - [X] `POST /orders`: Create a new order with specified order items.
    - [X] `PUT /orders/:order_id`: Update the details of an existing order (e.g., change status).
    - [X] `DELETE /orders/:order_id`: Remove an order from the database.
    - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use Postman or another API testing tool to demonstrate the successful implementation of each endpoint. For the `DELETE` endpoints, please use Prisma Studio to demonstrate that any relevant order items have been deleted. 
- [X] **Frontend Integration**
  - [X] Connect the backend API to the provided frontend interface, ensuring dynamic interaction for product browsing, cart management, and order placement. Adjust the frontend as necessary to work with your API.
  - [X] Ensure the home page displays products contained in the product table.
  - [X] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: Use `npm start` to run your server and display your website in your browser. 
    - [X] Demonstrate that users can successfully add items to their shopping cart, delete items from their shopping cart, and place an order
    - [X] After placing an order use Postman or Prisma Studio demonstrate that a corresponding order has been created in your orders table.

### Stretch Features

- [X] **Added Endpoints**
  - [X] `GET /order-items`: Create an endpoint for fetching all order items in the database.
  - [X] `POST /orders/:order_id/items` Create an endpoint that adds a new order item to an existing order. 
- [ ] **Past Orders Page**
  - [ ] Build a page in the UI that displays the list of all past orders.
  - [ ] The page lists all past orders for the user, including relevant information such as:
    - [ ] Order ID
    - [ ] Date
    - [ ] Total cost
    - [ ] Order status.
  - [ ] The user should be able to click on any individual order to take them to a separate page detailing the transaction.
  - [ ] The individual transaction page provides comprehensive information about the transaction, including:
    - [ ] List of order items
    - [ ] Order item quantities
    - [ ] Individual order item costs
    - [ ] Total order cost
- [ ] **Filter Orders**.
  - [ ] Create an input on the Past Orders page of the frontend application that allows the user to filter orders by the email of the person who placed the order. 
  - [ ] Users can type in an email and click a button to filter the orders.
  - [ ] Upon entering an email address adn submitting the input, the list of orders is filtered to only show orders placed by the user with the provided email. 
  - [ ] The user can easily navigate back to the full list of ordres after filtering. 
    - [ ] Proper error handling is implemented, such as displaying "no orders found" when an invalid email is porvided.
- [ ] **Deployment**
  - [ ] Website is deployed using [Render](https://courses.codepath.org/snippets/site/render_deployment_guide).
  - [ ] **VIDEO WALKTHROUGH SPECIAL INSTRUCTIONS**: To ease the grading process, please use the deployed version of your website in your walkthrough with the URL visible. 



### Walkthrough Video

<div class="sp-embed-player" data-id="cT1OflnXPSf"><script src="https://go.screenpal.com/player/appearance/cT1OflnXPSf"></script><iframe width="100%" height="100%" style="border:0;" scrolling="no" src="https://go.screenpal.com/player/cT1OflnXPSf?width=100%&height=100%&ff=1&title=0" allowfullscreen="true"></iframe></div>

https://go.screenpal.com/watch/cT1OflnXPSf



### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

I think lab 2 and three did a great job of introducing me to understand how to interact with and connect the backend and the database, lab three especially helped me complete milestone 0 and 1 for this project. I was given a good base for my CRUD logic in order to edit my database. 

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time I definetly would not solely follow the milestones, following them served as a large blocker for me since the requirements section and the milestones had different instructions and rules. So I spent some of my worktime just going back and fixing some of my code line by line in order to align with the correct instructions in order to hit all the required features. I would also focus on design, I had little time to do stretch features since I felt a little burnt out after all the running around with the different instructions so I had little time to enjoy playing around in css and completing other stretch features such as filtering by email and creating an old orders page. 

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

What went well was bouncing between the front end web page to displaying it communicating with the back end through showing how the data base has been updated via postman and prisma. When recording the video for the demo I didn't expect to need so much time to show all the appropriate features working so I had to use a new website other than loom to record my demo. One thing I noticed my peers did for their demo that I'd like to do is they had the data that they wanted to post in postman already prepared while I wrote it in while doing the demo. 

### Open-source libraries used

- chatgpt
- https://github.com/dst2609/ftl-code-demo-2025/tree/main/week4/FullStackPokemonApp

### Shout out

- Devarsh
- Jasmine
- Janine
- Jessica
- Joshua
- Josh
- Alex
- Keith
- Luccia



