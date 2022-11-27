import Image from "next/image";

const RecommendedUsers = () => {
  return (
    <div className="py-2 space-y-4 bg-slate-800 brightness-90 ">
      <div className="px-4 py-2">
        <h1 className="text-2xl font-bold">Who to follow</h1>
      </div>
      {suggestedUsers.map((user, index) => (
        <div key={index} className="flex h-16 gap-2 px-4">
          <Image
            className="object-cover rounded-full"
            src={user.imageURL}
            width={64}
            height={64}
            quality={100}
            alt="profile"
          />
          <div className="flex-1 -space-y-1">
            <h1 className="font-bold">{user.name}</h1>
            <p className="dark:text-slate-500">{user.username}</p>
          </div>
          <button className="self-start px-4 py-2 text-sm border rounded-lg border-slate-600 hover:bg-yellow-600 hover:border-transparent hover:text-white">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecommendedUsers;

const suggestedUsers = [
  {
    imageURL: "/jokowi.png",
    name: "Joko Widodo",
    username: "@jokowidodo",
  },
  {
    imageURL: "/elon.jpg",
    name: "Elon Musk",
    username: "@elon_musk",
  },
  {
    imageURL: "/sundar.jpg",
    name: "Sundar Pichai",
    username: "@sundarpichai",
  },
];
