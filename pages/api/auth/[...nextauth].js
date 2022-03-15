import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: '475b61c947125182ca2c',
            clientSecret: 'c5c1fff50d367b849bf147148b7a80a91165971b',
            scope: 'read:user'
        })
    ]
});
