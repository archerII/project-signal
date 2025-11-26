import { getCuratedDailyFeed } from '@/lib/curator';
import { VideoCard } from '@/components/VideoCard';
import { SundayBlackout } from '@/components/SundayBlackout';

// Cache for 1 hour (3600s) to avoid hitting API limits too hard
export const revalidate = 3600;

export default async function Home() {
  const today = new Date();
  const isSunday = today.getDay() === 0;

  if (isSunday) {
    return <SundayBlackout />;
  }

  const videos = await getCuratedDailyFeed();

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-12 text-zinc-200">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white">
            Project Signal
          </h1>
          <p className="text-zinc-400">
            Daily AI Engineering Digest. High Signal. Low Noise.
          </p>
        </header>

        {videos.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <p className="text-zinc-400">
              No high-signal videos found today. The noise filter is working hard.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}

        <footer className="mt-16 text-center text-sm text-zinc-600">
          <p>Curated by AI. Verified by Humans.</p>
        </footer>
      </div>
    </main>
  );
}
