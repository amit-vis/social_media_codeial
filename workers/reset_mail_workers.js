const resetmailer = require('../mailers/reset_mailer');
const queue = require('../config/kue');

queue.process('reset', function(job, done){
    console.log('emails workers procedssing a job', job.data);

    resetmailer.newMail(job.data);

    done();
});