import { CuratedVideo } from '@/lib/curator';
import { PlayCircle, ExternalLink } from 'lucide-react';

export function VideoCard({ video }: { video: CuratedVideo }) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900">
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <PlayCircle className="h-12 w-12 text-white drop-shadow-lg" />
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-medium text-emerald-400">{video.channelTitle}</span>
                    <span className="flex items-center gap-1">
                        Utility Score: <span className="font-bold text-white">{video.utilityScore}/10</span>
                    </span>
                </div>

                <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-zinc-100 group-hover:text-white">
                    {video.title}
                </h3>

                <p className="mb-4 line-clamp-3 flex-1 text-sm text-zinc-400">
                    {video.summary}
                </p>

                <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
                >
                    Watch Video <ExternalLink className="h-4 w-4" />
                </a>
            </div>
        </div>
    );
}
