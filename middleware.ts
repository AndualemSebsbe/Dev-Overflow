import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes : [
        '/',
        '/api/webhook',
        '/question/:id',
        '/tags',
        '/tags/:id',
        '/profile',
        '/profile/:id',
        '/community',
        '/jobs'
    ],

    ignoredRoutes : [
        '/api/webhook',
        '/api/chatgpt',
        '/profile'
    ]
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 