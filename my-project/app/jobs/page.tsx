import { getAllJobs, type IJob, type IPaginationMeta } from '@/services/jobService';
import JobList from '@/component/job/JobList';
import { Pagination } from '@/component/common/Pagination';
// Correctly import all parts of the Alert component
import { Alert, AlertDescription, AlertTitle } from '@/component/ui/Alert'; 
import JobFilter from '@/component/job/JobFilter';

interface JobsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const keyword = searchParams.keyword as string | undefined;
  const location = searchParams.location as string | undefined;
  const type = searchParams.type as string | undefined;

  let jobs: IJob[] = [];
  let paginationMeta: IPaginationMeta | null = null;
  let fetchError: string | null = null;

  try {
    const response = await getAllJobs({
      page: currentPage,
      keyword,
      location,
      type,
    });
    jobs = response.data;
    paginationMeta = response.meta;
  } catch (error) {
    console.error("JobsPage Fetch Error:", error);
    fetchError = "Gagal memuat data lowongan. Silakan coba beberapa saat lagi.";
  }

  return (
    <main className="container mx-auto py-8 lg:py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Temukan Pekerjaan Impian Anda</h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          Jelajahi ribuan lowongan dari berbagai perusahaan ternama di seluruh Indonesia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Filter Pencarian</h2>
            {/* Pass server-side searchParams as initial state to the client component */}
            <JobFilter initialFilters={{ keyword, location, type }} />
          </div>
        </aside>

        <section className="lg:col-span-3">
          {fetchError ? (
            // --- FIX: Use the Alert component with its child components ---
            <Alert variant="destructive">
              <AlertTitle>Terjadi Kesalahan Server</AlertTitle>
              <AlertDescription>{fetchError}</AlertDescription>
            </Alert>
          ) : (
            <>
              <JobList jobs={jobs} />
              {paginationMeta && paginationMeta.totalPages > 1 && (
                <div className="mt-10">
                  <Pagination
                    currentPage={paginationMeta.currentPage}
                    totalPages={paginationMeta.totalPages}
                  />
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
