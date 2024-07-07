const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");

const passport = require("passport");
app.use(passport.initialize());
const bcrypt = require("bcrypt");
const passportConfig = require("./passport-config");

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/api/v1/", (req, res) => {
  res.send("Hello World!");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://MVPOmega:10161416@mvpcluster.kvnexas.mongodb.net/?retryWrites=true&w=majority";
const { ObjectId } = require("mongodb");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Create a collection of documents
    const bookCollections = client.db("bookInvetory").collection("books");

    const userCollections = client.db("bookInvetory").collection("userModel");

    // const authorCollections = client.db("bookInvetory").collection("authors");
    const authorCollections = client.db("authorList").collection("authors");

    const reviewCollections = client.db("bookInvetory").collection("reviews");

    //Đăng ký tài khoản
    app.post("/api/v1/account/signup", async (req, res) => {
      try {
        const data = req.body;

        const existingUser = await userCollections.findOne({
          username: data.username,
        });
        if (existingUser) {
          return res
            .status(400)
            .json({ success: false, message: "user exists" });
        }

        // Băm mật khẩu trước khi lưu vào database
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        const result = await userCollections.insertOne(data);
        // console.log(result);
        //res.send(result);
        res.json({ userNickname: data.userNickname });
      } catch (e) {
        res
          .status(400)
          .json({ success: false, message: `data: ${data} is not valid` });
      }
    });

    //Passport
    // app.post(
    //   "/api/v1/account/signup",
    //   passport.authenticate("local", {
    //     successRedirect: "/",
    //     failureRedirect: "/signup",
    //     failureFlash: true,
    //   })
    // );
    //

    //Đăng nhập
    app.post("/api/v1/account/signin", async (req, res) => {
      const { username, password } = req.body;

      const user = await userCollections.findOne({ username: username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({
          success: false,
          message: "Tai khoan hoac mat khau khong dung",
        });
      }
      res.json({ userNickname: user.userNickname });
      //  res.redirect("/");
    });

    // app.post("/account/signup", async (req, res) => {
    //   const data = req.body;
    //   const result = await userCollections.insertOne(data);
    //   res.send(result);
    // });

    //Book sector
    // Insert a book to the db: post method
    app.post("/api/v1/upload-books", async (req, res) => {
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });

    // Get all books from the database
    // app.get("/all-books", async(req, res) => {
    //     const books = bookCollections.find();
    //     const result = await books.toArray();
    //     res.send(result);
    // });

    // Update a book data: patch or update methods
    app.patch("/api/v1/book/:id", async (req, res) => {
      const id = req.params.id;
      const updateBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...updateBookData,
        },
      };
      const options = { upsert: true };
      // Update
      const result = await bookCollections.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    //delete a book with id - HoangMinh
    app.delete("/api/v1/delete-book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await bookCollections.deleteOne(filter);
        res.send(result);
      } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Find by category
    // app.get("/all-books", async (req, res) => {
    //   let query = {};
    //   if (req.query && req.query.category) {
    //     query = { category: req.query.category };
    //   }
    //   const result = await bookCollections.find(query).toArray();
    //   res.send(result);
    // });

    app.get("/api/v1/all-books", async (req, res) => {
      try {
        let query = {};

        // Check if there's a category parameter in the query
        if (req.query && req.query.category) {
          query.category = req.query.category;
        }

        // Check if there's a title parameter in the query
        if (req.query && req.query.title) {
          query = {
            ...query,
            title: { $regex: new RegExp(req.query.title, "i") },
          };
        }

        const result = await bookCollections.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // To get single book data
    // app.get("/book/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const result = await bookCollections.findOne(filter);
    //   res.send(result);
    // });

    app.get("/api/v1/book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        // const result = await bookCollections.findOne(filter);
        const result = await bookCollections
          .aggregate([
            { $match: filter },
            {
              $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "bookId",
                as: "review",
              },
            },
          ])
          .toArray();
        console.log(result);
        res.send(result[0]);
      } catch (error) {
        console.error("Error fetching book by ID:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.get("/api/v1/BuyYourBook", (req, res) => {
      res.send("Welcome to the Shopping page!");
    });

    app.get("/api/v1/orderbook/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.findOne(filter);
      res.send(result);
    });

    // Lấy danh sách sách theo categories
    app.post("/api/v1/books-by-category", async (req, res) => {
      try {
        const { categories } = req.body;

        // Sử dụng $in để lấy các sách thuộc các categories được chỉ định
        const query = { category: { $in: categories } };

        const result = await bookCollections.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching books by category:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //Lấy danh sách sách theo title
    app.get("/api/v1/books-by-title/:title", async (req, res) => {
      try {
        const title = req.params.title;

        // Sử dụng $regex để tìm kiếm title dựa trên keyword
        const query = { bookTitle: { $regex: new RegExp(title, "i") } };
        const result = await bookCollections.find(query).toArray();

        res.send(result);
      } catch (error) {
        console.error("Error fetching books by title:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Author HMinh/TTuyen
    // Insert book author to db: post method
    app.post("/api/v1/create-author", async (req, res) => {
      const data = req.body;
      const result = await authorCollections.insertOne(data);
      res.send(result);
    });

    // Update author data: patch methods
    app.patch("/api/v1/author/:id", async (req, res) => {
      const id = req.params.id;
      const updateAuthor = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...updateAuthor,
        },
      };
      const options = { upsert: true };
      // Update
      const result = await authorCollections.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    //delete an author with id HoangMinh
    app.delete("/api/v1/delete-author/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await authorCollections.deleteOne(filter);
        res.send(result);
      } catch (error) {
        console.error("Error deleting author:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Get single author data
    app.get("/api/v1/author/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await authorCollections.findOne(filter);
      res.send(result);
    });

    // Get all authors from the database
    app.get("/api/v1/all-authors", async (req, res) => {
      const authors = authorCollections.find();
      const result = await authors.toArray();
      res.send(result);
    });

    //Review sector
    //add review
    // app.post("/add-review", async (req, res) => {
    //   const data = req.body;
    //   data.bookId = new ObjectId(data.bookId);
    //   const result = await reviewCollections.insertOne(data);
    //   res.send(result);
    // });

    app.post("/api/v1/add-review", async (req, res) => {
      try {
        const data = req.body;
        console.log(data);
        data.bookId = new ObjectId(data.bookId);
        const result = await reviewCollections.insertOne(data);
        res.send(result.ops[0]);
      } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/api/v1/reviews", async (req, res) => {
      try {
        const bookId = req.query.bookId;
        const review = await reviewCollections
          .find({ bookId: new ObjectId(bookId) })
          .toArray();
        res.json(review);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Get all review from the database
    // app.get("/reviews", async (req, res) => {
    //   const bookId = req.query.bookId;
    //   const review = reviewCollections.find({ bookId: new ObjectId(bookId) });
    //   const result = await review.toArray();
    //   res.send(result);
    // });

    // Update review data: patch methods
    app.patch("/api/v1/review/:id", async (req, res) => {
      const id = req.params.id;
      const updateReview = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...updateReview,
        },
      };
      const options = { upsert: true };
      // Update
      const result = await reviewCollections.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    //delete an review with id HoangMinh
    app.delete("/api/v1/delete-review/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await reviewCollections.deleteOne(filter);
        res.send(result);
      } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
