import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="text-center py-10">
      <h1 className="text-3xl font-semibold mb-2">404</h1>
      <p className="mb-4">Page not found</p>
      <Link to="/" className="underline">Go home</Link>
    </div>
  );
}


