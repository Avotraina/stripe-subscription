

import Agenda from 'agenda';
import prisma from '@/app/lib/db';

const agenda = new Agenda({ db: { address: `mongodb+srv://fakanagame:Ams6K9QFatzE8WQG@cluster0.weppf.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0` }, processEvery: '5 seconds' });
// Define your jobs
agenda.define('active article', async function (job, done) {

  const scheduled = await prisma.article.findFirst({
    where: {
      status: "scheduled"
    },
    orderBy: {
      createdAt: 'desc'
    },
  });

  if (scheduled) {
    await prisma.article.update({
      where: {
        id: scheduled?.id
      },
      data: {
        status: "active",
        updatedAt: new Date(),
      }
    });
  }

  done()

});

agenda.on('ready', async function () {
  await agenda.every('10 seconds', 'active article')
  await agenda.start();
})
