import axios from "axios";
import { Platform } from "react-native";

// Function to detect environment and return appropriate API URL
function getApiBaseUrl() {
  // Check if running on web
  if (Platform.OS === 'web') {
    return "http://localhost:3000";
  }
  
  // Check if running on iOS
  if (Platform.OS === 'ios') {
    // For iOS simulator, use localhost
    // For real device, you'd need to use your computer's IP
    return "http://localhost:3000";
  }
  
  // Check if running on Android
  if (Platform.OS === 'android') {
    // For Android emulator, use 10.0.2.2
    // For real device, you'd need to use your computer's IP
    return "http://10.0.2.2:3000";
  }
  
  // Fallback
  return "http://localhost:3000";
}

const API_BASE_URL = getApiBaseUrl();

console.log('Platform detected:', Platform.OS);
console.log('API Base URL set to:', API_BASE_URL);

export const api = axios.create({ 
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Types for pagination
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ItemsResponse {
  items: { id: string; text: string }[];
  pagination: PaginationInfo;
}

// Function to fetch items with pagination support
export async function fetchItems(q?: string, page: number = 1, limit?: number) {
  try {
    console.log('Fetching items with query:', q, 'page:', page, 'limit:', limit);
    console.log('API Base URL:', API_BASE_URL);
    
    const path = q ? "/api/items/search" : "/api/items";
    const params: any = { q, page };
    if (limit) params.limit = limit;
    
    const res = await api.get(path, { params });
    
    console.log('API Response:', res.data);
    return res.data as ItemsResponse;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
