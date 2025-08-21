import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';
// import { getServerSession } from "next-auth/next" // Contoh jika pakai NextAuth.js
// import { authOptions } from "@/lib/auth" // Contoh jika pakai NextAuth.js

// Inisialisasi Pusher di sisi server dengan kredensial rahasia Anda
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

// Fungsi ini adalah placeholder. Ganti dengan logika autentikasi Anda
// untuk mendapatkan user yang sedang login dari sesi atau token.
async function getCurrentUser(req: NextRequest) {
  // --- CONTOH LOGIKA JIKA MENGGUNAKAN NEXTAUTH.JS ---
  // const session = await getServerSession(authOptions);
  // if (!session?.user) {
  //   return null;
  // }
  // return session.user;

  // --- CONTOH LOGIKA JIKA MENGGUNAKAN TOKEN DARI HEADER ---
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    // Lakukan verifikasi token di sini jika perlu
    return null;
  }
  
  // Untuk sekarang, kita gunakan user tiruan.
  // PENTING: Anda HARUS mengganti ini dengan verifikasi sesi/token asli.
  return { id: 'user-123' }; 
}


export async function POST(req: NextRequest) {
  const user = await getCurrentUser(req);

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();
  const socketId = formData.get('socket_id') as string;
  const channel = formData.get('channel_name') as string;

  // Data yang akan dikirim kembali ke klien Pusher setelah autentikasi
  const userData = {
    user_id: user.id,
    // Anda bisa menambahkan info lain di sini, misal nama atau email
    // user_info: { name: user.name, email: user.email }, 
  };
  
  try {
    // Otorisasi channel privat
    const authResponse = pusher.authorizeChannel(socketId, channel, userData);
    return NextResponse.json(authResponse);
  } catch (error) {
    console.error("Pusher auth error:", error);
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
}