import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Проверяем, что запрос идет на корневой маршрут "/"
  if (request.nextUrl.pathname === '/') {
    // Редирект на "/catalog"
    return NextResponse.redirect(new URL('/catalog', request.url));
  }
}

// Применяем middleware только к корневому маршруту "/"
export const config = {
  matcher: '/',
};