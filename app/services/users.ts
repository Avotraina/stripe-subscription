import prisma from "../lib/db";

export function generateInitials(name: string) {
  return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
}


export function generateFallbackBackground(name: string): string {
  let hash = 0;
  let i;

  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}


export const findUserFromCustomerId = async (stripeCustomerId: unknown) => {

  if (typeof stripeCustomerId !== "string") {
    return null;
  }

  return prisma.user.findFirst({
    where: {
      stripeCustomerId,
    }
  });
}

export const findUserByEmail = async (email: string) => {

  return prisma.user.findFirst({
    where: {
      email,
    }
  });
}