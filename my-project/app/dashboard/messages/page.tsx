import { ChatLayout } from "@/component/chat/ChatLayout"; // Pastikan path import ini benar

export default function MessagesPage() {
  // Dapatkan objek user yang sedang login dari sesi atau auth provider Anda
  // Di sini kita buat contoh objeknya
  const currentUser = {
    id: "user-123", // INI HANYA CONTOH, GANTI DENGAN DATA ASLI
    name: "Nabil Robbani", // Ganti dengan nama user asli
    // Anda bisa tambahkan properti lain jika ada, misal: avatarUrl
  };

  return (
    <div className="container mx-auto py-8">
      {/* PERBAIKAN: Kirim prop 'currentUser' dengan tipe object, 
        bukan 'currentUserId' dengan tipe string.
      */}
      <ChatLayout currentUser={currentUser} />
    </div>
  );
}