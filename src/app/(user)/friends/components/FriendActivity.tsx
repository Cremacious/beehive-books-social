'use client';



interface FriendActivityProps {
  id: string;
  name: string;
  activityTime: string;
  recentActivity: string;
}

const FriendActivity = ({
  activities,
}: {
  activities: FriendActivityProps[];
}) => {
  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-4 md:p-6">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">

        Friend Activity
      </h2>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-white/60 text-sm">
              No recent activity from friends.
            </p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 darkContainer3 rounded-xl"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <span className="text-yellow-400 font-semibold">
                    {activity.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-white">{activity.name}</h4>
                  <p className="text-white/50 text-xs">
                    {activity.activityTime}
                  </p>
                </div>
                <p className="text-yellow-400 text-sm mb-2">
                  {activity.recentActivity}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default FriendActivity;
