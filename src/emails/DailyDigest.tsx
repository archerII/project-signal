import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Img,
    Hr,
} from '@react-email/components';
import * as React from 'react';
import { CuratedVideo } from '@/lib/curator';

interface DailyDigestProps {
    videos: CuratedVideo[];
    date: string;
}

export const DailyDigestEmail = ({
    videos = [],
    date = new Date().toLocaleDateString(),
    baseUrl = 'https://project-signal-five.vercel.app',
}: DailyDigestProps & { baseUrl?: string }) => (
    <Html>
        <Head />
        <Preview>Your Daily AI Engineering Digest for {date}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`${baseUrl}/logo-horizontal.png`}
                    width="200"
                    height="40"
                    alt="Project Signal"
                    style={logo}
                />
                <Text style={text}>
                    Here are the top {videos.length} high-signal videos for today, {date}.
                </Text>

                {videos.map((video) => (
                    <Section key={video.id} style={videoSection}>
                        <Img
                            src={video.thumbnailUrl}
                            width="100%"
                            height="auto"
                            style={thumbnail}
                        />
                        <Heading as="h3" style={h3}>
                            <Link href={video.videoUrl} style={link}>
                                {video.title}
                            </Link>
                        </Heading>
                        <Text style={channel}>
                            {video.channelTitle} • Utility Score: {video.utilityScore}/10
                        </Text>
                        <Text style={summary}>{video.summary}</Text>
                    </Section>
                ))}

                <Hr style={hr} />
                <Text style={footer}>
                    Curated by AI. Verified by Humans.
                    <br />
                    <Link href="http://localhost:3000" style={footerLink}>
                        View on Web
                    </Link>
                </Text>
            </Container>
        </Body>
    </Html>
);

const main = {
    backgroundColor: '#09090b',
    color: '#e4e4e7',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '560px',
};

const logo = {
    margin: '30px auto',
    display: 'block',
};

const h3 = {
    fontSize: '18px',
    fontWeight: '600',
    margin: '16px 0 8px',
};

const link = {
    color: '#ffffff',
    textDecoration: 'none',
};

const text = {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#a1a1aa',
};

const videoSection = {
    marginBottom: '32px',
    border: '1px solid #27272a',
    borderRadius: '12px',
    padding: '16px',
    backgroundColor: '#18181b',
};

const thumbnail = {
    borderRadius: '8px',
    marginBottom: '16px',
};

const channel = {
    fontSize: '12px',
    color: '#10b981', // Emerald-500
    fontWeight: '500',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
};

const summary = {
    fontSize: '14px',
    lineHeight: '24px',
    color: '#d4d4d8',
};

const hr = {
    borderColor: '#27272a',
    margin: '20px 0',
};

const footer = {
    color: '#71717a',
    fontSize: '12px',
    textAlign: 'center' as const,
};

const footerLink = {
    color: '#71717a',
    textDecoration: 'underline',
};
