import Link from "next/link"

export default () => {
  return (
    <div>
      <h1>Hello, World</h1>
      <div>
        <Link href="/signin">
          <a>signin</a>
        </Link>
      </div>
    </div>
  )
}
