import { User } from "../types/User";

interface Props {
  user: User;
}

export default function UserProfile({ user }: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center">
        <img
          src="https://placehold.co/100"
          alt={user.name}
          className="rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  )
}