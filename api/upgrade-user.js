// api/upgrade-user.js
import { Clerk } from '@clerk/backend';

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, reference } = req.body;

  // 1. (Optional) Verify transaction with Paystack here for double security
  // For now, we assume the frontend sent a valid success signal.

  try {
    // 2. Update Clerk Metadata
    await clerk.users.updateUser(userId, {
      publicMetadata: {
        isPro: true, // This marks them as a paid user
        plan: 'growth',
        paymentRef: reference
      }
    });

    res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
}