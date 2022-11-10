import ElipsisHorizontalIcon from '@src/icons/ElipsisHorizontalIcon';

const TrendingTopics = () => {
  return (
    <div className="py-2 dark:bg-slate-800 brightness-90 rounded-xl">
      <div className="px-4 py-2">
        <h1 className="text-2xl font-bold">Trends for you</h1>
      </div>
      {trends.map((trend, index) => (
        <div key={index} className="flex px-4 py-2">
          <div className="flex-1">
            <small className="text-slate-500">{trend.tag}</small>
            <p className="font-bold">{trend.title}</p>
            <small className="text-slate-500">{trend.roarrs}</small>
          </div>
          <button>
            <ElipsisHorizontalIcon />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TrendingTopics;

const trends = [
  {
    tag: 'Trending in Indonesia',
    title: 'Siska',
    roarrs: '1,122 Tweets',
  },
  {
    tag: 'Only on Twitter · Trending',
    title: 'Permata Bank',
    roarrs: '1,919 Tweets',
  },
  {
    tag: 'Trending in Indonesia',
    title: 'RICKY KEREN',
    roarrs: '7,145 Tweets',
  },
  {
    tag: 'Trending in Indonesia',
    title: '#WakandaForeverID',
    roarrs: '14.4K Tweets',
  },
  {
    tag: 'Trending in Indonesia',
    title: '#DITA',
    roarrs: '25.9K Tweets',
  },
  {
    tag: 'Trending in Indonesia',
    title: '#ONEPIECE1066',
    roarrs: '9,445 Tweets',
  },
  {
    tag: 'Trending in Indonesia',
    title: '#BalikBukaAja',
    roarrs: '4,834 Tweets',
  },
];
