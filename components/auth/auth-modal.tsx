import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Social } from "./social";

const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Log in to comment</Button>
      </DialogTrigger>
      <DialogContent className="w-5/6 rounded-lg">
        <Social />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
