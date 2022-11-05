import useCreatePost from "@src/hooks/post/useCreatePost";
import ChevronIcon from "@src/icons/ChevronIcon";
import GlobeIcon from "@src/icons/GlobeIcon";
import ImageIcon from "@src/icons/ImageIcon";
import { FormEvent, useMemo, useState } from "react";

const CreatePostForm = () => {
  const [body, setBody] = useState("");

  const { mutate } = useCreatePost();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!!body) {
      console.log(body);
      mutate({
        body,
      });
    }
  };

  const sum = useMemo(() => {
    return (body.match(/\n/g) ?? []).length;
  }, [body]);

  return (
    <div className="flex gap-4 mt-2 mr-2 h-fit">
      <div className="w-12 h-12 bg-yellow-500 rounded-full" />
      <form onSubmit={onSubmit} className="flex flex-col flex-1">
        <AudienceTag />
        <textarea
          onChange={(e) => setBody(e.target.value)}
          rows={sum <= 0 ? 1 : sum >= 15 ? 15 : sum + 1}
          className="w-full bg-transparent border-none outline-none resize-none"
          placeholder="What's happening ?"
        />
        <RepliersTag />
        <div className="w-full mt-2 h-[3px] rounded-sm bg-slate-700" />
        <div className="flex items-center w-full ">
          <button className="flex-1 text-yellow-600">
            <ImageIcon />
          </button>
          <button
            type="submit"
            className="px-4 py-1 mt-2 text-sm tracking-wide text-white dark:bg-yellow-600 dark:hover:bg-yellow-700 rounded-xl"
          >
            Roarr
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;

const AudienceTag = () => {
  return (
    <div className="flex self-start py-1 mb-2 text-sm text-yellow-600 rounded-lg cursor-pointer">
      Everyone
      <div className="-mt-1 rotate-180">
        <ChevronIcon />
      </div>
    </div>
  );
};

const RepliersTag = () => {
  return (
    <div className="flex items-center gap-1 mt-3 text-sm font-semibold text-yellow-600 cursor-pointer">
      <GlobeIcon />
      <p className="-mt-1">Everyone can reply</p>
    </div>
  );
};
