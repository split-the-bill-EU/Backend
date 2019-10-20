require('dotenv').config();
const MailGen = require('mailgen');
export const mailGenerator = new MailGen({
  theme: 'salted',
  product: {
    name: process.env.APP_NAME,
    link: process.env.APP_LINK,
  }
});
