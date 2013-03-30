var sendgrid = require('sendgrid'),
  env = process.env,
  client = new sendgrid.SendGrid(env.SENDGRID_USERNAME, env.SENDGRID_PASSWORD);

exports.send = function(body, callback) {
  var msg = makeMessage(body),
    html = msg.replace(/\r?\n/g, '<br />');

  client.send({
    to: 'info@feten.com.ar',
    toname: 'Feten',
    from: body.email,
    fromname: body.name,
    replyto: body.email,
    subject: 'Contacto Feten - ' + body.subject,
    text: msg,
    html: html
  }, function(success, message) {
    if (!success)
      console.log('sendgrid::' + message);
    callback(success);
  });
};

function makeMessage(body) {
  return [body.name, body.tel, '', body.message].join('\n');
};