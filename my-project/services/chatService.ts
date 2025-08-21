import axios from 'axios';
import { Conversation, Message } from '@/store/useChatStore';


const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);


interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

interface SendMessagePayload {
  content?: string;
  file?: File;
}

//================================================================
// 3. FUNGSI-FUNGSI LAYANAN CHAT
//================================================================

export const getConversations = async (): Promise<Conversation[]> => {
  try {
    const response = await apiClient.get<Conversation[]>('/candidate/applications');
    return response.data;
  } catch (error) {
    // PERBAIKAN: Gunakan variabel 'error'
    console.error("Error fetching conversations:", error);
    throw new Error('Gagal mengambil daftar percakapan.');
  }
};

export const getMessagesForConversation = async (
  conversationId: string,
  pageParam = 1
): Promise<PaginatedResponse<Message>> => {
  if (!conversationId) {
    throw new Error('ID percakapan dibutuhkan.');
  }
  try {
    const response = await apiClient.get<PaginatedResponse<Message>>(
      `/conversations/${conversationId}/messages`,
      {
        params: { page: pageParam },
      }
    );
    return response.data;
  } catch (error) {
    // PERBAIKAN: Gunakan variabel 'error'
    console.error(`Error fetching messages for conversation ${conversationId}:`, error);
    throw new Error('Gagal mengambil pesan.');
  }
};

export const sendMessage = async (
  conversationId: string,
  payload: SendMessagePayload
): Promise<Message> => {
  const { content, file } = payload;

  if (!content && !file) {
    throw new Error('Pesan harus berisi teks atau file.');
  }

  const formData = new FormData();
  if (content) {
    formData.append('content', content);
  }
  if (file) {
    formData.append('file', file);
  }

  try {
    const response = await apiClient.post<Message>(
      `/conversations/${conversationId}/messages`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    // PERBAIKAN: Gunakan variabel 'error'
    console.error(`Error sending message to conversation ${conversationId}:`, error);
    throw new Error('Gagal mengirim pesan.');
  }
};

export const markAsRead = async (conversationId: string): Promise<void> => {
  try {
    await apiClient.patch(`/conversations/${conversationId}/read`);
  } catch (error) {
    console.warn(`Gagal menandai pesan sebagai dibaca untuk percakapan ${conversationId}:`, error);
  }
};
