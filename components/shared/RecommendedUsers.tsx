const RecommendedUsers = () => {
  return (
    <div className="py-2 space-y-4 bg-slate-800 brightness-90">
      <div className="px-4 py-2">
        <h1 className="text-2xl font-bold">Who to follow</h1>
      </div>
      {suggestedUsers.map((user, index) => (
        <div key={index} className="flex h-16 gap-2 px-4">
          <img className="object-cover w-12 h-12 rounded-full" src={user.imageURL} alt="profile" />
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
    imageURL: 'https://sdgs.bappenas.go.id/wp-content/uploads/2021/07/PHOTO-BERITA-2.jpeg',
    name: 'Joko Widodo',
    username: '@jokowidodo',
  },
  {
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg',
    name: 'Elon Musk',
    username: '@elon_musk',
  },
  {
    imageURL: 'https://api.time.com/wp-content/uploads/2020/09/time-100-Sundar-Pichai.jpg',
    name: 'Sundar Pichai',
    username: '@sundarpichai',
  },
];
