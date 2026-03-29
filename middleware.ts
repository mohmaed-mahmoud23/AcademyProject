import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function parseJwt(token: string) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64").toString("utf8");
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname === "/" || pathname === "/Login";
  const isAdminRoute = pathname.startsWith("/Admin");
  const isStudentRoute = pathname.startsWith("/dashboard"); // 👈 اتغيرت هنا

  // =========================
  // لو مفيش توكن
  // =========================
  if (!token) {
    if (isAdminRoute || isStudentRoute) {
      return NextResponse.redirect(new URL("/Login", request.url));
    }
    return NextResponse.next();
  }

  // =========================
  // نفك التوكن
  // =========================
  const decoded = parseJwt(token);

  if (!decoded) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  const roleClaim =
    decoded[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

  const role = roleClaim?.toLowerCase();

  // =========================
  // لو فيه توكن → ممنوع يروح Login
  // =========================
  if (isAuthPage) {
    if (role === "superadmin") {
      return NextResponse.redirect(new URL("/Admin", request.url));
    }
    if (role === "student") {
      return NextResponse.redirect(new URL("/dashboard", request.url)); // 👈 اتغيرت هنا
    }
  }

  // =========================
  // حماية الرول
  // =========================
  if (isAdminRoute && role !== "superadmin") {
    return NextResponse.redirect(new URL("/dashboard", request.url)); // 👈 اتغيرت هنا
  }

  if (isStudentRoute && role !== "student") {
    return NextResponse.redirect(new URL("/Admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/Login",
    "/Admin/:path*",
    "/dashboard/:path*", // 👈 اتغيرت هنا
  ],
};