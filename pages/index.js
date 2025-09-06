import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>School Directory Project</h1>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '1rem' }}>
            <Link href="/addSchool" style={{ textDecoration: 'none', color: 'blue' }}>
              Add School
            </Link>
          </li>
          <li>
            <Link href="/showSchools" style={{ textDecoration: 'none', color: 'blue' }}>
              Show Schools
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
