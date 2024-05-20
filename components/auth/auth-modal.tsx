import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Social } from "./social";

const AuthModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Log in to comment</Button>
      </DialogTrigger>
      <DialogContent>
        <Card className="w-full font-karla">
          <CardContent className="w-2/3 m-auto">
            <CardHeader>
              <CardTitle className=" text-2xl pb-2">Login to Comment</CardTitle>
            </CardHeader>
            <Social />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
