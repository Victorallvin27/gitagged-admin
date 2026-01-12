// 'use client';

// import { useEffect } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const token = localStorage.getItem('adminToken');
//     if (!token) {
//       router.push('/login');
//     }
//   }, [router]);

//   const linkClass = (path: string) =>
//     `block px-3 py-2 rounded mb-1 ${
//       pathname === path
//         ? 'bg-white text-black'
//         : 'hover:bg-gray-700'
//     }`;

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 p-4 text-white">
//         <p className="mb-6 text-lg font-bold">Admin Panel</p>

//         <nav>
//           <Link
//             href="/dashboard/categories"
//             className={linkClass('/dashboard/categories')}
//           >
//             Categories
//           </Link>

//           <Link
//             href="/dashboard/gi-regions"
//             className={linkClass('/dashboard/gi-regions')}
//           >
//             GI Regions
//           </Link>

//           <Link
//             href="/dashboard/products"
//             className={linkClass('/dashboard/products')}
//           >
//             Products
//           </Link>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-6 bg-gray-50">{children}</main>
//     </div>
//   );
// }
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      router.push('/login');
    }
  }, [router]);

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
      pathname === path
        ? 'bg-indigo-600 text-white shadow'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;

  return (
//     <div className="flex min-h-screen bg-slate-100">
//       {/* Sidebar */}
//       <aside className="w-72 bg-[#0f172a] text-white p-6">
//         <div className="mb-10">
//   <Link href="/dashboard" className="block">
//     <h1 className="text-2xl font-bold tracking-wide hover:text-indigo-400 transition">
//       GiTagged
//     </h1>
//     <p className="text-sm text-slate-400">
//       Admin Dashboard
//     </p>
//   </Link>
// </div>


//         <nav>
//           <Link
//             href="/dashboard/categories"
//             className={linkClass('/dashboard/categories')}
//           >
//             📂 Categories
//           </Link>

//           <Link
//             href="/dashboard/gi-regions"
//             className={linkClass('/dashboard/gi-regions')}
//           >
//             🌍 GI Regions
//           </Link>

//           <Link
//             href="/dashboard/products"
//             className={linkClass('/dashboard/products')}
//           >
//             🛒 Products
//           </Link>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-10">
//         <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[85vh]">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
<div className="h-screen overflow-hidden bg-slate-100">
      {/* Sidebar (FIXED) */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-[#0f172a] text-white p-6">
        <div className="mb-10">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold tracking-wide hover:text-indigo-400 transition">
              GiTagged
            </h1>
            <p className="text-sm text-slate-400">Admin Dashboard</p>
          </Link>
        </div>

        <nav>
          <Link
            href="/dashboard/categories"
            className={linkClass('/dashboard/categories')}
          >
            📂 Categories
          </Link>

          <Link
            href="/dashboard/gi-regions"
            className={linkClass('/dashboard/gi-regions')}
          >
            🌍 GI Regions
          </Link>

          <Link
            href="/dashboard/products"
            className={linkClass('/dashboard/products')}
          >
            🛒 Products
          </Link>
        </nav>
      </aside>

      {/* Main Content (SCROLLABLE) */}
      <main className="ml-72 h-screen overflow-y-auto p-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
