const bcrypt = require('bcrypt');

const password = bcrypt.hashSync('password', 10);

module.exports = [
  {
    id: '136530bc-2d6b-4059-a978-ae49ed663156',
    firstName: 'Jon',
    lastName: 'Doe',
    email: 'jondoe@example.com',
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '089de619-981c-45ca-adec-0d814bac03a9',
    firstName: 'Emelita',
    lastName: 'Duncan',
    email: 'eduncan1@accuweather.com',
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1e6b1fea-7f07-4934-aa4e-960b6560a331',
    firstName: 'Ev',
    lastName: 'Wallington',
    email: 'ewallington2@flickr.com',
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '478beec0-361e-4caf-b506-7906ab763d7b',
    firstName: 'Briggs',
    lastName: 'Lorenzo',
    email: 'blorenzo3@so-net.ne.jp',
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
