import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { DailyDigestEmail } from '@/emails/DailyDigest';
import { getCuratedDailyFeed } from '@/lib/curator';

export async function GET(request: Request) {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
        return new NextResponse('Missing RESEND_API_KEY', { status: 500 });
    }
    const resend = new Resend(resendApiKey);

    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const today = new Date();
    const isSunday = today.getDay() === 0;

    if (isSunday) {
        return NextResponse.json({ message: 'Sunday Blackout. No email sent.' });
    }

    try {
        const videos = await getCuratedDailyFeed();

        if (videos.length === 0) {
            return NextResponse.json({ message: 'No videos found today.' });
        }

        const { data, error } = await resend.emails.send({
            from: 'Project Signal <onboarding@resend.dev>', // Update this with your verified domain
            to: ['istvan.kuti.jr@gmail.com'], // Hardcoded for v1, or use process.env.USER_EMAIL
            subject: `Project Signal: Daily Digest for ${today.toLocaleDateString()}`,
            react: DailyDigestEmail({ videos, date: today.toLocaleDateString() }),
        });

        if (error) {
            return NextResponse.json({ error }, { status: 500 });
        }

        return NextResponse.json({ message: 'Email sent successfully', data });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
