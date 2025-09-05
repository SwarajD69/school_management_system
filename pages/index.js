import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>School Directory Project</h1>
      <Link href="/addSchool">Add School</Link><br/>
      <Link href="/showSchools">Show Schools</Link>
    </div>
  );
}
