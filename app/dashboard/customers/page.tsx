import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchFilteredCustomers } from '@/app/lib/data';

export default async function Page(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const filteredCustomers = await fetchFilteredCustomers(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between dark:bg-slate-800 dark:text-slate-100">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      {<Suspense fallback={<CustomersTableSkeleton />}>
        <Table customers={filteredCustomers} />
      </Suspense>}
    </div>
  );
}