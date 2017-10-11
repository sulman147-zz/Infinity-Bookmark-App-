import {Meteor} from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';

import '../imports/API/users';
import {Links} from '../imports/API/links';
import '../imports/startup/simple-schema-configration.js';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({_id});

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
});

//req come in
// run our middleware one ata time
//send them that page

// const petSchema =new SimpleSchema({
//     name: {
//       type:String ,
//       min:1,
//       max: 200,
//       optional:true
//     },
//     age: {
//       type: Number,
//       min:0
//     },
//     contactNunmber: {
//       type:String,
//       optional:true,
//       regEx:SimpleSchema.RegEx.Phone
//     }
//
// });
//
// petSchema.validate({
//   age:21,
//   contactNunmber:'1234'
// });
