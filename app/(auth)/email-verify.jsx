import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { verifyEmail } from '../../lib/appwrite';

const VerifyEmail = () => {
    const router = useRouter();
    const { userId, secret } = router.query;

    useEffect(() => {
        const verifyUser = async () => {
            try {
                await verifyEmail(userId, secret);
                // Email verified successfully, redirect to the login page or another route
                router.replace('/sign-in');
            } catch (error) {
                console.error('Error verifying email:', error);
                // Handle the error, show a message to the user
            }
        };
        if (userId && secret) {
            verifyUser();
        }
    }, [userId, secret]);

    return null; // or a loading spinner
};

export default VerifyEmail;
