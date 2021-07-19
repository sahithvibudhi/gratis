import { Session } from 'express-session'

declare module 'express-session' {
    interface Session {
        username: string;
    }
}
