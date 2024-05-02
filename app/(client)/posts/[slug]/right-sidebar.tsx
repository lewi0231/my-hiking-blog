import NewsletterForm from "@/components/NewsletterForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  wrapperClass: string;
  authorImage: string;
  authorName: string;
  authorBio: string;
};

const RightSidebar = ({
  wrapperClass,
  authorImage,
  authorName,
  authorBio,
}: Props) => {
  return (
    <aside className={cn("relative w-full space-y-4", wrapperClass)}>
      <section className=" bg-gray-50 rounded-md shadow-md p-4">
        <h2 className="text-2xl mt-2 mb-4 font-medium ">About the author</h2>
        <div className="flex gap-5 items-center">
          <Avatar>
            <AvatarImage src={authorImage} alt={authorName} />
            <AvatarFallback>{authorName?.charAt(0) ?? ""}</AvatarFallback>
          </Avatar>
          <span>{authorName}</span>
        </div>
        <div className="mt-4">
          <p>{authorBio}</p>
        </div>
      </section>
      <NewsletterForm
        className="sticky top-24 rounded-md shadow-md bg-gray-50"
        columnInputs={true}
        label="Keep up to date"
      />
    </aside>
  );
};

export default RightSidebar;
