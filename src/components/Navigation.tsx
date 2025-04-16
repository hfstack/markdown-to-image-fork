import { Link } from '../i18n/routing'

export default function Navigation() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </nav>
  )
} 