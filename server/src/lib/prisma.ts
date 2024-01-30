import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient().$extends({
  result: {
    post: {
      readTime: {
        needs: { content: true },
        compute: (post) => {
          const wordCount = post.content?.match(/\w+/g)?.length || 0;
          const WPM = 200;
          return Math.ceil(wordCount / WPM);
        },
      },
    },
  },
});
