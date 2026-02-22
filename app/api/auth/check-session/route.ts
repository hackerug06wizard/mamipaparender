import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const adminId = cookieStore.get('admin_id')?.value;
    const adminEmail = cookieStore.get('admin_email')?.value;

    if (adminId && adminEmail) {
      return NextResponse.json(
        { authenticated: true, admin: { id: adminId, email: adminEmail } },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { authenticated: false },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
