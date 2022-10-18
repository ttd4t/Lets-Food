const userService = require('../services/authService');

class AuthController {
   handleCreateUser = async (req, res) => {
      try {
         const user = await userService.createUser(req.body);
         // return res.status(200).json(user);
         return res.render('sendMail', { user });
      } catch (e) {
         return res.render('dangKy', { message: e.message });
      }
   };

   handleVerifyUser = async (req, res) => {
      try {
         const response = await userService.verifyUser(req.body, req.params);
         // return res.status(200).json(user);
         if (response) {
            return res.redirect('/auth/getLoginLocal');
         } else {
            return res.render('otp', { message: response });
         }
      } catch (e) {
         return res.render('otp', { message: e.message });
      }
   };

   handleResendOTP = async (req, res) => {
      try {
         const user = await userService.resendOTP(req.params);
         // return res.status(200).json(user);
         return res.render('sendMail', { user });
      } catch (e) {
         return res.render('sendMail', { message: e.message });
      }
   };

   handleGetOTPPage = async (req, res) => {
      try {
         const user = await userService.getOTPPage(req.params);
         return res.render('otp', { user });
      } catch (e) {
         return res.render('otp', { message: e.message });
      }
   };
}

module.exports = new AuthController();
