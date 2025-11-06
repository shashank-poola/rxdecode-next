import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const createOrUpdateUser = async (userData: {
  id: string;
  email: string;
  name: string;
  imageUrl?: string;
  emailVerified?: boolean;
}) => {
  try {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        name: userData.name,
        imageUrl: userData.imageUrl,
        emailVerifiedAt: userData.emailVerified ? new Date() : null,
        updatedAt: new Date(),
      },
      create: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        imageUrl: userData.imageUrl,
        emailVerifiedAt: userData.emailVerified ? new Date() : null,
      },
    });
    return user;
  } catch (error) {
    console.error('Error creating/updating user:', error);
    throw error;
  }
};

export const createAccount = async (accountData: {
  userId: string;
  provider: string;
  providerAccountId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
}) => {
  try {
    const account = await prisma.account.create({
      data: {
        user: {
          connect: { id: accountData.userId }
        },
        provider: accountData.provider,
        providerAccountId: accountData.providerAccountId,
        type: 'oauth',
        accessToken: accountData.accessToken,
        refreshToken: accountData.refreshToken,
        expiresAt: accountData.expiresAt,
      },
    });
    return account;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        accounts: true,
      },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createUserWithPassword = async (userData: {
  name: string;
  email: string;
  hashedPassword: string;
}) => {
  try {
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  } catch (error) {
    console.error('Error creating user with password:', error);
    throw error;
  }
};

export const verifyUserPassword = async (email: string, hashedPassword: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user || !user.hashedPassword) {
      return null;
    }
    
    // In a real app, you'd use bcrypt.compare() here
    // For now, we'll just check if passwords match (not secure!)
    if (user.hashedPassword === hashedPassword) {
      return user;
    }
    
    return null;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
};

export default prisma;
