import { PostData } from "@src/modules/post/post.types";

export default function timeSetter({ post }: { post: PostData }) {
  const oneMinuteMilliSeconds = 1000 * 60;
  const oneHourMilliSeconds = 1000 * 60 * 60;
  const OneDayInMilliSeconds = 1000 * 60 * 60 * 24;

  const postTime = new Date(post.createdAt).getTime();
  const currTime = new Date().getTime();
  const timeDifferentInMilliSeconds = currTime - postTime;
  if (timeDifferentInMilliSeconds < OneDayInMilliSeconds) {
    if (timeDifferentInMilliSeconds < oneMinuteMilliSeconds) {
      const result = Math.ceil(timeDifferentInMilliSeconds / 1000);
      return `${result.toString()}s`;
    } else if (
      timeDifferentInMilliSeconds >= oneMinuteMilliSeconds &&
      timeDifferentInMilliSeconds < oneHourMilliSeconds
    ) {
      const result = Math.ceil(
        timeDifferentInMilliSeconds / oneMinuteMilliSeconds
      );
      return `${result.toString()}m`;
    } else {
      const result = Math.ceil(
        timeDifferentInMilliSeconds / oneHourMilliSeconds
      );
      return `${result.toString()}h`;
    }
  } else {
    return Intl.DateTimeFormat("en-US").format(new Date(post.createdAt));
  }
}
