module.exports = function (app) {
  const category = require('../controller/category');
  const product = require('../controller/product')
  const user = require('../controller/user')
  const bill = require('../controller/bill')
  const billProduct = require('../controller/billProduct')
  const comment = require('../controller/comment')
  const review = require('../controller/review')
  const coupon = require('../controller/coupon')
  const contact = require('../controller/contact');
  const multer = require('multer');

  var cors = require('cors')

  const auth = require('../middleware/auth')
  const authAdmin = require('../middleware/authAdmin')

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __basedir + "/resources/static/assets/uploads/");
    },
    filename: function (req, file, cb) {
      console.log(file.originalname);
      var typeImgae = (file.originalname).split('.')
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + typeImgae[1];
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 2 * 1024 * 1024
    },
    fileFilter: fileFilter
  });


  //cors
  const allowlist = ['http://localhost:3000', 'http://localhost:5000'];

  const corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    // let isDomainAllowed = allowlist.indexOf(req.header('Origin')) !== -1;
    let isDomainAllowed = allowlist.indexOf(req.header('Origin')) !== -1;
    let isExtensionAllowed = req.path.endsWith('.jpg');

    if (isDomainAllowed && isExtensionAllowed) {
      // Enable CORS for this request
      corsOptions = { origin: true }
    } else {
      // Disable CORS for this request
      corsOptions = { origin: false }
    }
    callback(null, corsOptions)
  }

  app.use(cors(corsOptionsDelegate));



  app.route('/open_image')
    .get(product.get_image)

  // Category
  app.route('/category')
    .get(category.get_all_category)
    .post(category.create_category);

  app.route('/category/:id')
    .put(category.update_category)
    .delete(category.delete_category)
    .get(category.get_a_category)

  //test goi theo ten
  app.route('/category/:name')
    .get(category.get_a_category_by_name)

  // Product
  app.route('/product')
    .post(upload.single('image'), product.create_product)
    .get(product.get_all_product)

  app.route('/product/:id')
    .put(upload.single('image'), product.update_product)
    .delete(product.delete_product)
    .get(product.get_a_product)

  app.route('/product/getbyname/:name')
    .get(product.get_a_product_by_name)

  app.route('/product/getbycate/:category')
    .get(product.get_list_product_by_cate)

  app.route('/product/updatewhenbuydone')
     .post(product.update_product_when_buy_done)



  // User
  app.route('/login-user')
    .post(user.login);

  app.route('/logout')
    .get(user.logout)

  app.route('/refresh_token')
    .get(user.refreshToken)

  app.route('/user')
    .get(user.get_all_user)
    .post(user.create_user);

  app.route('/user/:id')
    .put(user.update_user)
    .delete(user.delete_user)
    .get(user.get_a_user)

  app.route('/getuserbyusername')
     .post(user.get_a_user_by_username)

    app.route('/sendEmailtoUser')
       .post(user.sendEmail)

  // Bill
  app.route('/bill')
    .get(bill.get_all_bill)
    .post(bill.create_bill);

  app.route('/bill/:id')
    .post(bill.update_bill)
    .delete(bill.delete_bill)
    .get(bill.get_a_bill)

  app.route('/bill/getbillbyuser/:buyerId')
    .get(bill.get_a_bill_by_user)

  // BillProduct
  app.route('/billproduct')
    .get(billProduct.get_all_billProduct)
    .post(billProduct.create_billProduct);

  app.route('/billproduct/:id')
    .delete(billProduct.delete_billProduct)
    .get(billProduct.get_a_billProduct)

  app.route('/billproduct/getlistbybillid/:billId')
    .get(billProduct.get_list_billProduct_by_billId)

  //Coupon
  app.route('/coupon')
    .get(coupon.get_all_coupon)
    .post(coupon.create_coupon)

  app.route('/coupon/:id')
    .put(coupon.update_coupon)
    .delete(coupon.delete_coupon)
    .get(coupon.get_a_coupon_by_id)

  app.route('/coupon/getbycode/:code')
    .get(coupon.get_a_coupon_by_code)


  // Comment
  app.route('/comment')
    .get(comment.get_all_comment)
    .post(comment.create_comment);

  app.route('/comment/:id')
    .put(comment.update_comment)
    .delete(comment.delete_comment)
    .get(comment.get_a_comment)

  app.route('/comment/getbyproductId/:productId')
    .get(comment.get_list_comment_by_productId)

  // Review
  app.route('/review')
    .get(review.get_all_review)
    .post(review.create_review);

  app.route('/review/:id')
    .put(review.update_review)
    .delete(review.delete_review)
    .get(review.get_a_review)

    //Contact

    app.route('/contact')
    .post(contact.create_contact)
    .get(contact.get_all_contact)
}