import Agenda from 'agenda';

const agenda = new Agenda({db: {address: `${process.env.DATABASE_URL}`}, processEvery: '1 days'});

agenda.on('ready', function() {
    agenda.start();
});

// Define your jobs
agenda.define('send email', function(job, done) {
    // Add your email-sending logic here
  });

export default agenda