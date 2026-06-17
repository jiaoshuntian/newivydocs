import { redirect } from 'next/navigation';

export default function V4Layout({ children }: { children: React.ReactNode }) {
  redirect('/docs/v5');
}
