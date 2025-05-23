import{requireAuth,getAuth,clerkClient}from '@clerk/express'
import { ApiError } from '../utils/api-errors.js';

const isAdmin = (req, res, next) => {
    const userId = getAuth(req).userId;
    if (!userId) {
       return new ApiError(401, 'Unauthorized', [], 'User ID not found in request');
    }
    clerkClient.users.getUser(userId).then((user) => {
        if (!user) {
           return new ApiError(401, 'Unauthorized', [], 'User not found in Clerk');
        }
        const isAdmin = user.publicMetadata.isAdmin;
        if (!isAdmin) {
            return new ApiError(403, 'Forbidden', [], 'User is not an admin');  
        }
        next();
    }).catch((err) => {
        console.error(err);
       return new ApiError(500, 'Internal Server Error', [], 'Error retrieving user from Clerk');
    });
};

export default [requireAuth(), isAdmin];