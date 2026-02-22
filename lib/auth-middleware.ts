import { cookies } from 'next/headers';

export async function getAdminSession() {
  const cookieStore = await cookies();
  const adminId = cookieStore.get('admin_id')?.value;
  const adminEmail = cookieStore.get('admin_email')?.value;

  if (adminId && adminEmail) {
    return { id: adminId, email: adminEmail };
  }
  return null;
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}
